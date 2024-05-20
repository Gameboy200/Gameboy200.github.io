document.addEventListener('DOMContentLoaded', () => {
    // Fetch available currencies from the API
    fetch('https://api.frankfurter.app/currencies')
        .then(response => response.json())
        .then(data => {
            console.log('Currencies fetched:', data); // Debug statement
            const baseCurrencySelect = document.getElementById('baseCurrency');
            const targetCurrencySelect = document.getElementById('targetCurrency');
            
            for (const [currencyCode, currencyName] of Object.entries(data)) {
                const option = document.createElement('option');
                option.value = currencyCode;
                option.text = `${currencyName} (${currencyCode})`;
                baseCurrencySelect.appendChild(option.cloneNode(true));
                targetCurrencySelect.appendChild(option);
            }
        })
        .catch(error => console.error('Error fetching currencies:', error));
});

function convertCurrency() {
    const amount = document.getElementById('amount').value;
    const baseCurrency = document.getElementById('baseCurrency').value;
    const targetCurrency = document.getElementById('targetCurrency').value;

    fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${baseCurrency}&to=${targetCurrency}`)
        .then(response => response.json())
        .then(data => {
            console.log('Conversion data:', data); // Debug statement
            if (data.rates && data.rates[targetCurrency]) {
                const rate = data.rates[targetCurrency];
                const convertedAmount = amount * rate;
                document.getElementById('result').innerText = `${amount} ${baseCurrency} is equal to ${convertedAmount} ${targetCurrency}`;
            } else {
                document.getElementById('result').innerText = 'Conversion failed';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('result').innerText = 'Something went wrong. Please try again later.';
        });
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

// Register the service worker if supported
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('Service Worker registered with scope:', registration.scope);
            })
            .catch(error => {
                console.error('Service Worker registration failed:', error);
            });
    });
}
