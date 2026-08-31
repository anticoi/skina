/* ============================================================
   La Skina - Contact Form Handler
   - Validates all fields
   - Shows a themed success notification
   - Opens WhatsApp with a pre-filled message
   - Offers an email (mailto) alternative
   ============================================================ */

(function () {
    'use strict';

    const WHATSAPP_NUMBER = '56990165899';
    const EMAIL_ADDRESS = 'anticoi@gmail.com';

    document.addEventListener('DOMContentLoaded', function () {
        const form = document.getElementById('contact-form');
        if (!form) return;

        form.addEventListener('submit', function (event) {
            event.preventDefault();

            const data = collectFormData(form);

            // Validate all fields are filled
            const missing = validateFields(data);
            if (missing.length) {
                showNotification({
                    type: 'error',
                    title: 'Faltan campos',
                    message: 'Por favor completa: ' + missing.join(', ') + '.'
                });
                highlightMissing(form, missing);
                return;
            }

            clearHighlights(form);

            const whatsappMessage = composeWhatsAppMessage(data);
            const whatsappUrl = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(whatsappMessage);
            const mailtoUrl = composeMailtoUrl(data);

            // Show success notification with action buttons
            showSuccessNotification(whatsappUrl, mailtoUrl, data);

            // Reset the form for future use
            form.reset();
        });

        /* ---------- helpers ---------- */

        function collectFormData(f) {
            return {
                nombre: f.querySelector('[name="nombre"]').value.trim(),
                email: f.querySelector('[name="email"]').value.trim(),
                telefono: f.querySelector('[name="telefono"]').value.trim(),
                fecha: f.querySelector('[name="fecha"]').value.trim(),
                mensaje: f.querySelector('[name="mensaje"]').value.trim()
            };
        }

        function validateFields(d) {
            const missing = [];
            if (!d.nombre) missing.push('Nombre');
            if (!d.email) missing.push('Correo Electrónico');
            if (!d.telefono) missing.push('Teléfono');
            if (!d.fecha) missing.push('Fecha del Evento');
            if (!d.mensaje) missing.push('Mensaje');
            return missing;
        }

        function composeWhatsAppMessage(d) {
            return 'Hola, soy ' + d.nombre + '!\n' +
                'Correo: ' + d.email + '\n' +
                'Teléfono: ' + d.telefono + '\n' +
                'Fecha del evento: ' + d.fecha + '\n' +
                'Mensaje: ' + d.mensaje;
        }

        function composeMailtoUrl(d) {
            const subject = 'Consulta de evento - ' + d.nombre;
            const body = composeWhatsAppMessage(d);
            return 'mailto:' + EMAIL_ADDRESS + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
        }

        function formatDateDisplay(dateStr) {
            if (!dateStr) return '';
            const parts = dateStr.split('-');
            if (parts.length === 3) {
                return parts[2] + '/' + parts[1] + '/' + parts[0];
            }
            return dateStr;
        }

        function highlightMissing(f, missing) {
            const fields = ['nombre', 'email', 'telefono', 'fecha', 'mensaje'];
            const labelMap = {
                'Nombre': 'nombre',
                'Correo Electrónico': 'email',
                'Teléfono': 'telefono',
                'Fecha del Evento': 'fecha',
                'Mensaje': 'mensaje'
            };
            fields.forEach(function (name) {
                const el = f.querySelector('[name="' + name + '"]');
                if (!el) return;
                const label = Object.keys(labelMap).find(function (k) { return labelMap[k] === name; });
                if (missing.indexOf(label) !== -1) {
                    el.style.borderColor = '#ff007f';
                    el.style.boxShadow = '0 0 0 1px rgba(255,0,127,0.5)';
                } else {
                    el.style.borderColor = '';
                    el.style.boxShadow = '';
                }
            });
        }

        function clearHighlights(f) {
            const fields = ['nombre', 'email', 'telefono', 'fecha', 'mensaje'];
            fields.forEach(function (name) {
                const el = f.querySelector('[name="' + name + '"]');
                if (el) {
                    el.style.borderColor = '';
                    el.style.boxShadow = '';
                }
            });
        }

        /* ---------- notification UI ---------- */

        function ensureNotificationStyles() {
            if (document.getElementById('skina-contact-notification-styles')) return;
            const style = document.createElement('style');
            style.id = 'skina-contact-notification-styles';
            style.textContent = `
                .skina-notif-overlay {
                    position: fixed; inset: 0; z-index: 9999;
                    display: flex; align-items: center; justify-content: center;
                    background: rgba(13, 8, 29, 0.85);
                    backdrop-filter: blur(6px);
                    opacity: 0; transition: opacity 0.3s ease;
                    padding: 1rem;
                }
                .skina-notif-overlay.show { opacity: 1; }
                .skina-notif-card {
                    background: linear-gradient(135deg, #160f2e 0%, #0d081d 100%);
                    border: 1px solid rgba(0, 243, 255, 0.4);
                    border-radius: 1.25rem;
                    max-width: 30rem; width: 100%;
                    padding: 2rem;
                    box-shadow: 0 20px 60px rgba(255, 0, 127, 0.35), 0 0 30px rgba(0, 243, 255, 0.2);
                    transform: translateY(20px) scale(0.98);
                    transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
                    text-align: center;
                    color: #fff;
                    font-family: 'Poppins', sans-serif;
                }
                .skina-notif-overlay.show .skina-notif-card { transform: translateY(0) scale(1); }
                .skina-notif-icon {
                    width: 4rem; height: 4rem; margin: 0 auto 1rem;
                    border-radius: 50%;
                    display: flex; align-items: center; justify-content: center;
                    background: linear-gradient(135deg, #ff007f 0%, #9d00ff 100%);
                    box-shadow: 0 0 25px rgba(255, 0, 127, 0.6);
                }
                .skina-notif-icon.error {
                    background: linear-gradient(135deg, #ff007f 0%, #ff4444 100%);
                }
                .skina-notif-icon svg { width: 2rem; height: 2rem; color: #fff; }
                .skina-notif-title {
                    font-size: 1.5rem; font-weight: 700; margin-bottom: 0.5rem;
                    color: #ff007f;
                }
                .skina-notif-text { color: #d1d5db; margin-bottom: 1.25rem; line-height: 1.5; }
                .skina-notif-summary {
                    background: rgba(13, 8, 29, 0.7);
                    border: 1px solid rgba(0, 243, 255, 0.2);
                    border-radius: 0.75rem; padding: 1rem;
                    text-align: left; margin-bottom: 1.25rem;
                    font-size: 0.875rem; color: #e5e7eb;
                }
                .skina-notif-summary strong { color: #00f3ff; }
                .skina-notif-actions { display: flex; flex-direction: column; gap: 0.75rem; }
                .skina-notif-btn {
                    display: flex; align-items: center; justify-content: center; gap: 0.5rem;
                    padding: 0.85rem 1.25rem; border-radius: 0.6rem;
                    font-weight: 700; font-size: 1rem; cursor: pointer;
                    transition: all 0.25s ease; border: none; text-decoration: none;
                }
                .skina-notif-btn-whatsapp {
                    background: linear-gradient(135deg, #25d366 0%, #128c7e 100%);
                    color: #fff;
                }
                .skina-notif-btn-whatsapp:hover { transform: scale(1.03); box-shadow: 0 8px 24px rgba(37, 211, 102, 0.5); }
                .skina-notif-btn-email {
                    background: transparent; color: #00f3ff;
                    border: 1.5px solid rgba(0, 243, 255, 0.5);
                }
                .skina-notif-btn-email:hover { background: rgba(0, 243, 255, 0.12); border-color: #00f3ff; }
                .skina-notif-close {
                    background: transparent; color: #9ca3af; border: none; cursor: pointer;
                    font-size: 0.875rem; margin-top: 0.5rem; transition: color 0.2s ease;
                }
                .skina-notif-close:hover { color: #fff; }
                .skina-toast {
                    position: fixed; top: 5rem; left: 50%; transform: translateX(-50%) translateY(-20px);
                    z-index: 10000; opacity: 0; transition: all 0.3s ease;
                    background: linear-gradient(135deg, #160f2e 0%, #0d081d 100%);
                    border: 1px solid rgba(255, 0, 127, 0.5);
                    border-radius: 0.75rem; padding: 0.85rem 1.5rem;
                    color: #fff; font-family: 'Poppins', sans-serif; font-size: 0.95rem;
                    box-shadow: 0 10px 30px rgba(255, 0, 127, 0.4);
                    display: flex; align-items: center; gap: 0.5rem;
                }
                .skina-toast.show { opacity: 1; transform: translateX(-50%) translateY(0); }
                .skina-toast.error { border-color: rgba(255, 0, 127, 0.7); }
            `;
            document.head.appendChild(style);
        }

        function showNotification(opts) {
            ensureNotificationStyles();
            removeExistingOverlay();

            const isError = opts.type === 'error';
            const overlay = document.createElement('div');
            overlay.className = 'skina-notif-overlay';

            const iconSvg = isError
                ? '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>'
                : '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>';

            overlay.innerHTML = `
                <div class="skina-notif-card">
                    <div class="skina-notif-icon ${isError ? 'error' : ''}">${iconSvg}</div>
                    <div class="skina-notif-title">${escapeHtml(opts.title || '¡Listo!')}</div>
                    <div class="skina-notif-text">${escapeHtml(opts.message || '')}</div>
                    <button class="skina-notif-close">Cerrar</button>
                </div>
            `;
            document.body.appendChild(overlay);
            requestAnimationFrame(function () { overlay.classList.add('show'); });

            overlay.querySelector('.skina-notif-close').addEventListener('click', function () { closeOverlay(overlay); });
            overlay.addEventListener('click', function (e) { if (e.target === overlay) closeOverlay(overlay); });
        }

        function showSuccessNotification(whatsappUrl, mailtoUrl, data) {
            ensureNotificationStyles();
            removeExistingOverlay();

            const overlay = document.createElement('div');
            overlay.className = 'skina-notif-overlay';

            overlay.innerHTML = `
                <div class="skina-notif-card">
                    <div class="skina-notif-icon">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                        </svg>
                    </div>
                    <div class="skina-notif-title">¡Mensaje enviado!</div>
                    <div class="skina-notif-text">
                        Gracias <strong style="color:#00f3ff">${escapeHtml(data.nombre)}</strong>, hemos preparado tu mensaje.
                        Elige cómo quieres enviarlo:
                    </div>
                    <div class="skina-notif-summary">
                        <div><strong>Nombre:</strong> ${escapeHtml(data.nombre)}</div>
                        <div><strong>Correo:</strong> ${escapeHtml(data.email)}</div>
                        <div><strong>Teléfono:</strong> ${escapeHtml(data.telefono)}</div>
                        <div><strong>Fecha:</strong> ${escapeHtml(formatDateDisplay(data.fecha))}</div>
                        <div><strong>Mensaje:</strong> ${escapeHtml(data.mensaje)}</div>
                    </div>
                    <div class="skina-notif-actions">
                        <a href="${whatsappUrl}" target="_blank" rel="noopener" class="skina-notif-btn skina-notif-btn-whatsapp">
                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" style="width:1.25rem;height:1.25rem">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                            </svg>
                            Enviar por WhatsApp
                        </a>
                        <a href="${mailtoUrl}" class="skina-notif-btn skina-notif-btn-email">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style="width:1.25rem;height:1.25rem">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                            </svg>
                            Enviar por Correo
                        </a>
                        <button class="skina-notif-close">Cerrar</button>
                    </div>
                </div>
            `;

            document.body.appendChild(overlay);
            requestAnimationFrame(function () { overlay.classList.add('show'); });

            overlay.querySelector('.skina-notif-close').addEventListener('click', function () { closeOverlay(overlay); });
            overlay.addEventListener('click', function (e) { if (e.target === overlay) closeOverlay(overlay); });

            // Also show a small toast confirming preparation
            showToast('¡Mensaje preparado! Elige un método de envío.');
        }

        function showToast(text, isError) {
            const existing = document.querySelector('.skina-toast');
            if (existing) existing.remove();

            const toast = document.createElement('div');
            toast.className = 'skina-toast' + (isError ? ' error' : '');
            toast.innerHTML = `
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style="width:1.25rem;height:1.25rem;color:${isError ? '#ff007f' : '#00f3ff'}">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${isError ? 'M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' : 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'}"/>
                </svg>
                <span>${escapeHtml(text)}</span>
            `;
            document.body.appendChild(toast);
            requestAnimationFrame(function () { toast.classList.add('show'); });
            setTimeout(function () {
                toast.classList.remove('show');
                setTimeout(function () { toast.remove(); }, 300);
            }, 3500);
        }

        function closeOverlay(overlay) {
            overlay.classList.remove('show');
            setTimeout(function () { overlay.remove(); }, 300);
        }

        function removeExistingOverlay() {
            const existing = document.querySelector('.skina-notif-overlay');
            if (existing) existing.remove();
        }

        function escapeHtml(str) {
            const div = document.createElement('div');
            div.textContent = str == null ? '' : String(str);
            return div.innerHTML;
        }
    });
})();
