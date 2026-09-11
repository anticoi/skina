document.addEventListener('DOMContentLoaded', () => {
    console.log('Chatbot La Skina v3 cargado');
    const WHATSAPP_NUMBER = '56952195484';
    const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hola, vengo del sitio web de La Skina y me gustaría más información')}`;

    const colors = {
        bg: '#160f2e',
        border: 'rgba(0, 243, 255, 0.2)',
        header: 'linear-gradient(135deg, #ff007f 0%, #9d00ff 100%)',
        botBg: 'rgba(0, 243, 255, 0.1)',
        botBorder: 'rgba(0, 243, 255, 0.2)',
        inputBg: '#0d081d',
        inputBorder: 'rgba(255, 0, 127, 0.3)'
    };

    const wrapper = document.createElement('div');
    wrapper.id = 'chatbot-widget';
    wrapper.innerHTML = `
        <button id="chatbot-toggle" aria-label="Abrir chat" style="
            position: fixed;
            bottom: 24px;
            right: 24px;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            border: none;
            cursor: pointer;
            z-index: 9999;
            color: white;
            background: ${colors.header};
            box-shadow: 0 4px 20px rgba(255, 0, 127, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            transition: transform 0.2s ease;
        ">
            <span style="font-size: 28px; line-height: 1; color: white;">&#9835;</span>
        </button>

        <div id="chatbot-window" style="
            position: fixed;
            bottom: 100px;
            right: 24px;
            width: 360px;
            max-width: calc(100vw - 48px);
            height: 500px;
            max-height: calc(100vh - 140px);
            background: ${colors.bg};
            border: 1px solid ${colors.border};
            border-radius: 16px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
            z-index: 9999;
            display: none;
            flex-direction: column;
            overflow: hidden;
            font-family: inherit;
        ">
            <div style="
                background: ${colors.header};
                padding: 16px;
                display: flex;
                align-items: center;
                gap: 12px;
                color: white;
            ">
                <div style="width: 40px; height: 40px; background: rgba(255,255,255,0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                    <svg width="24" height="24" fill="none" stroke="white" stroke-width="2" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                    </svg>
                </div>
                <div>
                    <div style="font-weight: bold; font-size: 16px;">La Skina</div>
                    <div style="font-size: 12px; opacity: 0.8;">Asistente Virtual</div>
                </div>
                <button id="chatbot-close" aria-label="Cerrar chat" style="
                    margin-left: auto;
                    background: none;
                    border: none;
                    color: white;
                    cursor: pointer;
                ">
                    <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <div id="chatbot-messages" style="
                flex: 1;
                overflow-y: auto;
                padding: 16px;
                display: flex;
                flex-direction: column;
                gap: 12px;
            ">
                <div class="chatbot-msg chatbot-msg-bot" style="
                    align-self: flex-start;
                    background: ${colors.botBg};
                    border: 1px solid ${colors.botBorder};
                    padding: 10px 16px;
                    border-radius: 12px 12px 12px 4px;
                    color: #e0e0e0;
                    font-size: 14px;
                    line-height: 1.5;
                    max-width: 85%;
                ">
                    ¡Hola! Soy el asistente virtual de La Skina 🎵. ¿En qué te puedo ayudar?
                </div>
            </div>

            <div id="chatbot-loading" style="
                display: none;
                padding: 8px 16px;
                color: #00f3ff;
                font-size: 13px;
                align-items: center;
                gap: 8px;
            ">
                <span style="display: inline-block; width: 8px; height: 8px; background: #00f3ff; border-radius: 50%; animation: chatbot-pulse 1s infinite;"></span>
                La Skina está escribiendo...
            </div>

            <div style="padding: 12px; border-top: 1px solid rgba(255,255,255,0.1); display: flex; gap: 8px;">
                <input id="chatbot-input" type="text" placeholder="Escribe tu mensaje..." autocomplete="off" style="
                    flex: 1;
                    background: ${colors.inputBg};
                    border: 1px solid ${colors.inputBorder};
                    border-radius: 8px;
                    padding: 10px 14px;
                    color: white;
                    font-size: 14px;
                    outline: none;
                ">
                <button id="chatbot-send" aria-label="Enviar" style="
                    background: ${colors.header};
                    border: none;
                    border-radius: 8px;
                    padding: 10px 16px;
                    color: white;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                ">
                    <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                </button>
            </div>

            <div style="padding: 10px 12px; background: rgba(13, 8, 29, 0.8); border-top: 1px solid rgba(255,255,255,0.05); text-align: center;">
                <a href="${WHATSAPP_URL}" target="_blank" style="
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    background: #25D366;
                    color: white;
                    text-decoration: none;
                    border-radius: 8px;
                    padding: 8px 16px;
                    font-size: 13px;
                    font-weight: 600;
                ">
                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.821 11.821 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Hablar por WhatsApp
                </a>
            </div>
        </div>
    `;

    const style = document.createElement('style');
    style.textContent = `
        @keyframes chatbot-pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.3; }
        }
        .chatbot-msg-user {
            align-self: flex-end !important;
            background: linear-gradient(135deg, #ff007f 0%, #9d00ff 100%) !important;
            border: none !important;
            border-radius: 12px 12px 4px 12px !important;
            color: white !important;
            max-width: 80% !important;
        }
    `;
    document.head.appendChild(style);
    document.body.appendChild(wrapper);

    const toggle = document.getElementById('chatbot-toggle');
    const windowEl = document.getElementById('chatbot-window');
    const close = document.getElementById('chatbot-close');
    const input = document.getElementById('chatbot-input');
    const send = document.getElementById('chatbot-send');
    const messages = document.getElementById('chatbot-messages');
    const loading = document.getElementById('chatbot-loading');

    function toggleChat() {
        windowEl.style.display = windowEl.style.display === 'flex' ? 'none' : 'flex';
    }

    toggle.addEventListener('click', toggleChat);
    close.addEventListener('click', () => { windowEl.style.display = 'none'; });

    function addMessage(text, sender) {
        const div = document.createElement('div');
        div.className = 'chatbot-msg' + (sender === 'user' ? ' chatbot-msg-user' : ' chatbot-msg-bot');
        div.style.cssText = `
            align-self: ${sender === 'user' ? 'flex-end' : 'flex-start'};
            background: ${sender === 'user' ? 'linear-gradient(135deg, #ff007f 0%, #9d00ff 100%)' : colors.botBg};
            border: ${sender === 'user' ? 'none' : `1px solid ${colors.botBorder}`};
            padding: 10px 16px;
            border-radius: ${sender === 'user' ? '12px 12px 4px 12px' : '12px 12px 12px 4px'};
            color: #e0e0e0;
            font-size: 14px;
            line-height: 1.5;
            max-width: ${sender === 'user' ? '80%' : '85%'};
            white-space: pre-wrap;
        `;
        div.textContent = text;
        messages.appendChild(div);
        messages.scrollTop = messages.scrollHeight;
    }

    async function sendMessage() {
        const text = input.value.trim();
        if (!text) return;

        addMessage(text, 'user');
        input.value = '';
        loading.style.display = 'flex';

        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: text })
            });
            const data = await res.json();

            if (!res.ok || !data.reply) {
                throw new Error(data.error || 'Error al obtener respuesta');
            }

            addMessage(data.reply, 'bot');
        } catch (err) {
            console.error('Chat error:', err);
            addMessage('Perdón, no pude conectar con la IA en este momento. Puedes escribirnos por WhatsApp.', 'bot');
        } finally {
            loading.style.display = 'none';
        }
    }

    send.addEventListener('click', sendMessage);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });
});
