// Theme toggle: light/dark mode for La Skina website
// Self-contained — injects its own CSS and floating button. No HTML changes required.

(function () {
    'use strict';

    const STORAGE_KEY = 'skina-theme';
    const DARK = 'dark-mode';
    const LIGHT = 'light-mode';

    /* ------------------------------------------------------------------ */
    /* 1. Injected CSS: button styling + light-mode overrides             */
    /* ------------------------------------------------------------------ */
    const style = document.createElement('style');
    style.id = 'theme-toggle-styles';
    style.textContent = `
        /* ---- Smooth global transition for theme switch ---- */
        body,
        body * {
            transition: background-color 0.45s ease, border-color 0.45s ease,
                        color 0.45s ease, fill 0.45s ease 0.05s;
        }

        /* ---- Floating toggle button ---- */
        #theme-toggle-btn {
            position: fixed;
            top: 18px;
            right: 18px;
            z-index: 9999;
            width: 52px;
            height: 52px;
            border-radius: 50%;
            border: 1px solid rgba(255, 215, 0, 0.45);
            background: rgba(22, 15, 46, 0.55);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0;
            color: #ffd700;
            box-shadow: 0 0 18px rgba(255, 0, 127, 0.35),
                        0 4px 14px rgba(0, 0, 0, 0.4);
            transition: transform 0.3s ease, box-shadow 0.3s ease,
                        background-color 0.45s ease, border-color 0.45s ease,
                        color 0.45s ease;
        }
        #theme-toggle-btn:hover {
            transform: scale(1.1) rotate(12deg);
            box-shadow: 0 0 26px rgba(0, 243, 255, 0.55),
                        0 4px 18px rgba(0, 0, 0, 0.5);
        }
        #theme-toggle-btn:active {
            transform: scale(0.94);
        }
        #theme-toggle-btn svg {
            width: 26px;
            height: 26px;
            display: block;
        }
        /* Light-mode look for the button itself */
        body.light-mode #theme-toggle-btn {
            background: rgba(255, 255, 255, 0.7);
            border-color: rgba(255, 0, 127, 0.4);
            color: #ff007f;
            box-shadow: 0 0 18px rgba(157, 0, 255, 0.25),
                        0 4px 14px rgba(0, 0, 0, 0.15);
        }

        /* ---- Light-mode color overrides ----
           Tailwind arbitrary-value classes are targeted with escaped
           selectors. The body.light-mode prefix raises specificity so
           these win over the generated utilities. Accent colors
           (gold / neon pink / cyan / purple) are preserved.            */

        body.light-mode {
            background-color: #f5f5f5 !important;
            color: #333333;
        }

        /* Backgrounds that were the very-dark-purple */
        body.light-mode .bg-\\[\\#0d081d\\],
        body.light-mode .bg-\\[\\#0d081d\\]\\/95,
        body.light-mode .bg-\\[\\#0d081d\\]\\/90 {
            background-color: #f5f5f5 !important;
        }

        /* Backgrounds that were the dark-purple cards */
        body.light-mode .bg-\\[\\#160f2e\\] {
            background-color: #ffffff !important;
        }

        /* Gradient hero / card backgrounds built from the dark purples */
        body.light-mode .gradient-hero {
            background: linear-gradient(135deg, #ffffff 0%, #ececec 50%, #dcdcdc 100%) !important;
        }
        body.light-mode .bg-gradient-to-br {
            background-image: none !important;
            background-color: #ffffff !important;
        }

        /* Text color: white -> dark grey */
        body.light-mode .text-white {
            color: #333333 !important;
        }

        /* Inputs: dark field backgrounds -> light fields */
        body.light-mode input,
        body.light-mode textarea,
        body.light-mode select {
            background-color: #f0f0f0 !important;
            color: #333333 !important;
        }
        body.light-mode input::placeholder,
        body.light-mode textarea::placeholder {
            color: #888888 !important;
        }

        /* Borders that referenced the dark palette stay subtle on light */
        body.light-mode .border-\\[\\#ff007f\\]\\/20,
        body.light-mode .border-\\[\\#ff007f\\]\\/30,
        body.light-mode .border-\\[\\#00f3ff\\]\\/20,
        body.light-mode .border-\\[\\#00f3ff\\]\\/30,
        body.light-mode .border-\\[\\#9d00ff\\]\\/20 {
            border-color: rgba(157, 0, 255, 0.25) !important;
        }

        /* Keep accent text readable on light backgrounds */
        body.light-mode .text-\\[\\#00f3ff\\] {
            color: #0099b3 !important;
        }
        body.light-mode .text-\\[\\#ff007f\\] {
            color: #ff007f !important;
        }
        body.light-mode .hover\\:text-\\[\\#0d081d\\]:hover {
            color: #ffffff !important;
        }

        /* Respect users who prefer reduced motion */
        @media (prefers-reduced-motion: reduce) {
            body, body * {
                transition: none !important;
            }
        }
    `;
    document.head.appendChild(style);

    /* ------------------------------------------------------------------ */
    /* 2. SVG icons                                                       */
    /* ------------------------------------------------------------------ */
    const MOON_SVG = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
             stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
             aria-hidden="true">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>`;

    const SUN_SVG = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
             stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
             aria-hidden="true">
            <circle cx="12" cy="12" r="5"/>
            <line x1="12" y1="1" x2="12" y2="3"/>
            <line x1="12" y1="21" x2="12" y2="23"/>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
            <line x1="1" y1="12" x2="3" y2="12"/>
            <line x1="21" y1="12" x2="23" y2="12"/>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
        </svg>`;

    /* ------------------------------------------------------------------ */
    /* 3. Button creation                                                 */
    /* ------------------------------------------------------------------ */
    const btn = document.createElement('button');
    btn.id = 'theme-toggle-btn';
    btn.type = 'button';
    btn.setAttribute('aria-label', 'Cambiar entre modo claro y oscuro');
    btn.title = 'Cambiar tema';

    /* ------------------------------------------------------------------ */
    /* 4. State helpers                                                   */
    /* ------------------------------------------------------------------ */
    function getStoredTheme() {
        try {
            return localStorage.getItem(STORAGE_KEY);
        } catch (e) {
            return null;
        }
    }

    function setStoredTheme(theme) {
        try {
            localStorage.setItem(STORAGE_KEY, theme);
        } catch (e) {
            /* localStorage may be unavailable (private mode) — ignore */
        }
    }

    function applyTheme(theme) {
        const isLight = theme === LIGHT;
        document.body.classList.remove(LIGHT, DARK);
        document.body.classList.add(isLight ? LIGHT : DARK);
        btn.innerHTML = isLight ? MOON_SVG : SUN_SVG;
        btn.setAttribute('aria-pressed', String(isLight));
    }

    function toggleTheme() {
        const isLight = document.body.classList.contains(LIGHT);
        const next = isLight ? DARK : LIGHT;
        applyTheme(next);
        setStoredTheme(next);
    }

    /* ------------------------------------------------------------------ */
    /* 5. Init                                                            */
    /* ------------------------------------------------------------------ */
    function init() {
        document.body.appendChild(btn);
        btn.addEventListener('click', toggleTheme);

        // Saved preference wins; otherwise default to the site's dark theme.
        const saved = getStoredTheme();
        applyTheme(saved === LIGHT || saved === DARK ? saved : DARK);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
