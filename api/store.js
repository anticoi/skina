const { Pool } = require('pg');

let pool = null;

function getPool() {
    if (!pool) {
        const connectionString = process.env.POSTGRES_URL || process.env.PRISMA_DATABASE_URL;
        if (!connectionString) return null;
        pool = new Pool({
            connectionString,
            ssl: { rejectUnauthorized: false },
            max: 3,
            idleTimeoutMillis: 10000
        });
    }
    return pool;
}

async function ensureTable() {
    const p = getPool();
    if (!p) return false;
    try {
        await p.query(`
            CREATE TABLE IF NOT EXISTS chat_logs (
                id SERIAL PRIMARY KEY,
                timestamp TIMESTAMPTZ DEFAULT NOW(),
                user_name TEXT,
                message TEXT,
                reply TEXT
            )
        `);
        return true;
    } catch (err) {
        console.error('Error creating table:', err.message);
        return false;
    }
}

async function addChatEntry(entry) {
    const p = getPool();
    if (!p) {
        console.log('[CHAT LOG]', entry.user, ':', entry.message, '→', entry.reply);
        return;
    }
    try {
        await p.query(
            'INSERT INTO chat_logs (user_name, message, reply) VALUES ($1, $2, $3)',
            [entry.user, entry.message, entry.reply]
        );
    } catch (err) {
        console.error('Error saving chat log:', err.message);
    }
}

async function getChatHistory(limit) {
    const p = getPool();
    if (!p) return [];
    try {
        const result = await p.query(
            'SELECT timestamp, user_name, message, reply FROM chat_logs ORDER BY timestamp DESC LIMIT $1',
            [limit || 500]
        );
        return result.rows.map(r => ({
            timestamp: r.timestamp,
            user: r.user_name,
            message: r.message,
            reply: r.reply
        }));
    } catch (err) {
        console.error('Error fetching chat logs:', err.message);
        return [];
    }
}

module.exports = { addChatEntry, getChatHistory, ensureTable };
