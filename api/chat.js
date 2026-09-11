function sendJson(res, statusCode, data) {
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
}

const SYSTEM_INSTRUCTION = `Eres el asistente virtual de La Skina, una banda chilena de música ochentera, del recuerdo, pop, rock, baladas y disco. Respondes de forma breve, amigable y en español de Chile.

Reglas:
- Si preguntan por cotizaciones, reservas, disponibilidad o precios, responde con una frase breve y sugiere contactar por WhatsApp.
- Si preguntan por canciones o repertorio, menciona que La Skina toca clásicos de los 80, pop/rock retro, baladas, disco y rock en español.
- Si preguntan por eventos, menciona eventos privados, corporativos, pubs/bares y bodas.
- No inventes fechas, precios exactos ni datos no confirmados.
- Si no sabes la respuesta, sugiere contactar por WhatsApp.`;

async function callGemini(modelName, apiKey, userMessage) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 50000);

    try {
        const geminiRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                systemInstruction: { role: 'user', parts: [{ text: SYSTEM_INSTRUCTION }] },
                contents: [{ role: 'user', parts: [{ text: userMessage }] }],
                generationConfig: { maxOutputTokens: 250, temperature: 0.6 }
            }),
            signal: controller.signal
        });

        const data = await geminiRes.json();

        if (!geminiRes.ok) {
            throw new Error(data?.error?.message || JSON.stringify(data));
        }

        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!text) {
            throw new Error('Respuesta vacía de Gemini');
        }
        return text.trim();
    } finally {
        clearTimeout(timeoutId);
    }
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

    const message = payload.message;
    if (!message || typeof message !== 'string') {
        sendJson(res, 400, { error: 'message es requerido' });
        return;
    }

    const models = ['gemini-2.5-flash', 'gemini-2.5-pro', 'gemini-2.0-flash'];
    let lastError = 'No se pudo generar una respuesta.';

    for (const model of models) {
        try {
            const reply = await callGemini(model, apiKey, message);
            sendJson(res, 200, { reply });
            return;
        } catch (err) {
            lastError = err.message;
            console.error(`Gemini ${model} failed:`, err.message);
        }
    }

    sendJson(res, 500, { error: 'Error al consultar Gemini', details: lastError });
};
