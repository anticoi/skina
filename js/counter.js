// Contador de Visitas - La Skina
// Simula visitantes en tiempo real con base realista

function initVisitorCounter() {
    const VISIT_KEY = 'skina_visits';
    const LAST_VISIT_KEY = 'skina_last_visit';
    const SESSION_KEY = 'skina_session_counted';
    const BASE_VISITS = 3847; // Base realista de visitas

    // Obtener contador guardado o usar base
    let visits = parseInt(localStorage.getItem(VISIT_KEY) || BASE_VISITS.toString());
    const lastVisit = localStorage.getItem(LAST_VISIT_KEY);
    const now = Date.now();
    const sessionCounted = sessionStorage.getItem(SESSION_KEY);

    // Contar visita nueva
    if (!sessionCounted || (lastVisit && (now - parseInt(lastVisit)) > 1800000)) {
        visits++;
        localStorage.setItem(VISIT_KEY, visits.toString());
        localStorage.setItem(LAST_VISIT_KEY, now.toString());
        sessionStorage.setItem(SESSION_KEY, 'true');
    }

    // Crear el contador visual
    const counter = document.createElement('div');
    counter.id = 'visitor-counter';
    counter.style.cssText = `
        position: fixed;
        bottom: 24px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(13, 8, 29, 0.9);
        border: 1px solid rgba(0, 243, 255, 0.3);
        border-radius: 20px;
        padding: 6px 16px;
        display: flex;
        align-items: center;
        gap: 8px;
        z-index: 9998;
        backdrop-filter: blur(10px);
        font-family: monospace;
        font-size: 13px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
    `;

    // Icono de ojo
    const icon = `
        <svg style="width: 16px; height: 16px; color: #00f3ff;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
        </svg>
    `;

    // Indicador "en vivo" (punto pulsante)
    const liveDot = `
        <span style="display: inline-block; width: 8px; height: 8px; background: #ff007f; border-radius: 50%; box-shadow: 0 0 6px #ff007f; animation: livePulse 1.5s infinite;"></span>
    `;

    // Agregar animación CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes livePulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.4; transform: scale(0.8); }
        }
        @keyframes digitFlip {
            0% { transform: translateY(-100%); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes notifSlide {
            0% { transform: translateX(-50%) translateY(20px); opacity: 0; }
            15%, 85% { transform: translateX(-50%) translateY(0); opacity: 1; }
            100% { transform: translateX(-50%) translateY(-10px); opacity: 0; }
        }
        @keyframes counterFlash {
            0% { color: #00f3ff; text-shadow: 0 0 8px rgba(0, 243, 255, 0.6); }
            50% { color: #ff007f; text-shadow: 0 0 12px rgba(255, 0, 127, 0.8); }
            100% { color: #00f3ff; text-shadow: 0 0 8px rgba(0, 243, 255, 0.6); }
        }
    `;
    document.head.appendChild(style);

    // Función para renderizar los dígitos
    function renderDigits(num) {
        const visitStr = String(num).padStart(6, '0');
        let digitsHtml = '';
        for (const digit of visitStr) {
            digitsHtml += `<span class="counter-digit" style="display: inline-block; min-width: 14px; text-align: center; color: #00f3ff; text-shadow: 0 0 8px rgba(0, 243, 255, 0.6); font-weight: bold;">${digit}</span>`;
        }
        return digitsHtml;
    }

    counter.innerHTML = `
        ${icon}
        <span style="color: #888; font-size: 11px;">VISITAS</span>
        <span id="counter-digits" style="display: flex; gap: 1px; background: rgba(0,0,0,0.3); padding: 2px 6px; border-radius: 4px; border: 1px solid rgba(0, 243, 255, 0.15);">${renderDigits(visits)}</span>
        ${liveDot}
        <span style="color: #ff007f; font-size: 10px; font-weight: bold;">EN VIVO</span>
    `;

    document.body.appendChild(counter);

    // Nombres simulados de visitantes
    const nombresVisitantes = [
        'Carlos desde Santiago', 'María desde Providencia', 'Pedro desde Ñuñoa',
        'Ana desde Las Condes', 'Jorge desde Maipú', 'Francisca desde Viña',
        'Rodrigo desde Valparaíso', 'Camila desde Concepción', 'Felipe desde La Serena',
        'Valeria desde Antofagasta', 'Diego desde Puente Alto', 'Javiera desde Talca',
        'Sebastián desde Rancagua', 'Daniela desde Temuco', 'Matías desde Iquique',
        'Carolina desde Coquimbo', 'Tomás desde Talcahuano', 'Isidora desde Chillán',
        'Benjamín desde Arica', 'Sofía desde Curicó', 'Ignacio desde Osorno',
        'Fernanda desde Puerto Montt', 'Vicente desde Calama', 'Trinidad desde Quillota',
        'Alonso desde Los Ángeles', 'Emilia desde San Fernando', 'Mateo desde Melipilla'
    ];

    // Función para mostrar notificación de nuevo visitante
    function showVisitorNotification() {
        const nombre = nombresVisitantes[Math.floor(Math.random() * nombresVisitantes.length)];
        const notif = document.createElement('div');
        notif.style.cssText = `
            position: fixed;
            bottom: 60px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(13, 8, 29, 0.95);
            border: 1px solid rgba(255, 0, 127, 0.4);
            border-radius: 12px;
            padding: 8px 16px;
            display: flex;
            align-items: center;
            gap: 8px;
            z-index: 9997;
            backdrop-filter: blur(10px);
            font-family: monospace;
            font-size: 12px;
            color: #e0e0e0;
            box-shadow: 0 4px 15px rgba(255, 0, 127, 0.2);
            animation: notifSlide 4s ease-in-out forwards;
            white-space: nowrap;
        `;
        notif.innerHTML = `
            <span style="display: inline-block; width: 8px; height: 8px; background: #25D366; border-radius: 50%; box-shadow: 0 0 6px #25D366;"></span>
            <span style="color: #25D366; font-weight: bold;">Nuevo visitante:</span>
            <span style="color: #00f3ff;">${nombre}</span>
        `;
        document.body.appendChild(notif);
        setTimeout(() => notif.remove(), 4000);
    }

    // Función para incrementar el contador con animación
    function incrementCounter() {
        visits++;
        localStorage.setItem(VISIT_KEY, visits.toString());
        const digitsEl = document.getElementById('counter-digits');
        if (digitsEl) {
            digitsEl.innerHTML = renderDigits(visits);
            // Animar el último dígito
            const lastDigit = digitsEl.querySelector('.counter-digit:last-child');
            if (lastDigit) {
                lastDigit.style.animation = 'counterFlash 0.6s ease';
                setTimeout(() => { lastDigit.style.animation = ''; }, 600);
            }
        }
        // Mostrar notificación
        showVisitorNotification();
    }

    // Simular visitantes aleatorios
    // Primer visitante después de 8-15 segundos
    function scheduleNextVisitor() {
        const delay = Math.random() * 30000 + 15000; // 15-45 segundos
        setTimeout(() => {
            incrementCounter();
            scheduleNextVisitor();
        }, delay);
    }

    // Iniciar simulación después de 10 segundos
    setTimeout(() => {
        scheduleNextVisitor();
    }, 10000);
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initVisitorCounter);
