// Contador de Visitas - La Skina
// Usa localStorage para contar visitas únicas por navegador
// y muestra un contador visual estilo retro

function initVisitorCounter() {
    // Claves de localStorage
    const VISIT_KEY = 'skina_visits';
    const LAST_VISIT_KEY = 'skina_last_visit';
    const SESSION_KEY = 'skina_session_counted';

    // Obtener contador actual
    let visits = parseInt(localStorage.getItem(VISIT_KEY) || '0');
    const lastVisit = localStorage.getItem(LAST_VISIT_KEY);
    const now = Date.now();
    const sessionCounted = sessionStorage.getItem(SESSION_KEY);

    // Contar visita nueva si no se ha contado en esta sesión
    // o si han pasado más de 30 minutos desde la última visita
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

    // Números estilo display digital
    const visitStr = String(visits).padStart(6, '0');
    let digitsHtml = '';
    for (const digit of visitStr) {
        digitsHtml += `<span style="display: inline-block; min-width: 14px; text-align: center; color: #00f3ff; text-shadow: 0 0 8px rgba(0, 243, 255, 0.6); font-weight: bold;">${digit}</span>`;
    }

    counter.innerHTML = `
        ${icon}
        <span style="color: #888; font-size: 11px;">VISITAS</span>
        <span style="display: flex; gap: 1px; background: rgba(0,0,0,0.3); padding: 2px 6px; border-radius: 4px; border: 1px solid rgba(0, 243, 255, 0.15);">${digitsHtml}</span>
    `;

    document.body.appendChild(counter);
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initVisitorCounter);
