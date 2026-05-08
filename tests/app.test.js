const request = require('supertest');
const { app, calculateTax } = require('../src/app');

describe('Tax Calculator App', () => {
  
  describe('GET /', () => {
    it('should return the main page', async () => {
      const res = await request(app).get('/');
      expect(res.statusCode).toBe(200);
      expect(res.text).toContain('Tax Calculator');
    });
  });

  describe('GET /health', () => {
    it('should return health status', async () => {
      const res = await request(app).get('/health');
      expect(res.statusCode).toBe(200);
      expect(res.body.status).toBe('OK');
    });
  });

  describe('GET /api/calculate/:income', () => {
    it('should calculate tax via API', async () => {
      const res = await request(app).get('/api/calculate/50000');
      expect(res.statusCode).toBe(200);
      expect(res.body.income).toBe(50000);
      expect(res.body.tax).toBe(6307.5);
    });

    it('should return error for invalid income', async () => {
      const res = await request(app).get('/api/calculate/invalid');
      expect(res.statusCode).toBe(400);
      expect(res.body.error).toBe('Invalid income amount');
    });
  });

  describe('POST /calculate', () => {
    it('should calculate tax and return results page', async () => {
      const res = await request(app)
        .post('/calculate')
        .send({ income: '25000', filingStatus: 'single' });
      expect(res.statusCode).toBe(200);
      expect(res.text).toContain('Tax Calculation Results');
    });

    it('should handle invalid income input', async () => {
      const res = await request(app)
        .post('/calculate')
        .send({ income: 'invalid', filingStatus: 'single' });
      expect(res.statusCode).toBe(200);
      expect(res.text).toContain('Please enter a valid income amount');
    });
  });

});

describe('calculateTax function', () => {
  
  it('should return 0 for zero income', () => {
    expect(calculateTax(0)).toBe(0);
  });

  it('should return 0 for negative income', () => {
    expect(calculateTax(-1000)).toBe(0);
  });

  it('should calculate tax for first bracket', () => {
    expect(calculateTax(10000)).toBe(1000);
  });

  it('should calculate tax for multiple brackets', () => {
    expect(calculateTax(50000)).toBe(6307.5);
  });

  it('should handle large amounts', () => {
    const tax = calculateTax(1000000);
    expect(tax).toBeGreaterThan(0);
    expect(typeof tax).toBe('number');
  });

});