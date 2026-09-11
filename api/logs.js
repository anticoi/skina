const { getChatHistory, ensureTable } = require('./store');

function sendJson(res, statusCode, data) {
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
}

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    if (req.method !== 'GET') {
        sendJson(res, 405, { error: 'Método no permitido' });
        return;
    }

    // Protección con password simple
    const url = new URL(req.url, 'http://localhost');
    const password = url.searchParams.get('password') || (req.headers.authorization || '').replace('Bearer ', '');

    const adminPassword = process.env.ADMIN_PASSWORD || 'laskina2024';

    if (password !== adminPassword) {
        sendJson(res, 401, { error: 'No autorizado' });
        return;
    }

    // Asegurar que la tabla existe
    await ensureTable();

    const logs = await getChatHistory(500);
    sendJson(res, 200, { count: logs.length, logs });
};
