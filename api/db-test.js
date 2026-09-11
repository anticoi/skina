const { ensureTable } = require('./store');

function sendJson(res, statusCode, data) {
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
}

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');

    const url = new URL(req.url, 'http://localhost');
    const password = url.searchParams.get('password');
    const adminPassword = process.env.ADMIN_PASSWORD || 'laskina2024';

    if (password !== adminPassword) {
        sendJson(res, 401, { error: 'No autorizado' });
        return;
    }

    const dbUrl = process.env.POSTGRES_URL || process.env.PRISMA_DATABASE_URL || process.env.DATABASE_URL;
    const result = {
        hasPostgresUrl: !!dbUrl,
        urlPrefix: dbUrl ? dbUrl.substring(0, 30) + '...' : null,
        tableCreated: false,
        error: null
    };

    if (!dbUrl) {
        result.error = 'No hay POSTGRES_URL, PRISMA_DATABASE_URL o DATABASE_URL configurada';
        sendJson(res, 200, result);
        return;
    }

    try {
        result.tableCreated = await ensureTable();
    } catch (err) {
        result.error = err.message;
    }

    sendJson(res, 200, result);
};
