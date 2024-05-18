// In app.js

function convertCurrency() {
    const amount = document.getElementById('amount').value;
    const baseCurrency = document.getElementById('baseCurrency').value.toUpperCase();
    const targetCurrency = document.getElementById('targetCurrency').value.toUpperCase();

    fetch(`https://api.frankfurter.app/latest?from=${baseCurrency}&to=${targetCurrency}`)
        .then(response => response.json())
        .then(data => {
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

// Register service worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('service-worker.js')
            .then(registration => {
                console.log('Service Worker registered with scope:', registration.scope);
            })
            .catch(error => {
                console.error('Service Worker registration failed:', error);
            });
    });
}
