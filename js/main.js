/**
 * Main App Module
 * Controls UI logic, animations, audio, and navigation
 */

document.addEventListener('DOMContentLoaded', async () => {
    // 1. Initialize Data
    const appData = await DataLoader.init();
    if (!appData) return;

    // 2. Initialize RSVP
    RSVP.init(appData);

    // 3. Guest Name Detection from URL (?to=Nama+Tamu)
    const urlParams = new URLSearchParams(window.location.search);
    const guestName = urlParams.get('to');
    if (guestName) {
        document.getElementById('guest-name').textContent = guestName;
    }

    // 4. Opening Button Logic
    const btnOpen = document.getElementById('btn-open-invitation');
    const openingSection = document.getElementById('opening');
    const mainContent = document.getElementById('main-content');
    const floatingMenu = document.getElementById('floating-menu');
    const bgAudio = document.getElementById('bg-audio');
    const btnAudio = document.getElementById('btn-audio');

    btnOpen.addEventListener('click', () => {
        // Play Audio
        bgAudio.play().catch(e => console.log("Audio autoplay prevented"));
        btnAudio.classList.add('rotating');

        // Reveal Content
        openingSection.classList.add('fade-out');
        setTimeout(() => {
            openingSection.style.display = 'none';
            mainContent.classList.remove('hidden');
            floatingMenu.classList.remove('hidden');
            
            // Re-trigger observer for first visible elements
            triggerScrollReveal();
        }, 1000);
    });

    // 5. Audio Toggle
    btnAudio.addEventListener('click', () => {
        if (bgAudio.paused) {
            bgAudio.play();
            btnAudio.classList.add('rotating');
        } else {
            bgAudio.pause();
            btnAudio.classList.remove('rotating');
        }
    });

    // 6. Scroll Reveal Observer
    const triggerScrollReveal = () => {
        const reveals = document.querySelectorAll('.reveal');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                }
            });
        }, { threshold: 0.1 });

        reveals.forEach(reveal => observer.observe(reveal));
    };

    // 7. Floating Menu Active State & Smooth Scroll
    const sections = document.querySelectorAll('section');
    const menuItems = document.querySelectorAll('.menu-item');

    window.addEventListener('scroll', () => {
        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        menuItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').includes(current)) {
                item.classList.add('active');
            }
        });
    });
});
