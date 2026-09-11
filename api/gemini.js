function sendJson(res, statusCode, data) {
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
}

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    if (req.method !== 'POST') {
        sendJson(res, 405, { error: 'Método no permitido' });
        return;
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        sendJson(res, 500, { error: 'GEMINI_API_KEY no está configurada' });
        return;
    }

    // Parse JSON body
    const buffers = [];
    for await (const chunk of req) {
        buffers.push(chunk);
    }
    const body = Buffer.concat(buffers).toString();
    let payload;
    try {
        payload = JSON.parse(body);
    } catch (e) {
        sendJson(res, 400, { error: 'Body inválido' });
        return;
    }

    const userMessage = payload.message;
    if (!userMessage || typeof userMessage !== 'string') {
        sendJson(res, 400, { error: 'message es requerido' });
        return;
    }

    const systemPrompt = `Eres el asistente virtual de La Skina, una banda chilena de música ochentera, del recuerdo, pop, rock, baladas y disco. Respondes de forma breve, amigable y en español (Chile).

Reglas:
- Si preguntan por cotizaciones, reservas, disponibilidad o precios, responde con una frase breve y sugiere contactar por WhatsApp.
- Si preguntan por canciones o repertorio, menciona que La Skina toca clásicos de los 80, pop/rock retro, baladas, disco y rock en español.
- Si preguntan por eventos, menciona eventos privados, corporativos, pubs/bares y bodas.
- No inventes fechas, precios exactos ni datos no confirmados.
- Si no sabes la respuesta, sugiere contactar por WhatsApp.

Mensaje del usuario: ${userMessage}`;

    try {
        const geminiRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ role: 'user', parts: [{ text: systemPrompt }] }],
                generationConfig: { maxOutputTokens: 200, temperature: 0.6 }
            })
        });

        const data = await geminiRes.json();

        if (!geminiRes.ok) {
            console.error('Gemini error:', data);
            sendJson(res, 500, { error: 'Error al consultar Gemini' });
            return;
        }

        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        const reply = text ? text.trim() : 'Lo siento, no pude generar una respuesta en este momento.';
        sendJson(res, 200, { reply });
    } catch (err) {
        console.error('Gemini fetch error:', err);
        sendJson(res, 500, { error: 'Error de conexión con Gemini' });
    }
};
