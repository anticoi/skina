// FAQ SECTION - Preguntas Frecuentes
// Renders an accordion-style FAQ section and inserts it before the contact section.
// Questions and answers are defined below for easy editing.

const faqData = [
    {
        question: '¿Hasta qué hora tocan?',
        answer: 'Nuestros shows tienen una duración estándar de 2 a 3 horas, pero podemos adaptarnos a las necesidades de tu evento. Consulta por horarios extendidos.'
    },
    {
        question: '¿Llevan su propio equipo de sonido?',
        answer: 'Sí, contamos con nuestro propio equipo de sonido profesional. Solo necesitamos que el espacio cuente con energía eléctrica disponible.'
    },
    {
        question: '¿Tocan fuera de Santiago?',
        answer: 'Sí, tocamos en todo Chile. Para eventos fuera de Santiago, se considera un cargo adicional por traslado.'
    },
    {
        question: '¿Con cuánta anticipación debo reservar?',
        answer: 'Recomendamos reservar con al menos 2 semanas de anticipación para asegurar la disponibilidad de la fecha.'
    },
    {
        question: '¿Tocan en pubs y bares?',
        answer: 'Sí, animamos pubs y bares con nuestro repertorio. Contáctanos para conversar sobre las condiciones.'
    },
    {
        question: '¿Puedo pedir canciones específicas?',
        answer: 'Por supuesto! Si hay una canción especial que no está en nuestro repertorio, podemos aprenderla con anticipación. Escríbenos por WhatsApp.'
    },
    {
        question: '¿Qué tipo de eventos tocan?',
        answer: 'Tocamos en cumpleaños, bodas, aniversarios, eventos corporativos, pubs, bares y todo tipo de celebraciones.'
    },
    {
        question: '¿Tienen videos de presentaciones anteriores?',
        answer: 'Sí, puedes ver nuestros videos en la sección "Videos" del sitio. También puedes seguirnos en Instagram y Facebook.'
    }
];

// Inject styles needed for the accordion animation and layout.
// Using the grid-template-rows 0fr -> 1fr trick for smooth height transitions.
function injectFaqStyles() {
    if (document.getElementById('faq-styles')) return;

    const style = document.createElement('style');
    style.id = 'faq-styles';
    style.textContent = `
        .faq-item {
            background-color: #0d081d;
            border: 1px solid rgba(255, 0, 127, 0.2);
            border-radius: 1rem;
            overflow: hidden;
            transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .faq-item:hover {
            border-color: rgba(255, 0, 127, 0.4);
        }
        .faq-item.is-open {
            border-color: rgba(255, 0, 127, 0.5);
            box-shadow: 0 0 20px rgba(255, 0, 127, 0.1);
        }
        .faq-question {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
            padding: 1.25rem 1.5rem;
            background: transparent;
            border: none;
            cursor: pointer;
            text-align: left;
            color: var(--neon-pink, #ff007f);
            font-size: 1.125rem;
            font-weight: 600;
            line-height: 1.4;
            transition: color 0.3s ease;
        }
        .faq-question:hover {
            color: #ff4ba6;
        }
        .faq-question-text {
            flex: 1;
        }
        .faq-icon {
            flex-shrink: 0;
            width: 28px;
            height: 28px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            background-color: rgba(255, 0, 127, 0.15);
            border: 1px solid rgba(255, 0, 127, 0.35);
            color: var(--neon-pink, #ff007f);
            transition: transform 0.35s ease, background-color 0.3s ease;
            transform: rotate(0deg);
        }
        .faq-item.is-open .faq-icon {
            transform: rotate(135deg);
            background-color: rgba(255, 0, 127, 0.3);
        }
        .faq-icon svg {
            width: 16px;
            height: 16px;
        }
        .faq-answer-wrapper {
            display: grid;
            grid-template-rows: 0fr;
            transition: grid-template-rows 0.35s ease;
        }
        .faq-item.is-open .faq-answer-wrapper {
            grid-template-rows: 1fr;
        }
        .faq-answer-inner {
            overflow: hidden;
        }
        .faq-answer {
            padding: 0 1.5rem 1.25rem 1.5rem;
            color: #9ca3af;
            font-size: 1rem;
            line-height: 1.6;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        .faq-item.is-open .faq-answer {
            opacity: 1;
            transition: opacity 0.3s ease 0.1s;
        }
    `;
    document.head.appendChild(style);
}

// Build the FAQ section element
function buildFaqSection() {
    const section = document.createElement('section');
    section.id = 'faq';
    section.className = 'py-20 bg-[#160f2e]';

    const divider = document.createElement('div');
    divider.className = 'section-divider mb-20';
    section.appendChild(divider);

    const container = document.createElement('div');
    container.className = 'max-w-3xl mx-auto px-4 sm:px-6 lg:px-8';

    const header = document.createElement('div');
    header.className = 'text-center mb-16';
    header.innerHTML = `
        <h2 class="font-display text-4xl md:text-5xl font-bold text-gold mb-4">Preguntas Frecuentes</h2>
        <p class="text-gray-400 text-lg">Resolvemos las dudas más comunes sobre nuestros shows</p>
    `;
    container.appendChild(header);

    const list = document.createElement('div');
    list.className = 'space-y-4';

    faqData.forEach((item, index) => {
        const faqItem = document.createElement('div');
        faqItem.className = 'faq-item';
        faqItem.setAttribute('data-faq-index', index);

        const questionBtn = document.createElement('button');
        questionBtn.className = 'faq-question';
        questionBtn.type = 'button';
        questionBtn.setAttribute('aria-expanded', 'false');
        questionBtn.innerHTML = `
            <span class="faq-question-text">${item.question}</span>
            <span class="faq-icon" aria-hidden="true">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"></path>
                </svg>
            </span>
        `;

        const answerWrapper = document.createElement('div');
        answerWrapper.className = 'faq-answer-wrapper';
        const answerInner = document.createElement('div');
        answerInner.className = 'faq-answer-inner';
        const answer = document.createElement('p');
        answer.className = 'faq-answer';
        answer.textContent = item.answer;
        answerInner.appendChild(answer);
        answerWrapper.appendChild(answerInner);

        faqItem.appendChild(questionBtn);
        faqItem.appendChild(answerWrapper);
        list.appendChild(faqItem);

        // Accordion toggle behavior
        questionBtn.addEventListener('click', () => {
            const isOpen = faqItem.classList.contains('is-open');

            // Close all other items (single-open accordion)
            list.querySelectorAll('.faq-item.is-open').forEach(openItem => {
                if (openItem !== faqItem) {
                    openItem.classList.remove('is-open');
                    openItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
                }
            });

            if (isOpen) {
                faqItem.classList.remove('is-open');
                questionBtn.setAttribute('aria-expanded', 'false');
            } else {
                faqItem.classList.add('is-open');
                questionBtn.setAttribute('aria-expanded', 'true');
            }
        });
    });

    container.appendChild(list);
    section.appendChild(container);

    return section;
}

// Initialize: inject styles, build the section, and insert before #contacto
function initFaq() {
    injectFaqStyles();

    const contactoSection = document.getElementById('contacto');
    if (!contactoSection) {
        console.warn('FAQ: No se encontró la sección #contacto para insertar antes.');
        return;
    }

    const faqSection = buildFaqSection();
    contactoSection.parentNode.insertBefore(faqSection, contactoSection);
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initFaq);
