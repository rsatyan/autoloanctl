/**
 * Auto loan types
 */
export type VehicleCondition = 'new' | 'used' | 'certified';
export type LoanType = 'direct' | 'indirect';
export interface Vehicle {
    vin?: string;
    year: number;
    make: string;
    model: string;
    trim?: string;
    mileage?: number;
    condition: VehicleCondition;
    value: number;
    tradeinValue?: number;
}
export interface AutoLoan {
    loanAmount: number;
    vehicleValue: number;
    tradeIn?: number;
    downPayment?: number;
    interestRate: number;
    termMonths: number;
    creditScore: number;
}
export interface AutoLtvResult {
    ltv: number;
    maxLtv: number;
    withinGuidelines: boolean;
    gapRecommended: boolean;
    estimatedDepreciation: number;
}
export interface AutoPayment {
    monthlyPayment: number;
    totalInterest: number;
    totalCost: number;
    effectiveRate: number;
}
export interface DealerReserve {
    buyRate: number;
    sellRate: number;
    spread: number;
    reserveAmount: number;
    reservePercent: number;
}
//# sourceMappingURL=types.d.ts.map