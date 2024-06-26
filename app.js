document.addEventListener('DOMContentLoaded', () => {
    const baseCurrencySelect = document.getElementById('baseCurrency');
    const targetCurrencySelect = document.getElementById('targetCurrency');

    // Fetch available currencies from the API
    fetch('https://api.frankfurter.app/currencies')
        .then(response => response.json())
        .then(data => {
            console.log('Currencies fetched:', data); // Debug statement
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

    // Make sure the amount is a positive number
    if (amount <= 0 || isNaN(amount)) {
        document.getElementById('result').innerText = 'Please enter a valid amount';
        return;
    }

    // Fetch the conversion rate from the API
    fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${baseCurrency}&to=${targetCurrency}`)
        .then(response => response.json())
        .then(data => {
            console.log('Conversion data:', data); // Debug statement
            if (data.rates && data.rates[targetCurrency]) {
                const convertedAmount = data.rates[targetCurrency];
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
