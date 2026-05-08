// Tax Calculator UI Script

function calculateTax() {
    const incomeInput = document.getElementById('income');
    const filingStatus = document.getElementById('filingStatus').value;
    const resultDiv = document.getElementById('result');

    const income = parseFloat(incomeInput.value);

    if (isNaN(income) || income < 0) {
        resultDiv.innerHTML = '<p class="error">Please enter a valid income amount.</p>';
        resultDiv.classList.remove('hidden');
        return;
    }

    const tax = calculateTax(income, filingStatus);
    const afterTax = income - tax;
    const effectiveRate = income > 0 ? ((tax / income) * 100).toFixed(2) : 0;

    resultDiv.innerHTML = `
        <h2>Tax Calculation Results</h2>
        <div class="result-item">
            <span>Annual Income:</span>
            <strong>$${income.toLocaleString()}</strong>
        </div>
        <div class="result-item">
            <span>Federal Tax:</span>
            <strong class="tax-amount">$${tax.toLocaleString()}</strong>
        </div>
        <div class="result-item">
            <span>After-Tax Income:</span>
            <strong>$${afterTax.toLocaleString()}</strong>
        </div>
        <div class="result-item">
            <span>Effective Tax Rate:</span>
            <strong>${effectiveRate}%</strong>
        </div>
    `;
    resultDiv.classList.remove('hidden');
}