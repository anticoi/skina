/**
 * enhancements.js
 * Visual enhancements for La Skina website:
 *   1. Entrance fade-in animations on scroll (IntersectionObserver)
 *   2. WhatsApp floating button (bottom-right, pulsing)
 *   3. Testimonials section ("Lo que dicen nuestros clientes")
 *   4. Musician profiles section ("Conoce a los Músicos")
 *
 * Color scheme:
 *   #0d081d (deep dark), #160f2e (card dark),
 *   #ffd700 (gold), #ff007f (neon pink), #00f3ff (neon cyan)
 *
 * NOTE: This file is self-contained. It injects its own CSS and
 * dynamically builds/inserts the new sections without modifying index.html.
 */

(function () {
    'use strict';

    /* ============================================================
       1. INJECTED STYLES
       ============================================================ */
    const styleEl = document.createElement('style');
    styleEl.id = 'enhancements-styles';
    styleEl.textContent = `
        /* ---- Fade-in on scroll ---- */
        .fade-in {
            opacity: 0;
            transform: translateY(30px);
        }
        .fade-in.visible {
            opacity: 1;
            transform: translateY(0);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }

        /* ---- WhatsApp floating button ---- */
        .whatsapp-fab {
            position: fixed;
            bottom: 24px;
            right: 24px;
            width: 60px;
            height: 60px;
            background-color: #25d366;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
            z-index: 9999;
            cursor: pointer;
            text-decoration: none;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .whatsapp-fab:hover {
            transform: scale(1.1);
            box-shadow: 0 8px 28px rgba(37, 211, 102, 0.6);
        }
        .whatsapp-fab svg {
            width: 32px;
            height: 32px;
            fill: #ffffff;
        }
        .whatsapp-fab::after {
            content: "Escríbenos por WhatsApp";
            position: absolute;
            right: 72px;
            top: 50%;
            transform: translateY(-50%);
            background-color: #160f2e;
            color: #ffd700;
            padding: 8px 14px;
            border-radius: 8px;
            font-size: 13px;
            font-family: sans-serif;
            white-space: nowrap;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s ease;
            border: 1px solid rgba(255, 215, 0, 0.3);
        }
        .whatsapp-fab:hover::after {
            opacity: 1;
        }
        @keyframes whatsapp-pulse {
            0%   { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.7); }
            70%  { box-shadow: 0 0 0 18px rgba(37, 211, 102, 0); }
            100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0); }
        }
        .whatsapp-fab {
            animation: whatsapp-pulse 2s infinite;
        }

        /* ---- Testimonials section ---- */
        #testimonios {
            background-color: #0d081d;
        }
        .testimonials-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 24px;
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 16px;
        }
        .testimonial-card {
            background-color: #160f2e;
            border: 1px solid rgba(255, 215, 0, 0.15);
            border-radius: 16px;
            padding: 28px;
            transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
        }
        .testimonial-card:hover {
            transform: translateY(-6px);
            border-color: rgba(255, 0, 127, 0.5);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        }
        .testimonial-stars {
            color: #ffd700;
            font-size: 18px;
            letter-spacing: 2px;
            margin-bottom: 14px;
        }
        .testimonial-text {
            color: #d1d5db;
            font-style: italic;
            font-size: 15px;
            line-height: 1.7;
            margin-bottom: 18px;
        }
        .testimonial-author {
            color: #ffd700;
            font-weight: 600;
            font-size: 14px;
        }
        .testimonial-role {
            color: #00f3ff;
            font-size: 12px;
            margin-top: 2px;
        }
        .enhancements-section-title {
            text-align: center;
            margin-bottom: 48px;
        }
        .enhancements-section-title h2 {
            font-size: 2.5rem;
            font-weight: 700;
            color: #ffd700;
            margin: 0 0 12px;
        }
        .enhancements-section-title p {
            color: #9ca3af;
            font-size: 1.1rem;
            margin: 0;
        }

        /* ---- Musicians section ---- */
        #musicos {
            background-color: #160f2e;
        }
        .musicians-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
            gap: 28px;
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 16px;
        }
        .musician-card {
            background-color: #0d081d;
            border: 1px solid rgba(0, 243, 255, 0.2);
            border-radius: 16px;
            padding: 28px 20px;
            text-align: center;
            transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
        }
        .musician-card:hover {
            transform: translateY(-6px);
            border-color: rgba(255, 215, 0, 0.5);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        }
        .musician-photo {
            width: 130px;
            height: 130px;
            border-radius: 50%;
            object-fit: cover;
            margin: 0 auto 18px;
            border: 3px solid #ffd700;
            display: block;
            background-color: #160f2e;
        }
        .musician-name {
            color: #ffd700;
            font-size: 1.3rem;
            font-weight: 700;
            margin: 0 0 4px;
        }
        .musician-instrument {
            color: #ff007f;
            font-size: 0.95rem;
            font-weight: 600;
            margin: 0 0 10px;
        }
        .musician-desc {
            color: #9ca3af;
            font-size: 0.85rem;
            line-height: 1.5;
            margin: 0;
        }

        /* ---- Responsive tweaks ---- */
        @media (max-width: 640px) {
            .whatsapp-fab {
                width: 52px;
                height: 52px;
                bottom: 18px;
                right: 18px;
            }
            .whatsapp-fab svg {
                width: 28px;
                height: 28px;
            }
            .enhancements-section-title h2 {
                font-size: 2rem;
            }
        }
    `;
    document.head.appendChild(styleEl);

    /* ============================================================
       2. WHATSAPP FLOATING BUTTON
       ============================================================ */
    function createWhatsAppButton() {
        const link = document.createElement('a');
        link.className = 'whatsapp-fab';
        link.href = 'https://wa.me/56990165899?text=Hola%2C%20vengo%20del%20sitio%20web%20de%20La%20Skina';
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.setAttribute('aria-label', 'Escríbenos por WhatsApp');
        link.innerHTML = `
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
        `;
        document.body.appendChild(link);
    }

    /* ============================================================
       3. TESTIMONIALS SECTION
       ============================================================ */
    const TESTIMONIALS = [
        {
            text: 'La Skina hizo de nuestro matrimonio una fiesta inolvidable. ¡Todos bailaron toda la noche!',
            author: 'María y Carlos',
            role: 'Matrimonio'
        },
        {
            text: 'Increíble energía y profesionalismo. Los contratamos para nuestro evento corporativo y superaron las expectativas.',
            author: 'Roberto',
            role: 'Evento Corporativo'
        },
        {
            text: 'La mejor banda que hemos tenido en nuestro pub. El público quedó encantado con la música ochentera.',
            author: 'Felipe',
            role: 'Bar Manager'
        },
        {
            text: 'Contratamos a La Skina para el cumpleaños de mi mamá y fue mágico. Llevaron la fiesta a otro nivel.',
            author: 'Camila',
            role: 'Cumpleaños'
        },
        {
            text: 'Músicos de verdad, con trayectoria. Se nota la diferencia. Los recomiendo 100%.',
            author: 'Jorge',
            role: 'Aniversario'
        },
        {
            text: 'Tocaron todos los clásicos que queríamos. La pasamos increíble, ya los queremos reservar de nuevo.',
            author: 'Daniela',
            role: 'Fiesta Privada'
        }
    ];

    function createTestimonialsSection() {
        const section = document.createElement('section');
        section.id = 'testimonios';
        section.className = 'py-20 fade-in';

        const header = document.createElement('div');
        header.className = 'enhancements-section-title';
        header.innerHTML = `
            <h2>Lo que dicen nuestros clientes</h2>
            <p>La confianza y alegría de quienes ya vivieron la experiencia La Skina</p>
        `;
        section.appendChild(header);

        const grid = document.createElement('div');
        grid.className = 'testimonials-grid';

        TESTIMONIALS.forEach(function (t) {
            const card = document.createElement('div');
            card.className = 'testimonial-card fade-in';
            card.innerHTML = `
                <div class="testimonial-stars" aria-label="5 de 5 estrellas">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                <p class="testimonial-text">&ldquo;${t.text}&rdquo;</p>
                <div class="testimonial-author">${t.author}</div>
                <div class="testimonial-role">${t.role}</div>
            `;
            grid.appendChild(card);
        });

        section.appendChild(grid);
        return section;
    }

    /* ============================================================
       4. MUSICIAN PROFILES SECTION
       ============================================================ */
    const MUSICIANS = [
        { img: 'images/victorbateria.jpg',   name: 'El Jefe',       instrument: 'Batería' },
        { img: 'images/Rodolfo_guitarra.jpg', name: 'El Maestro',    instrument: 'Guitarra' },
        { img: 'images/German_cantante.jpg',  name: 'La Voz',        instrument: 'Voz Principal' },
        { img: 'images/Fernando_bajo.jpg',    name: 'El Bajista',    instrument: 'Bajo' },
        { img: 'images/Jorge_teclados.jpg',   name: 'El Tecladista', instrument: 'Teclados' },
        { img: 'images/Lolo_saxofon.jpg',     name: 'Lolo',          instrument: 'Saxofón' }
    ];

    function createMusiciansSection() {
        const section = document.createElement('section');
        section.id = 'musicos';
        section.className = 'py-20 fade-in';

        const header = document.createElement('div');
        header.className = 'enhancements-section-title';
        header.innerHTML = `
            <h2>Conoce a los Músicos</h2>
            <p>El talento y la experiencia detrás de cada presentación</p>
        `;
        section.appendChild(header);

        const grid = document.createElement('div');
        grid.className = 'musicians-grid';

        MUSICIANS.forEach(function (m) {
            const card = document.createElement('div');
            card.className = 'musician-card fade-in';
            card.innerHTML = `
                <img class="musician-photo" src="${m.img}" alt="${m.name} - ${m.instrument}"
                     onerror="this.style.visibility='hidden';">
                <h3 class="musician-name">${m.name}</h3>
                <p class="musician-instrument">${m.instrument}</p>
                <p class="musician-desc">Más de 20 años de trayectoria musical</p>
            `;
            grid.appendChild(card);
        });

        section.appendChild(grid);
        return section;
    }

    /* ============================================================
       5. SECTION INSERTION + INTERSECTION OBSERVER
       ============================================================ */
    function insertSections() {
        // Musicians section -> after #nosotros
        const nosotros = document.getElementById('nosotros');
        if (nosotros && !document.getElementById('musicos')) {
            nosotros.insertAdjacentElement('afterend', createMusiciansSection());
        }

        // Testimonials section -> before #contacto (FAQ/contact section)
        const contacto = document.getElementById('contacto');
        if (contacto && !document.getElementById('testimonios')) {
            contacto.insertAdjacentElement('beforebegin', createTestimonialsSection());
        }
    }

    function setupFadeInObserver() {
        // Apply .fade-in to all sections, cards, and images (excluding ones we
        // explicitly tagged above, which already have the class).
        const selectors = ['section', '.card', '.testimonial-card', '.musician-card', 'img'];
        const candidates = document.querySelectorAll(selectors.join(', '));

        candidates.forEach(function (el) {
            // Avoid double-tagging elements that already have fade-in.
            if (!el.classList.contains('fade-in')) {
                el.classList.add('fade-in');
            }
        });

        if (!('IntersectionObserver' in window)) {
            // Fallback: just reveal everything.
            document.querySelectorAll('.fade-in').forEach(function (el) {
                el.classList.add('visible');
            });
            return;
        }

        const observer = new IntersectionObserver(function (entries, obs) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    obs.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: '0px 0px -40px 0px'
        });

        document.querySelectorAll('.fade-in').forEach(function (el) {
            observer.observe(el);
        });
    }

    /* ============================================================
       INIT
       ============================================================ */
    function init() {
        createWhatsAppButton();
        insertSections();
        // Defer observer setup until next frame so newly inserted nodes are
        // present in the DOM and get observed.
        requestAnimationFrame(function () {
            setupFadeInObserver();
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
