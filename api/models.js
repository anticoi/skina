function sendJson(res, statusCode, data) {
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
}

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');

    if (req.method !== 'GET') {
        sendJson(res, 405, { error: 'Método no permitido' });
        return;
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        sendJson(res, 500, { error: 'GEMINI_API_KEY no está configurada' });
        return;
    }

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}&pageSize=50`);
        const data = await response.json();

        if (!response.ok) {
            sendJson(res, 500, { error: 'Error al listar modelos', details: data });
            return;
        }

        const models = (data.models || []).map(m => ({
            name: m.name,
            displayName: m.displayName,
            supportedGenerationMethods: m.supportedGenerationMethods || []
        }));

        sendJson(res, 200, { models });
    } catch (err) {
        console.error('Error listando modelos:', err);
        sendJson(res, 500, { error: 'Error de conexión' });
    }
};
