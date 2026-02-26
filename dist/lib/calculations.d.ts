/**
 * Auto loan calculations
 */
import { AutoLoan, AutoLtvResult, AutoPayment, DealerReserve, VehicleCondition } from '../types';
export declare function getCreditTier(score: number): string;
export declare function calculateAutoLtv(loanAmount: number, vehicleValue: number, creditScore: number, condition?: VehicleCondition): AutoLtvResult;
export declare function calculateAutoPayment(loan: AutoLoan): AutoPayment;
export declare function calculateDealerReserve(buyRate: number, sellRate: number, loanAmount: number, termMonths: number): DealerReserve;
export declare function estimateVehicleValue(originalPrice: number, ageYears: number, mileage?: number): number;
export declare function getRecommendedTerm(vehicleAge: number, creditScore: number): number[];
//# sourceMappingURL=calculations.d.ts.map