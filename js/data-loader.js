/**
 * Data Loader Module
 * Handles fetching data from data.json and injecting into the DOM
 */

const DataLoader = (() => {
    let appData = null;

    const fetchData = async () => {
        try {
            const response = await fetch('data/data.json');
            if (!response.ok) throw new Error('Failed to load data.json');
            appData = await response.json();
            return appData;
        } catch (error) {
            console.error('Error loading data:', error);
            return null;
        }
    };

    const injectData = (data) => {
        if (!data) return;

        // General
        document.title = data.general.title;
        document.getElementById('opening').style.backgroundImage = `url(${data.general.background_image})`;
        document.getElementById('bg-audio').src = data.general.backsound;

        // Opening
        document.getElementById('opening-greeting').textContent = data.opening.greeting;
        document.getElementById('groom-nickname').textContent = data.opening.groom_nickname;
        document.getElementById('bride-nickname').textContent = data.opening.bride_nickname;
        document.getElementById('date-highlight').textContent = data.opening.date_highlight;
        document.getElementById('btn-open-invitation').textContent = data.opening.button_text;

        // Quotes
        document.getElementById('quote-arabic').textContent = data.quotes.arabic;
        document.getElementById('quote-translation').textContent = data.quotes.translation;
        document.getElementById('quote-source').textContent = data.quotes.source;

        // Couple
        document.getElementById('groom-fullname').textContent = data.couple.groom.full_name;
        document.getElementById('groom-parents').textContent = data.couple.groom.parents;
        document.getElementById('bride-fullname').textContent = data.couple.bride.full_name;
        document.getElementById('bride-parents').textContent = data.couple.bride.parents;
        document.getElementById('footer-couple-names').textContent = `${data.opening.groom_nickname} & ${data.opening.bride_nickname}`;

        // Events
        const eventsContainer = document.getElementById('events-container');
        eventsContainer.innerHTML = data.events.map(event => `
            <div class="event-card reveal">
                <h3>${event.type}</h3>
                <p><strong>${event.date}</strong></p>
                <p>${event.time}</p>
                <p class="mt-1"><strong>${event.location_name}</strong></p>
                <p class="small">${event.address}</p>
                <a href="${event.maps_link}" target="_blank" class="btn-secondary mt-2" style="display: inline-block; text-decoration: none;">Lihat Lokasi</a>
            </div>
        `).join('');

        // Digital Envelope
        const bankContainer = document.getElementById('bank-accounts');
        bankContainer.innerHTML = data.digital_envelope.map(bank => `
            <div class="event-card reveal" style="min-width: 250px;">
                <h3>${bank.bank}</h3>
                <p id="acc-${bank.account_number}">${bank.account_number}</p>
                <p>a.n ${bank.account_name}</p>
                <button class="btn-secondary mt-1 btn-copy" data-copy="${bank.account_number}">Salin No. Rekening</button>
            </div>
        `).join('');

        // Add copy events
        document.querySelectorAll('.btn-copy').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const text = e.target.getAttribute('data-copy');
                navigator.clipboard.writeText(text).then(() => {
                    const originalText = btn.textContent;
                    btn.textContent = 'Berhasil Disalin!';
                    setTimeout(() => btn.textContent = originalText, 2000);
                });
            });
        });
    };

    const init = async () => {
        const data = await fetchData();
        injectData(data);
        return data;
    };

    return { init, getData: () => appData };
})();
