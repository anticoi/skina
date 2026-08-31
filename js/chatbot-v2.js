// Chatbot para La Skina - Respuestas predefinidas + WhatsApp
// Configuración del número de WhatsApp
const WHATSAPP_NUMBER = '56990165899';

// Lista de artistas que toca La Skina
const artistasSkina = [
    'earth wind and fire', 'earth wind', 'ewf',
    'michael jackson', 'mj',
    'madonna',
    'prince',
    'duran duran',
    'depeche mode',
    'new order',
    'the cure',
    'a ha', 'a-ha',
    'tears for fears',
    'spandau ballet',
    'culture club',
    'wham', 'george michael',
    'phil collins', 'genesis',
    'police', 'sting',
    'u2',
    'queen',
    'bryan adams',
    'bon jovi',
    'def leppard',
    'guns n roses', 'guns n\' roses',
    'aerosmith',
    'ac dc', 'ac/dc',
    'journey',
    'toto',
    'chicago',
    'steve wonder', 'stevie wonder',
    'lionel richie',
    'billy ocean',
    'rick astley',
    'whitney houston',
    'barry manilow',
    'elton john',
    'billy joel',
    'rod stewart',
    'joe cocker',
    'eric clapton',
    'dire straits',
    'europe',
    'foreigner',
    'reo speedwagon',
    'styx',
    'supertramp',
    'pink floyd',
    'led zeppelin',
    'deep purple',
    'scorpions',
    'soda stereo',
    'virus',
    'los abuelos de la nada',
    'miguel mateos', 'miguel mateos zas',
    'charly garcia', 'charly garcía',
    'spinetta', 'invisible',
    'sumo',
    'los redonditos de ricota', 'indio solari',
    'patricio rey',
    'fito paez',
    'luis alberto spinetta',
    'mana', 'maná',
    'santana',
    'enrique bunbury',
    'hombres g',
    'los secretos',
    'el ultimo de la fila', 'el último de la fila',
    'gabinete caligari',
    'loquillo',
    'antonio flores',
    'roberto carlos',
    'camilo sesto',
    'jose jose',
    'luis miguel',
    'juan luis guerra',
    'manuel mijares',
    'emmanuel',
    'ricardo arjona',
    'julio iglesias',
    'enrique iglesias',
    'chayanne',
    'ricky martin',
    'gloria estefan', 'miami sound machine',
    'celia cruz',
    'selenas',
    'thalia', 'thalía',
    'bill haley',
    'elvis presley', 'elvis',
    'creedence clearwater revival', 'creedence', 'ccr',
    'kc and the sunshine band', 'kc',
    'hall and oates', 'hall & oates',
    'katrina and the waves',
    'glenn frey',
    'inx'
];

// Lista de canciones populares que tocan
const cancionesSkina = [
    'september', 'boogie wonderland',
    'billie jean', 'thriller', 'beat it',
    'like a virgin', 'material girl',
    'purple rain',
    'sweet dreams',
    'don\'t you forget about me',
    'take on me',
    'everybody wants to rule the world',
    'true',
    'karma chameleon',
    'wake me up before you go go',
    'in the air tonight',
    'every breath you take',
    'with or without you',
    'bohemian rhapsody', 'we will rock you',
    'summer of 69',
    'livin on a prayer',
    'pour some sugar on me',
    'sweet child o mine',
    'i don\'t want to miss a thing',
    'africa',
    'hard to say i\'m sorry',
    'superstition',
    'all night long',
    'caribbean queen',
    'never gonna give you up',
    'i wanna dance with somebody',
    'your song',
    'piano man',
    'sultans of swing',
    'the final countdown',
    'i want to know what love is',
    'keep on loving you',
    'come sail away',
    'another brick in the wall',
    'stairway to heaven',
    'smoke on the water',
    'rock you like a hurricane',
    'de musica ligera',
    'lamento boliviano',
    'en la ciudad de la furia',
    'costumbres argentinas',
    'mi primer dia sin ti',
    'devuelveme a mi chica',
    'noches de bohemia',
    'la flaca',
    'el 28',
    'tu jardin con enanitos',
    'la camisa negra',
    'bailando',
    'vivir mi vida',
    'la bilirrubina',
    'el precio de mi cabeza',
    'funky music', 'funky',
    'brick house',
    'that\'s the way', 'thats the way',
    'shake shake',
    'boogie man',
    'keep it comin', 'keep it coming',
    'new sensation',
    'last train to london',
    'maniac',
    'heat is on',
    'walking on sunshine',
    'maneater',
    'i can go for that',
    'kiss on my list',
    'get ready',
    'rock around the clock',
    'hound dog',
    'jailhouse rock',
    'suspicious minds',
    'proud mary',
    'bad moon rising',
    'have you ever seen the rain',
    'oye como va',
    'black magic woman',
    'smooth',
    'simbolo de paz', 'símbolo de paz',
    'no voy en tren',
    'estoy verde',
    'influenza',
    'vitaminas',
    'jet set'
];

// Base de conocimiento del chatbot
const chatbotKnowledge = [
    {
        keywords: ['precio', 'costo', 'cuanto', 'valor', 'cobran', 'tarifa', 'presupuesto'],
        response: 'Nuestros precios varían según el tipo de evento, duración y ubicación. Te recomendamos contactarnos directamente por WhatsApp para darte una cotización personalizada. ¿Quieres que te conecte con nuestro equipo?',
        action: 'whatsapp'
    },
    {
        keywords: ['reserva', 'reservar', 'contratar', 'contratacion', 'agendar', 'booking', 'disponibilidad'],
        response: '¡Genial! Para reservas puedes contactarnos directamente por WhatsApp o usar el formulario de contacto en la sección "Contacto". Te respondemos lo antes posible. ¿Quieres abrir WhatsApp ahora?',
        action: 'whatsapp'
    },
    {
        keywords: ['repertorio', 'canciones', 'musica', 'temas', 'playlist', 'que tocan', 'que tocan'],
        response: 'Nuestro repertorio incluye: Clásicos de los 80, Pop/Rock Retro, Baladas del Recuerdo, Ritmos de Época, Disco, New Wave, Rock en Español y Pop Latino. ¡Tenemos más de 100 clásicos en nuestro repertorio! ¿Quieres saber si tocamos alguna canción o artista en particular?',
        action: 'none'
    },
    {
        keywords: ['evento', 'cumpleaños', 'boda', 'matrimonio', 'aniversario', 'empresa', 'corporativo', 'pub', 'bar', 'fiesta'],
        response: 'Tocamos en todo tipo de eventos: cumpleaños, bodas, aniversarios, eventos corporativos, pubs y bares. Adaptamos la música según la ocasión. ¿Quieres consultarnos sobre tu evento por WhatsApp?',
        action: 'whatsapp'
    },
    {
        keywords: ['donde', 'ubicacion', 'direccion', 'lugar', 'santiago', 'region', 'ciudad'],
        response: 'Estamos basados en Santiago, Chile. Tocamos en diferentes locaciones según el evento. ¿Quieres consultarnos sobre tu zona por WhatsApp?',
        action: 'whatsapp'
    },
    {
        keywords: ['contacto', 'telefono', 'celular', 'numero', 'email', 'correo', 'whatsapp'],
        response: 'Puedes contactarnos por WhatsApp al +56 9 9016 5899 o usar el formulario de contacto en la sección "Contacto". ¿Quieres abrir WhatsApp ahora?',
        action: 'whatsapp'
    },
    {
        keywords: ['integrantes', 'miembros', 'quienes', 'banda', 'grupo', 'musicos'],
        response: 'La Skina está conformada por músicos con más de 20 años de trayectoria. Cada integrante domina su instrumento y el arte de conectar con el público. ¡Conócenos en la sección "Nosotros"!',
        action: 'none'
    },
    {
        keywords: ['video', 'videos', 'youtube', 'ver', 'multimedia'],
        response: 'Puedes ver nuestros videos en la sección "Videos" del sitio. También puedes seguirnos en Facebook para más contenido. ¿Quieres ir a la sección de videos?',
        action: 'scroll-videos'
    },
    {
        keywords: ['galeria', 'fotos', 'imagenes', 'fotografias'],
        response: 'Mira nuestros momentos especiales en la sección "Galería". ¿Quieres ir a ver las fotos?',
        action: 'scroll-galeria'
    },
    {
        keywords: ['facebook', 'redes', 'redes sociales', 'seguir'],
        response: 'Síguenos en Facebook: https://www.facebook.com/profile.php?id=61557197311912 ¿Quieres abrir nuestro Facebook?',
        action: 'facebook'
    },
    {
        keywords: ['instagram', 'insta', 'gram'],
        response: 'Síguenos en Instagram: https://www.instagram.com/banda_la_skina/ ¿Quieres abrir nuestro Instagram?',
        action: 'instagram'
    },
    {
        keywords: ['hola', 'buenas', 'buenos dias', 'buenas tardes', 'buenas noches', 'saludos', 'hey', 'que tal'],
        response: '¡Hola! Soy el asistente virtual de La Skina. Puedo ayudarte con información sobre reservas, repertorio, eventos y más. ¿En qué te puedo ayudar?',
        action: 'none'
    },
    {
        keywords: ['gracias', 'muchas gracias', 'perfecto', 'genial', 'excelente', 'ok', 'gracias por'],
        response: '¡De nada! Si necesitas algo más, no dudes en preguntar. También puedes contactarnos directamente por WhatsApp. ¿Hay algo más en lo que te pueda ayudar?',
        action: 'none'
    },
    {
        keywords: ['adios', 'chao', 'hasta luego', 'nos vemos', 'bye', 'hasta pronto'],
        response: '¡Hasta pronto! Gracias por tu interés en La Skina. ¡Esperamos verte en nuestro próximo evento! 🎵',
        action: 'none'
    }
];

// Respuesta por defecto
const defaultResponse = 'No estoy seguro de entender tu pregunta. Puedo ayudarte con: reservas, precios, repertorio, eventos, contacto, videos y galería. También puedes contactarnos directamente por WhatsApp. ¿Quieres abrir WhatsApp?',
    defaultAction = 'whatsapp';

// Buscar la mejor respuesta
function findResponse(message) {
    const lowerMessage = message.toLowerCase();

    // 1. Detectar preguntas sobre artistas o canciones específicas
    // Patrones: "se saben X", "tocan X", "conocen X", "tienen X", "saben tocar X"
    const patronesPregunta = [
        'se saben', 'saben tocar', 'tocan', 'conocen', 'tienen',
        'saben', 'tocan la cancion', 'tocan el tema', 'tienen en el repertorio',
        'cantan', 'interpretan', 'tienen la cancion', 'tienen el tema',
        'saben la cancion', 'saben el tema', 'reper'
    ];

    for (const patron of patronesPregunta) {
        if (lowerMessage.includes(patron)) {
            // Buscar si menciona un artista que tocamos
            for (const artista of artistasSkina) {
                if (lowerMessage.includes(artista)) {
                    return {
                        response: `¡Sí! Tocamos a ${artista.toUpperCase()} en nuestro repertorio 🎵. Es parte de los clásicos que interpretamos en nuestros shows. ¿Quieres reservar un evento o consultar por más canciones?`,
                        action: 'whatsapp'
                    };
                }
            }
            // Buscar si menciona una canción que tocamos
            for (const cancion of cancionesSkina) {
                if (lowerMessage.includes(cancion)) {
                    return {
                        response: `¡Sí! "${cancion.charAt(0).toUpperCase() + cancion.slice(1)}" está en nuestro repertorio 🎵. La tocamos regularmente en nuestros shows. ¿Quieres reservar un evento o consultar por más canciones?`,
                        action: 'whatsapp'
                    };
                }
            }
            // Si preguntan por algo que no reconocemos
            return {
                response: 'Ese artista/canción no lo tengo confirmado en nuestra lista, pero estamos siempre ampliando el repertorio. Te recomiendo consultarlo directamente por WhatsApp, ahí te confirmamos rápido. ¿Quieres abrir WhatsApp?',
                action: 'whatsapp'
            };
        }
    }

    // 2. Buscar artista mencionado directamente (sin verbo de pregunta)
    for (const artista of artistasSkina) {
        if (lowerMessage.includes(artista)) {
            return {
                response: `¡Sí! Tocamos a ${artista.toUpperCase()} en nuestro repertorio 🎵. Es parte de los clásicos que interpretamos. ¿Quieres reservar un evento o saber más?`,
                action: 'whatsapp'
            };
        }
    }

    // 3. Buscar canción mencionada directamente
    for (const cancion of cancionesSkina) {
        if (lowerMessage.includes(cancion)) {
            return {
                response: `¡Sí! "${cancion.charAt(0).toUpperCase() + cancion.slice(1)}" está en nuestro repertorio 🎵. ¿Quieres reservar un evento o saber más?`,
                action: 'whatsapp'
            };
        }
    }

    // 4. Búsqueda normal en la base de conocimiento
    let bestMatch = null;
    let maxMatches = 0;

    for (const item of chatbotKnowledge) {
        let matches = 0;
        for (const keyword of item.keywords) {
            if (lowerMessage.includes(keyword)) {
                matches++;
            }
        }
        if (matches > maxMatches) {
            maxMatches = matches;
            bestMatch = item;
        }
    }

    if (bestMatch) {
        return { response: bestMatch.response, action: bestMatch.action };
    }
    return { response: defaultResponse, action: defaultAction };
}

// Ejecutar acción (abrir WhatsApp, scroll, etc.)
function executeAction(action) {
    switch (action) {
        case 'whatsapp':
            const whatsappMsg = encodeURIComponent('Hola, vengo del sitio web de La Skina y me gustaría más información');
            window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMsg}`, '_blank');
            break;
        case 'facebook':
            window.open('https://www.facebook.com/profile.php?id=61557197311912', '_blank');
            break;
        case 'instagram':
            window.open('https://www.instagram.com/banda_la_skina/', '_blank');
            break;
        case 'scroll-videos':
            document.getElementById('multimedia').scrollIntoView({ behavior: 'smooth' });
            break;
        case 'scroll-galeria':
            document.getElementById('galeria').scrollIntoView({ behavior: 'smooth' });
            break;
        case 'scroll-contacto':
            document.getElementById('contacto').scrollIntoView({ behavior: 'smooth' });
            break;
    }
}

// Crear el chatbot UI
function createChatbot() {
    // Botón flotante
    const chatButton = document.createElement('div');
    chatButton.id = 'chatbot-button';
    chatButton.innerHTML = `
        <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
        </svg>
    `;
    chatButton.style.cssText = `
        position: fixed;
        bottom: 24px;
        left: 24px;
        width: 60px;
        height: 60px;
        background: linear-gradient(135deg, #ff007f 0%, #9d00ff 100%);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        z-index: 9999;
        box-shadow: 0 4px 20px rgba(255, 0, 127, 0.5);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        color: white;
    `;
    chatButton.onmouseover = () => {
        chatButton.style.transform = 'scale(1.1)';
        chatButton.style.boxShadow = '0 6px 30px rgba(255, 0, 127, 0.7)';
    };
    chatButton.onmouseout = () => {
        chatButton.style.transform = 'scale(1)';
        chatButton.style.boxShadow = '0 4px 20px rgba(255, 0, 127, 0.5)';
    };

    // Ventana del chat
    const chatWindow = document.createElement('div');
    chatWindow.id = 'chatbot-window';
    chatWindow.style.cssText = `
        position: fixed;
        bottom: 100px;
        left: 24px;
        width: 360px;
        max-width: calc(100vw - 48px);
        height: 500px;
        max-height: calc(100vh - 140px);
        background: #160f2e;
        border-radius: 16px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
        z-index: 9999;
        display: none;
        flex-direction: column;
        overflow: hidden;
        border: 1px solid rgba(0, 243, 255, 0.2);
    `;

    chatWindow.innerHTML = `
        <div style="background: linear-gradient(135deg, #ff007f 0%, #9d00ff 100%); padding: 16px; display: flex; align-items: center; justify-content: space-between;">
            <div style="display: flex; align-items: center; gap: 12px;">
                <div style="width: 40px; height: 40px; background: rgba(255,255,255,0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                    <svg class="w-6 h-6" fill="none" stroke="white" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path>
                    </svg>
                </div>
                <div>
                    <div style="color: white; font-weight: bold; font-size: 16px;">La Skina</div>
                    <div style="color: rgba(255,255,255,0.8); font-size: 12px;">Asistente Virtual</div>
                </div>
            </div>
            <button id="chatbot-close" style="background: none; border: none; color: white; cursor: pointer; padding: 4px;">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>
        </div>
        <div id="chatbot-messages" style="flex: 1; overflow-y: auto; padding: 16px; display: flex; flex-direction: column; gap: 12px;">
            <div style="background: rgba(0, 243, 255, 0.1); border: 1px solid rgba(0, 243, 255, 0.2); padding: 12px 16px; border-radius: 12px 12px 12px 4px; color: #e0e0e0; font-size: 14px; line-height: 1.5;">
                ¡Hola! Soy el asistente virtual de La Skina 🎵. ¿En qué te puedo ayudar?
            </div>
            <div style="display: flex; flex-direction: column; gap: 6px;">
                <button class="chatbot-quick-btn" data-msg="Reservas y cotizaciones" style="background: rgba(255, 0, 127, 0.15); border: 1px solid rgba(255, 0, 127, 0.4); border-radius: 8px; padding: 8px 14px; color: #ff007f; cursor: pointer; font-size: 13px; font-weight: 600; text-align: left; transition: all 0.2s ease;">
                    📅 Reservas y cotizaciones
                </button>
                <button class="chatbot-quick-btn" data-msg="Repertorio musical" style="background: rgba(0, 243, 255, 0.15); border: 1px solid rgba(0, 243, 255, 0.4); border-radius: 8px; padding: 8px 14px; color: #00f3ff; cursor: pointer; font-size: 13px; font-weight: 600; text-align: left; transition: all 0.2s ease;">
                    🎵 Repertorio musical
                </button>
                <button class="chatbot-quick-btn" data-msg="Tipos de eventos" style="background: rgba(157, 0, 255, 0.15); border: 1px solid rgba(157, 0, 255, 0.4); border-radius: 8px; padding: 8px 14px; color: #9d00ff; cursor: pointer; font-size: 13px; font-weight: 600; text-align: left; transition: all 0.2s ease;">
                    🎉 Tipos de eventos
                </button>
                <button class="chatbot-quick-btn" data-msg="Contacto y redes sociales" style="background: rgba(37, 211, 102, 0.15); border: 1px solid rgba(37, 211, 102, 0.4); border-radius: 8px; padding: 8px 14px; color: #25D366; cursor: pointer; font-size: 13px; font-weight: 600; text-align: left; transition: all 0.2s ease;">
                    📞 Contacto y redes sociales
                </button>
            </div>
        </div>
        <div style="padding: 12px; border-top: 1px solid rgba(255,255,255,0.1); display: flex; gap: 8px;">
            <input id="chatbot-input" type="text" placeholder="Escribe tu mensaje..." style="flex: 1; background: #0d081d; border: 1px solid rgba(255,0,127,0.3); border-radius: 8px; padding: 10px 14px; color: white; font-size: 14px; outline: none;">
            <button id="chatbot-send" style="background: linear-gradient(135deg, #ff007f 0%, #9d00ff 100%); border: none; border-radius: 8px; padding: 10px 16px; color: white; cursor: pointer; display: flex; align-items: center; justify-content: center;">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                </svg>
            </button>
        </div>
        <div style="padding: 8px 12px; background: rgba(13, 8, 29, 0.8); border-top: 1px solid rgba(255,255,255,0.05); text-align: center;">
            <button id="chatbot-whatsapp" style="background: #25D366; border: none; border-radius: 8px; padding: 8px 16px; color: white; cursor: pointer; font-size: 13px; font-weight: 600; display: inline-flex; align-items: center; gap: 6px;">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Hablar por WhatsApp
            </button>
        </div>
    `;

    document.body.appendChild(chatButton);
    document.body.appendChild(chatWindow);

    // Toggle chat window
    chatButton.addEventListener('click', () => {
        const window = document.getElementById('chatbot-window');
        if (window.style.display === 'flex') {
            window.style.display = 'none';
        } else {
            window.style.display = 'flex';
        }
    });

    // Close button
    document.getElementById('chatbot-close').addEventListener('click', () => {
        chatWindow.style.display = 'none';
    });

    // WhatsApp button
    document.getElementById('chatbot-whatsapp').addEventListener('click', () => {
        executeAction('whatsapp');
    });

    // Quick reply buttons
    document.querySelectorAll('.chatbot-quick-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const msg = this.dataset.msg;
            // Simular envío del mensaje
            addMessage(msg, 'user');
            // Respuesta del bot
            setTimeout(() => {
                const { response, action } = findResponse(msg);
                addMessage(response, 'bot', action);
            }, 500);
        });
        btn.onmouseover = () => { btn.style.transform = 'translateX(4px)'; };
        btn.onmouseout = () => { btn.style.transform = 'translateX(0)'; };
    });

    // Send message
    const input = document.getElementById('chatbot-input');
    const sendBtn = document.getElementById('chatbot-send');

    function sendMessage() {
        const text = input.value.trim();
        if (!text) return;

        // Add user message
        addMessage(text, 'user');
        input.value = '';

        // Bot response after short delay
        setTimeout(() => {
            const { response, action } = findResponse(text);
            addMessage(response, 'bot', action);
        }, 500);
    }

    sendBtn.addEventListener('click', sendMessage);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });
}

// Add message to chat
function addMessage(text, sender, action) {
    const messages = document.getElementById('chatbot-messages');
    const msgDiv = document.createElement('div');

    if (sender === 'user') {
        msgDiv.style.cssText = 'align-self: flex-end; background: linear-gradient(135deg, #ff007f 0%, #9d00ff 100%); padding: 10px 16px; border-radius: 12px 12px 4px 12px; color: white; font-size: 14px; line-height: 1.5; max-width: 80%;';
    } else {
        msgDiv.style.cssText = 'align-self: flex-start; background: rgba(0, 243, 255, 0.1); border: 1px solid rgba(0, 243, 255, 0.2); padding: 10px 16px; border-radius: 12px 12px 12px 4px; color: #e0e0e0; font-size: 14px; line-height: 1.5; max-width: 85%;';
    }

    msgDiv.textContent = text;
    messages.appendChild(msgDiv);

    // Add action button if needed
    if (action && action !== 'none') {
        const btnContainer = document.createElement('div');
        btnContainer.style.cssText = 'align-self: flex-start; margin-top: 4px;';

        let btnText = '';
        let btnIcon = '';
        if (action === 'whatsapp') {
            btnText = 'Abrir WhatsApp';
            btnIcon = '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>';
        } else if (action === 'facebook') {
            btnText = 'Abrir Facebook';
            btnIcon = '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>';
        } else if (action === 'instagram') {
            btnText = 'Abrir Instagram';
            btnIcon = '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>';
        } else if (action === 'scroll-videos') {
            btnText = 'Ver Videos';
            btnIcon = '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 13.19l6.063 3.565a1 1 0 001.495-.869V8.114a1 1 0 00-1.495-.869l-6.063 3.565a1 1 0 000 1.738z"></path></svg>';
        } else if (action === 'scroll-galeria') {
            btnText = 'Ver Galería';
            btnIcon = '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>';
        }

        btnContainer.innerHTML = `<button class="chatbot-action-btn" data-action="${action}" style="background: ${action === 'whatsapp' ? '#25D366' : action === 'facebook' ? '#1877F2' : action === 'instagram' ? 'linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)' : 'linear-gradient(135deg, #ff007f 0%, #9d00ff 100%)'}; border: none; border-radius: 8px; padding: 8px 14px; color: white; cursor: pointer; font-size: 13px; font-weight: 600; display: inline-flex; align-items: center; gap: 6px;">${btnIcon} ${btnText}</button>`;

        btnContainer.querySelector('.chatbot-action-btn').addEventListener('click', function() {
            executeAction(this.dataset.action);
        });

        messages.appendChild(btnContainer);
    }

    // Auto scroll
    messages.scrollTop = messages.scrollHeight;
}

// Initialize chatbot when DOM is ready
document.addEventListener('DOMContentLoaded', createChatbot);