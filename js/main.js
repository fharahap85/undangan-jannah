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

    // 8. Share Logic
    const btnShareWA = document.getElementById('btn-share-wa');
    const btnShareTG = document.getElementById('btn-share-tg');
    const btnShareNative = document.getElementById('btn-share-native');

    const shareTitle = appData.general.title;
    const shareText = `Assalamu'alaikum, kami mengundang Anda untuk hadir di acara pernikahan ${appData.opening.groom_nickname} & ${appData.opening.bride_nickname}. Info lengkap silakan buka:`;
    const shareUrl = window.location.href.split('?')[0]; // Clean URL

    if (btnShareWA) {
        btnShareWA.addEventListener('click', () => {
            window.open(`https://wa.me/?text=${encodeURIComponent(shareText + '\n' + shareUrl)}`, '_blank');
        });
    }

    if (btnShareTG) {
        btnShareTG.addEventListener('click', () => {
            window.open(`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`, '_blank');
        });
    }

    if (btnShareNative) {
        btnShareNative.addEventListener('click', async () => {
            if (navigator.share) {
                try {
                    await navigator.share({
                        title: shareTitle,
                        text: shareText,
                        url: shareUrl
                    });
                } catch (err) {
                    console.log('Error sharing:', err);
                }
            } else {
                // Fallback: Copy to clipboard
                navigator.clipboard.writeText(`${shareText}\n${shareUrl}`).then(() => {
                    alert('Link berhasil disalin ke clipboard!');
                });
            }
        });
    }

    // 9. Countdown Timer Logic
    const startCountdown = (dateStr) => {
        // Extract date components from "Kamis, 14 Mei 2026" or similar
        // For simplicity, let's target May 14, 2026
        const targetDate = new Date("May 14, 2026 08:00:00").getTime();

        const updateTimer = () => {
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance < 0) {
                document.getElementById('countdown').innerHTML = "<h3>Acara Sedang Berlangsung / Sudah Selesai</h3>";
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById('days').innerText = days.toString().padStart(2, '0');
            document.getElementById('hours').innerText = hours.toString().padStart(2, '0');
            document.getElementById('minutes').innerText = minutes.toString().padStart(2, '0');
            document.getElementById('seconds').innerText = seconds.toString().padStart(2, '0');
        };

        setInterval(updateTimer, 1000);
        updateTimer();
    };

    startCountdown(appData.opening.date_highlight);

    // 10. Background Particles (Gold Dust)
    const createParticles = () => {
        const container = document.getElementById('particles-bg');
        if (!container) return;

        const particleCount = 30;
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'dust-particle';
            
            // Randomize position and animation
            const size = Math.random() * 4 + 2;
            const left = Math.random() * 100;
            const duration = Math.random() * 10 + 10;
            const delay = Math.random() * 5;
            
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${left}%`;
            particle.style.animationDuration = `${duration}s`;
            particle.style.animationDelay = `${delay}s`;
            
            container.appendChild(particle);
        }
    };

    createParticles();
});
