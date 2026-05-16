/* Buck v. Bell — Interactive enhancements */

(function () {
    'use strict';

    /* -------------------------------------------------------
       2. BACKGROUND TINT ON IMAGE HOVER
       Maps image filenames to warm/cool tone tints.
    ------------------------------------------------------- */
    const tintMap = {
        'image.png':  'rgba(120, 60, 20,  0.12)',
        '1.png':      'rgba(80,  50, 30,  0.10)',
        'table.png':  'rgba(30,  50, 80,  0.10)',
        '2.png':      'rgba(100, 70, 40,  0.11)',
        '3.png':      'rgba(40,  60, 40,  0.10)',
        '4.png':      'rgba(80,  40, 20,  0.12)',
        '5.png':      'rgba(60,  30, 30,  0.12)',
        '6.png':      'rgba(30,  40, 70,  0.10)',
        '7.png':      'rgba(70,  50, 20,  0.11)',
        'map.png':    'rgba(20,  60, 50,  0.10)',
        'unk.png':    'rgba(30,  30, 30,  0.14)',
    };

    function getTint(src) {
        const filename = src.split('/').pop().split('\\').pop();
        return tintMap[filename] || 'rgba(80, 50, 20, 0.10)';
    }

    document.querySelectorAll('img').forEach((img) => {
        img.addEventListener('mouseenter', () => {
            document.documentElement.style.setProperty('--bg-tint', getTint(img.src));
        });
        img.addEventListener('mouseleave', () => {
            document.documentElement.style.setProperty('--bg-tint', 'transparent');
        });
    });

    /* -------------------------------------------------------
       3. LIGHTBOX
    ------------------------------------------------------- */
    function openLightbox(imgEl) {
        const overlay = document.createElement('div');
        overlay.className = 'lightbox-overlay';

        const closeBtn = document.createElement('span');
        closeBtn.className = 'lightbox-close';
        closeBtn.textContent = '×';
        closeBtn.setAttribute('aria-label', 'Close lightbox');

        const clone = document.createElement('img');
        clone.src = imgEl.src;
        clone.alt = imgEl.alt;

        overlay.appendChild(closeBtn);
        overlay.appendChild(clone);

        // Optional caption from nearest figcaption
        const fig = imgEl.closest('figure');
        if (fig) {
            const cap = fig.querySelector('figcaption');
            if (cap) {
                const capEl = document.createElement('div');
                capEl.className = 'lightbox-caption';
                capEl.textContent = cap.textContent;
                overlay.appendChild(capEl);
            }
        }

        document.body.appendChild(overlay);
        document.body.style.overflow = 'hidden';

        function close() {
            overlay.style.animation = 'lightboxFadeIn 0.2s ease reverse';
            setTimeout(() => {
                overlay.remove();
                document.body.style.overflow = '';
            }, 180);
        }

        overlay.addEventListener('click', (e) => {
            if (e.target === overlay || e.target === closeBtn) close();
        });

        document.addEventListener('keydown', function handler(e) {
            if (e.key === 'Escape') {
                close();
                document.removeEventListener('keydown', handler);
            }
        });
    }

    document.querySelectorAll('img').forEach((img) => {
        // Skip the logo
        if (img.classList.contains('site-logo')) return;
        img.addEventListener('click', () => openLightbox(img));
    });

    /* -------------------------------------------------------
       4. PARALLAX HEADER
    ------------------------------------------------------- */
    const header = document.querySelector('.site-header');
    if (header) {
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const scrollY = window.scrollY;
                    header.style.backgroundPositionY = `${scrollY * 0.35}px`;
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

})();
