/**
 * RSVP & Wishes Module
 * Handles form submission, WhatsApp redirection, and loading wishes from Google Sheets
 */

const RSVP = (() => {
    const handleFormSubmit = async (e, googleScriptUrl) => {
        e.preventDefault();
        const btn = e.target.querySelector('button[type="submit"]');
        const originalText = btn.textContent;
        
        const formData = {
            nama: document.getElementById('input-nama').value,
            kehadiran: document.getElementById('input-kehadiran').value,
            ucapan: document.getElementById('input-ucapan').value,
            timestamp: new Date().toISOString()
        };

        btn.disabled = true;
        btn.textContent = 'Mengirim...';

        try {
            // Send to Google Sheets (Apps Script)
            if (googleScriptUrl && !googleScriptUrl.includes('xxxx')) {
                await fetch(googleScriptUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                    body: JSON.stringify(formData)
                });
            }

            // Local success feedback
            alert('Terima kasih atas ucapan dan doanya!');
            e.target.reset();
            loadWishes(googleScriptUrl); // Refresh list
        } catch (error) {
            console.error('RSVP Error:', error);
            alert('Maaf, terjadi kesalahan. Silakan coba lagi.');
        } finally {
            btn.disabled = false;
            btn.textContent = originalText;
        }
    };

    const handleWhatsAppRSVP = (phone) => {
        const nama = document.getElementById('input-nama').value || '[Nama]';
        const kehadiran = document.getElementById('input-kehadiran').value || '[Kehadiran]';
        const ucapan = document.getElementById('input-ucapan').value || '';

        const text = `Assalamu'alaikum, saya *${nama}* ingin mengonfirmasi *${kehadiran}* pada acara pernikahan Abi & Jannah. \n\nUcapan: ${ucapan}`;
        const encodedText = encodeURIComponent(text);
        window.open(`https://wa.me/${phone}?text=${encodedText}`, '_blank');
    };

    const loadWishes = async (googleScriptUrl) => {
        const container = document.getElementById('wishes-list');
        
        if (!googleScriptUrl || googleScriptUrl.includes('xxxx')) {
            container.innerHTML = '<p class="text-center italic">Contoh Ucapan: <br>"Barakallahu lakuma wa baraka alaikuma wa jama\'a bainakuma fii khair." - Tamu</p>';
            return;
        }

        try {
            const response = await fetch(googleScriptUrl);
            const data = await response.json();
            
            if (data && data.length > 0) {
                container.innerHTML = data.map(item => `
                    <div class="wish-card reveal is-visible">
                        <p class="name">${item.nama}</p>
                        <p class="msg">${item.ucapan}</p>
                        <p class="presence">${item.kehadiran} • ${new Date(item.timestamp).toLocaleDateString()}</p>
                    </div>
                `).join('');
            } else {
                container.innerHTML = '<p class="text-center">Belum ada ucapan. Jadilah yang pertama!</p>';
            }
        } catch (error) {
            container.innerHTML = '<p class="text-center text-muted">Gagal memuat ucapan terbaru.</p>';
        }
    };

    const init = (data) => {
        const form = document.getElementById('form-rsvp');
        const btnWa = document.getElementById('btn-wa-rsvp');

        if (form) {
            form.addEventListener('submit', (e) => handleFormSubmit(e, data.api.google_script_url));
        }

        if (btnWa) {
            btnWa.addEventListener('click', () => handleWhatsAppRSVP(data.api.whatsapp_number));
        }

        loadWishes(data.api.google_script_url);
    };

    return { init };
})();
