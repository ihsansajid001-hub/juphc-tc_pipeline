const { calculateTax } = require('../src/taxCalculator');

describe("Tax Calculator", function() {

    describe("calculateTax function", function() {

        it("should return 0 for zero income", function() {
            expect(calculateTax(0)).toBe(0);
        });

        it("should return 0 for negative income", function() {
            expect(calculateTax(-1000)).toBe(0);
        });

        it("should calculate tax correctly for income in first bracket", function() {
            const tax = calculateTax(10000);
            expect(tax).toBe(1000); // 10% of 10000
        });

        it("should calculate tax correctly for income spanning multiple brackets", function() {
            const tax = calculateTax(50000);
            // 11000 * 0.10 = 1100
            // (44725 - 11000) * 0.12 = 4047
            // (50000 - 44725) * 0.22 = 1160.5
            // Total = 6307.5
            expect(tax).toBe(6307.5);
        });

        it("should handle large income amounts correctly", function() {
            const tax = calculateTax(100000);
            expect(tax).toBeGreaterThan(0);
            expect(typeof tax).toBe('number');
        });

        it("should return a number for valid income", function() {
            const tax = calculateTax(25000);
            expect(typeof tax).toBe('number');
            expect(tax).toBeGreaterThan(0);
        });

        it("should calculate tax for income at bracket boundary", function() {
            const tax = calculateTax(11000);
            expect(tax).toBe(1100); // Exactly at first bracket limit
        });

    });

});