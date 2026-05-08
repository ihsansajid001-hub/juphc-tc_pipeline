// Tax Calculator Core Logic

function calculateTax(income, filingStatus = 'single') {
    if (income <= 0) return 0;

    const brackets = {
        single: [
            { min: 0,      max: 11000,   rate: 0.10 },
            { min: 11000,  max: 44725,   rate: 0.12 },
            { min: 44725,  max: 95375,   rate: 0.22 },
            { min: 95375,  max: 182050,  rate: 0.24 },
            { min: 182050, max: 231250,  rate: 0.32 },
            { min: 231250, max: 578125,  rate: 0.35 },
            { min: 578125, max: Infinity,rate: 0.37 }
        ],
        married: [
            { min: 0,      max: 22000,   rate: 0.10 },
            { min: 22000,  max: 89450,   rate: 0.12 },
            { min: 89450,  max: 190750,  rate: 0.22 },
            { min: 190750, max: 364200,  rate: 0.24 },
            { min: 364200, max: 462500,  rate: 0.32 },
            { min: 462500, max: 693750,  rate: 0.35 },
            { min: 693750, max: Infinity,rate: 0.37 }
        ],
        head: [
            { min: 0,      max: 15700,   rate: 0.10 },
            { min: 15700,  max: 59850,   rate: 0.12 },
            { min: 59850,  max: 95350,   rate: 0.22 },
            { min: 95350,  max: 182050,  rate: 0.24 },
            { min: 182050, max: 231250,  rate: 0.32 },
            { min: 231250, max: 578100,  rate: 0.35 },
            { min: 578100, max: Infinity,rate: 0.37 }
        ]
    };

    let tax = 0;
    let remaining = income;
    const selectedBrackets = brackets[filingStatus] || brackets['single'];

    for (const bracket of selectedBrackets) {
        if (remaining <= 0) break;
        const taxable = Math.min(remaining, bracket.max - bracket.min);
        tax += taxable * bracket.rate;
        remaining -= taxable;
    }

    return Math.round(tax * 100) / 100;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { calculateTax };
}