// Almacén temporal en memoria para interacciones del chatbot
// Nota: se reinicia en cold starts, pero funciona para sesiones activas
global.chatHistory = global.chatHistory || [];

function addChatEntry(entry) {
    global.chatHistory.push(entry);
    // Mantener solo las últimas 500 interacciones
    if (global.chatHistory.length > 500) {
        global.chatHistory.shift();
    }
}

function getChatHistory() {
    return global.chatHistory;
}

module.exports = { addChatEntry, getChatHistory };
