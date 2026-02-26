"use strict";
/**
 * Auto loan calculations
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCreditTier = getCreditTier;
exports.calculateAutoLtv = calculateAutoLtv;
exports.calculateAutoPayment = calculateAutoPayment;
exports.calculateDealerReserve = calculateDealerReserve;
exports.estimateVehicleValue = estimateVehicleValue;
exports.getRecommendedTerm = getRecommendedTerm;
/** Max LTV by vehicle condition and credit tier */
const MAX_LTV = {
    new: { superprime: 130, prime: 120, nearprime: 110, subprime: 100 },
    certified: { superprime: 125, prime: 115, nearprime: 105, subprime: 95 },
    used: { superprime: 120, prime: 110, nearprime: 100, subprime: 90 },
};
/** Annual depreciation by vehicle age */
const DEPRECIATION_RATES = {
    0: 0.20, // New car loses 20% year 1
    1: 0.15,
    2: 0.12,
    3: 0.10,
    4: 0.08,
    5: 0.07,
};
function getCreditTier(score) {
    if (score >= 720)
        return 'superprime';
    if (score >= 680)
        return 'prime';
    if (score >= 620)
        return 'nearprime';
    return 'subprime';
}
function calculateAutoLtv(loanAmount, vehicleValue, creditScore, condition = 'used') {
    const ltv = (loanAmount / vehicleValue) * 100;
    const tier = getCreditTier(creditScore);
    const maxLtv = MAX_LTV[condition][tier];
    // Estimate 3-year depreciation
    const depreciation = vehicleValue * (0.20 + 0.15 + 0.12);
    const futureValue = vehicleValue - depreciation;
    const futureLtv = (loanAmount * 0.7) / futureValue * 100; // Rough estimate at 3 years
    return {
        ltv: Math.round(ltv * 100) / 100,
        maxLtv,
        withinGuidelines: ltv <= maxLtv,
        gapRecommended: ltv > 100 || futureLtv > 100,
        estimatedDepreciation: Math.round(depreciation),
    };
}
function calculateAutoPayment(loan) {
    const monthlyRate = loan.interestRate / 100 / 12;
    const n = loan.termMonths;
    let monthlyPayment;
    if (monthlyRate === 0) {
        monthlyPayment = loan.loanAmount / n;
    }
    else {
        monthlyPayment = loan.loanAmount *
            (monthlyRate * Math.pow(1 + monthlyRate, n)) /
            (Math.pow(1 + monthlyRate, n) - 1);
    }
    const totalCost = monthlyPayment * n;
    const totalInterest = totalCost - loan.loanAmount;
    return {
        monthlyPayment: Math.round(monthlyPayment * 100) / 100,
        totalInterest: Math.round(totalInterest * 100) / 100,
        totalCost: Math.round(totalCost * 100) / 100,
        effectiveRate: loan.interestRate,
    };
}
function calculateDealerReserve(buyRate, sellRate, loanAmount, termMonths) {
    const spread = sellRate - buyRate;
    // Reserve calculation (simplified - actual varies by lender)
    // Typically 1-2% of amount financed per point of spread
    const reservePercent = spread * 0.5; // 50bps per point
    const reserveAmount = (loanAmount * reservePercent / 100) * (termMonths / 12);
    return {
        buyRate,
        sellRate,
        spread: Math.round(spread * 100) / 100,
        reserveAmount: Math.round(reserveAmount * 100) / 100,
        reservePercent: Math.round(reservePercent * 100) / 100,
    };
}
function estimateVehicleValue(originalPrice, ageYears, mileage) {
    // Apply depreciation
    let value = originalPrice;
    for (let i = 0; i < Math.min(ageYears, 6); i++) {
        value *= (1 - (DEPRECIATION_RATES[i] || 0.06));
    }
    // Mileage adjustment (above/below average)
    if (mileage !== undefined) {
        const avgMileage = ageYears * 12000;
        const mileageDiff = mileage - avgMileage;
        const adjustment = mileageDiff * 0.10 / 1000; // $0.10 per mile over/under
        value -= adjustment;
    }
    return Math.round(Math.max(value, originalPrice * 0.1));
}
function getRecommendedTerm(vehicleAge, creditScore) {
    const maxTerm = vehicleAge === 0 ? 84 : Math.max(36, 84 - (vehicleAge * 12));
    const tier = getCreditTier(creditScore);
    const terms = [];
    if (maxTerm >= 36)
        terms.push(36);
    if (maxTerm >= 48)
        terms.push(48);
    if (maxTerm >= 60)
        terms.push(60);
    if (maxTerm >= 72 && tier !== 'subprime')
        terms.push(72);
    if (maxTerm >= 84 && tier === 'superprime')
        terms.push(84);
    return terms;
}
//# sourceMappingURL=calculations.js.map