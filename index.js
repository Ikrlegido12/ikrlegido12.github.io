const initPortfolio = () => {
    const themeToggle = document.querySelector('.theme-toggle');
    const savedTheme = localStorage.getItem('portfolioTheme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = savedTheme || (prefersDark ? 'dark' : 'light');

    const applyTheme = mode => {
        document.body.classList.toggle('dark-mode', mode === 'dark');
        if (themeToggle) {
            themeToggle.textContent = mode === 'dark' ? '☀️' : '🌙';
            themeToggle.setAttribute('aria-label', mode === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro');
        }
    };

    applyTheme(theme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const nextTheme = document.body.classList.contains('dark-mode') ? 'light' : 'dark';
            applyTheme(nextTheme);
            localStorage.setItem('portfolioTheme', nextTheme);
        });
    }

    const addSharedFooter = () => {
        if (document.querySelector('footer')) return;

        const footer = document.createElement('footer');
        footer.innerHTML = `
            <p>© 2026 Ikrlegido12 | Programador Junior</p>
            <div class="footer-links">
                <a href="/pages/enlaces.html">Enlaces</a>
                <a href="/pages/contacto.html">Contacto</a>
                <a href="/pages/sobremi.html">Sobre mí</a>
                <a href="https://github.com/Ikrlegido12" target="_blank" rel="noopener noreferrer">GitHub</a>
            </div>
        `;

        document.body.appendChild(footer);
    };

    addSharedFooter();

    document.querySelectorAll('[data-modal-target]').forEach(button => {
        button.addEventListener('click', () => {
            const modal = document.getElementById(button.dataset.modalTarget);
            if (modal) modal.classList.add('active');
        });
    });

    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', event => {
            if (event.target === overlay) overlay.classList.remove('active');
        });

        const closeBtn = overlay.querySelector('.close-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                overlay.classList.remove('active');
            });
        }
    });

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape') {
            document.querySelectorAll('.modal-overlay.active').forEach(activeOverlay => {
                activeOverlay.classList.remove('active');
            });
        }
    });
};

document.addEventListener('DOMContentLoaded', initPortfolio);