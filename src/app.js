const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Tax calculation logic
function calculateTax(income, filingStatus = 'single') {
    if (income <= 0) return 0;
    
    // 2023 Tax brackets for single filers
    const brackets = {
        single: [
            { min: 0, max: 11000, rate: 0.10 },
            { min: 11000, max: 44725, rate: 0.12 },
            { min: 44725, max: 95375, rate: 0.22 },
            { min: 95375, max: 182050, rate: 0.24 },
            { min: 182050, max: 231250, rate: 0.32 },
            { min: 231250, max: 578125, rate: 0.35 },
            { min: 578125, max: Infinity, rate: 0.37 }
        ]
    };
    
    let tax = 0;
    let remainingIncome = income;
    
    for (const bracket of brackets[filingStatus]) {
        if (remainingIncome <= 0) break;
        
        const taxableInBracket = Math.min(remainingIncome, bracket.max - bracket.min);
        tax += taxableInBracket * bracket.rate;
        remainingIncome -= taxableInBracket;
    }
    
    return Math.round(tax * 100) / 100;
}

// Routes
app.get('/', (req, res) => {
    res.render('index', { result: null });
});

app.post('/calculate', (req, res) => {
    const { income, filingStatus } = req.body;
    const numericIncome = parseFloat(income);
    
    if (isNaN(numericIncome) || numericIncome < 0) {
        return res.render('index', { 
            result: null, 
            error: 'Please enter a valid income amount' 
        });
    }
    
    const tax = calculateTax(numericIncome, filingStatus);
    const afterTax = numericIncome - tax;
    const effectiveRate = numericIncome > 0 ? (tax / numericIncome * 100).toFixed(2) : 0;
    
    res.render('index', {
        result: {
            income: numericIncome,
            tax: tax,
            afterTax: afterTax,
            effectiveRate: effectiveRate,
            filingStatus: filingStatus
        },
        error: null
    });
});

// API endpoint for testing
app.get('/api/calculate/:income', (req, res) => {
    const income = parseFloat(req.params.income);
    const filingStatus = req.query.status || 'single';
    
    if (isNaN(income) || income < 0) {
        return res.status(400).json({ error: 'Invalid income amount' });
    }
    
    const tax = calculateTax(income, filingStatus);
    res.json({
        income: income,
        tax: tax,
        afterTax: income - tax,
        effectiveRate: income > 0 ? (tax / income * 100).toFixed(2) : 0
    });
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Tax Calculator app listening on port ${PORT}`);
    });
}

module.exports = { app, calculateTax };