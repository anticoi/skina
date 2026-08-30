// Calendario de Reservas - La Skina
// Muestra fechas ocupadas (histórico) y próximos eventos confirmados

// Configuración de eventos confirmados
const calendarEvents = {
    '2026-09-12': { title: 'Golden Music', location: 'Golden Music - Av. Irarrázaval 1951, Ñuñoa', type: 'public' },
    '2026-09-17': { title: 'Evento Privado', location: 'Los Andes', type: 'private' },
    '2026-09-19': { title: 'Golden Music', location: 'Golden Music - Av. Irarrázaval 1951, Ñuñoa', type: 'public' }
};

// Generar todos los sábados pasados de 2026 como histórico
const pastSaturdays = {};
(function generatePastSaturdays() {
    const today = new Date(2026, 7, 30); // 30 de agosto de 2026
    let d = new Date(2026, 0, 1);
    while (d <= today) {
        if (d.getDay() === 6) { // Sábado
            const key = formatDateKey(d);
            if (!calendarEvents[key]) {
                pastSaturdays[key] = { title: 'Ocupado', location: '', type: 'past' };
            }
        }
        d.setDate(d.getDate() + 1);
    }
})();

function formatDateKey(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
}

const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

let currentMonth = 8; // Septiembre (0-indexed)
let currentYear = 2026;

function renderCalendar() {
    const container = document.getElementById('calendar-container');
    if (!container) return;

    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDayOfWeek = firstDay.getDay();

    const today = new Date();
    const todayKey = formatDateKey(today);

    let html = `
        <div class="bg-[#160f2e] rounded-2xl p-6 border border-[#00f3ff]/30">
            <!-- Header del calendario -->
            <div class="flex items-center justify-between mb-6">
                <button id="cal-prev" class="w-10 h-10 rounded-full bg-[#ff007f]/20 border border-[#ff007f]/40 flex items-center justify-center text-[#ff007f] hover:bg-[#ff007f]/30 transition-all">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                    </svg>
                </button>
                <h3 class="font-display text-2xl font-bold text-gold">${monthNames[currentMonth]} ${currentYear}</h3>
                <button id="cal-next" class="w-10 h-10 rounded-full bg-[#ff007f]/20 border border-[#ff007f]/40 flex items-center justify-center text-[#ff007f] hover:bg-[#ff007f]/30 transition-all">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                </button>
            </div>

            <!-- Días de la semana -->
            <div class="grid grid-cols-7 gap-1 mb-2">
    `;

    dayNames.forEach(day => {
        html += `<div class="text-center text-gray-500 text-sm font-semibold py-2">${day}</div>`;
    });

    html += '</div><div class="grid grid-cols-7 gap-1">';

    // Espacios vacíos antes del primer día
    for (let i = 0; i < startDayOfWeek; i++) {
        html += '<div></div>';
    }

    // Días del mes
    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(currentYear, currentMonth, day);
        const dateKey = formatDateKey(date);
        const isPast = date < new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const isToday = dateKey === todayKey;
        const isSaturday = date.getDay() === 6;

        let dayClass = 'text-gray-400';
        let bgClass = 'bg-[#0d081d]/50';
        let extraHtml = '';
        let clickable = false;

        // Eventos confirmados
        if (calendarEvents[dateKey]) {
            const event = calendarEvents[dateKey];
            clickable = true;
            if (event.type === 'public') {
                bgClass = 'bg-[#ff007f]/20 border border-[#ff007f]/50';
                dayClass = 'text-[#ff007f] font-bold';
                extraHtml = '<div class="w-1.5 h-1.5 bg-[#ff007f] rounded-full mx-auto mt-0.5"></div>';
            } else if (event.type === 'private') {
                bgClass = 'bg-[#9d00ff]/20 border border-[#9d00ff]/50';
                dayClass = 'text-[#9d00ff] font-bold';
                extraHtml = '<div class="w-1.5 h-1.5 bg-[#9d00ff] rounded-full mx-auto mt-0.5"></div>';
            }
        }
        // Sábados pasados (histórico)
        else if (pastSaturdays[dateKey]) {
            bgClass = 'bg-gray-700/30 border border-gray-700/40';
            dayClass = 'text-gray-600 line-through';
            extraHtml = '<div class="w-1.5 h-1.5 bg-gray-600 rounded-full mx-auto mt-0.5"></div>';
        }
        // Sábados futuros disponibles
        else if (isSaturday && !isPast) {
            bgClass = 'bg-green-900/20 border border-green-500/30';
            dayClass = 'text-green-400 font-semibold';
            extraHtml = '<div class="w-1.5 h-1.5 bg-green-500 rounded-full mx-auto mt-0.5"></div>';
        }

        if (isToday) {
            bgClass += ' ring-2 ring-[#00f3ff]';
        }

        if (clickable) {
            html += `<div class="cal-day cursor-pointer hover:scale-105 transition-transform rounded-lg p-2 ${bgClass} ${dayClass} text-center" data-date="${dateKey}">${day}${extraHtml}</div>`;
        } else {
            html += `<div class="rounded-lg p-2 ${bgClass} ${dayClass} text-center">${day}${extraHtml}</div>`;
        }
    }

    html += '</div>';

    // Leyenda
    html += `
        <div class="mt-6 flex flex-wrap gap-4 justify-center text-sm">
            <div class="flex items-center gap-2">
                <div class="w-3 h-3 bg-[#ff007f]/40 border border-[#ff007f]/50 rounded"></div>
                <span class="text-gray-400">Evento Público</span>
            </div>
            <div class="flex items-center gap-2">
                <div class="w-3 h-3 bg-[#9d00ff]/40 border border-[#9d00ff]/50 rounded"></div>
                <span class="text-gray-400">Evento Privado</span>
            </div>
            <div class="flex items-center gap-2">
                <div class="w-3 h-3 bg-green-500/40 border border-green-500/50 rounded"></div>
                <span class="text-gray-400">Disponible</span>
            </div>
            <div class="flex items-center gap-2">
                <div class="w-3 h-3 bg-gray-700/40 border border-gray-700/50 rounded"></div>
                <span class="text-gray-400">Ocupado (Histórico)</span>
            </div>
        </div>
    `;

    // Próximos eventos
    html += `
        <div class="mt-6 pt-6 border-t border-[#00f3ff]/20">
            <h4 class="text-gold font-bold mb-4 text-center">Próximos Eventos Confirmados</h4>
            <div class="space-y-3">
    `;

    const upcomingEvents = Object.entries(calendarEvents)
        .filter(([key]) => key >= todayKey)
        .sort((a, b) => a[0].localeCompare(b[0]));

    if (upcomingEvents.length === 0) {
        html += '<p class="text-gray-500 text-center text-sm">No hay eventos confirmados próximamente</p>';
    } else {
        upcomingEvents.forEach(([key, event]) => {
            const [y, m, d] = key.split('-');
            const eventDate = new Date(parseInt(y), parseInt(m) - 1, parseInt(d));
            const dayName = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'][eventDate.getDay()];
            const typeColor = event.type === 'public' ? 'text-[#ff007f]' : 'text-[#9d00ff]';
            const typeBg = event.type === 'public' ? 'bg-[#ff007f]/10 border-[#ff007f]/30' : 'bg-[#9d00ff]/10 border-[#9d00ff]/30';
            const typeLabel = event.type === 'public' ? 'Público' : 'Privado';

            html += `
                <div class="${typeBg} border rounded-lg p-3 flex items-center justify-between">
                    <div>
                        <div class="${typeColor} font-bold">${event.title}</div>
                        <div class="text-gray-400 text-sm">${event.location}</div>
                    </div>
                    <div class="text-right">
                        <div class="text-white font-semibold">${dayName} ${d}</div>
                        <div class="text-gray-500 text-xs">${monthNames[parseInt(m) - 1]} ${y} · ${typeLabel}</div>
                    </div>
                </div>
            `;
        });
    }

    html += '</div></div></div>';

    container.innerHTML = html;

    // Navegación
    document.getElementById('cal-prev').addEventListener('click', () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        renderCalendar();
    });

    document.getElementById('cal-next').addEventListener('click', () => {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCalendar();
    });

    // Click en días con eventos
    document.querySelectorAll('.cal-day').forEach(day => {
        day.addEventListener('click', function() {
            const dateKey = this.dataset.date;
            const event = calendarEvents[dateKey];
            if (event) {
                showEventModal(dateKey, event);
            }
        });
    });
}

function showEventModal(dateKey, event) {
    const [y, m, d] = dateKey.split('-');
    const eventDate = new Date(parseInt(y), parseInt(m) - 1, parseInt(d));
    const dayName = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'][eventDate.getDay()];
    const typeColor = event.type === 'public' ? '#ff007f' : '#9d00ff';
    const typeLabel = event.type === 'public' ? 'Evento Público' : 'Evento Privado';

    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black/80 z-[10000] flex items-center justify-center p-4';
    modal.innerHTML = `
        <div class="bg-[#160f2e] rounded-2xl p-8 max-w-md w-full border" style="border-color: ${typeColor}80;">
            <div class="text-center">
                <div class="inline-block px-4 py-1 rounded-full text-sm font-semibold mb-4" style="background: ${typeColor}30; color: ${typeColor};">${typeLabel}</div>
                <h3 class="font-display text-3xl font-bold text-gold mb-2">${event.title}</h3>
                <p class="text-gray-300 text-lg mb-1">${dayName} ${d} de ${monthNames[parseInt(m) - 1]} ${y}</p>
                ${event.location ? `<p class="text-gray-400 text-sm mb-6">${event.location}</p>` : '<div class="mb-6"></div>'}
                ${event.type === 'public' ? `
                    <a href="https://www.facebook.com/profile.php?id=61557197311912" target="_blank" class="inline-flex items-center gap-2 btn-primary px-6 py-3 rounded-full text-white font-bold">
                        Más información
                    </a>
                ` : `
                    <p class="text-gray-500 text-sm">Evento privado - No abierto al público</p>
                `}
                <button class="block mx-auto mt-6 text-gray-500 hover:text-gold transition-colors" onclick="this.closest('.fixed').remove()">
                    Cerrar
                </button>
            </div>
        </div>
    `;
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
    document.body.appendChild(modal);
}

document.addEventListener('DOMContentLoaded', renderCalendar);