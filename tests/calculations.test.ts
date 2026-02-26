import {
  calculateAutoLtv,
  calculateAutoPayment,
  calculateDealerReserve,
  estimateVehicleValue,
  getRecommendedTerm,
  getCreditTier,
} from '../src/lib/calculations';

describe('getCreditTier', () => {
  it('should return superprime for 720+', () => {
    expect(getCreditTier(720)).toBe('superprime');
    expect(getCreditTier(800)).toBe('superprime');
  });

  it('should return prime for 680-719', () => {
    expect(getCreditTier(680)).toBe('prime');
    expect(getCreditTier(719)).toBe('prime');
  });

  it('should return nearprime for 620-679', () => {
    expect(getCreditTier(620)).toBe('nearprime');
    expect(getCreditTier(679)).toBe('nearprime');
  });

  it('should return subprime below 620', () => {
    expect(getCreditTier(619)).toBe('subprime');
    expect(getCreditTier(550)).toBe('subprime');
  });
});

describe('calculateAutoLtv', () => {
  it('should calculate correct LTV', () => {
    const result = calculateAutoLtv(25000, 30000, 720);
    expect(result.ltv).toBeCloseTo(83.33, 1);
  });

  it('should flag high LTV', () => {
    const result = calculateAutoLtv(35000, 30000, 650);
    expect(result.withinGuidelines).toBe(false);
  });

  it('should recommend GAP for underwater loans', () => {
    const result = calculateAutoLtv(32000, 30000, 700);
    expect(result.gapRecommended).toBe(true);
  });
});

describe('calculateAutoPayment', () => {
  it('should calculate monthly payment', () => {
    const result = calculateAutoPayment({
      loanAmount: 25000,
      vehicleValue: 30000,
      interestRate: 6.0,
      termMonths: 60,
      creditScore: 720,
    });
    expect(result.monthlyPayment).toBeCloseTo(483.32, 0);
  });

  it('should calculate total interest', () => {
    const result = calculateAutoPayment({
      loanAmount: 25000,
      vehicleValue: 30000,
      interestRate: 6.0,
      termMonths: 60,
      creditScore: 720,
    });
    expect(result.totalInterest).toBeGreaterThan(0);
    expect(result.totalCost).toBe(25000 + result.totalInterest);
  });
});

describe('calculateDealerReserve', () => {
  it('should calculate spread correctly', () => {
    const result = calculateDealerReserve(5.0, 7.0, 25000, 60);
    expect(result.spread).toBe(2);
  });

  it('should calculate reserve amount', () => {
    const result = calculateDealerReserve(5.0, 7.0, 25000, 60);
    expect(result.reserveAmount).toBeGreaterThan(0);
  });
});

describe('estimateVehicleValue', () => {
  it('should apply depreciation', () => {
    const original = 30000;
    const afterYear1 = estimateVehicleValue(original, 1);
    expect(afterYear1).toBeLessThan(original);
  });

  it('should apply mileage adjustment', () => {
    const highMileage = estimateVehicleValue(30000, 3, 60000); // 60k at 3 years = high
    const lowMileage = estimateVehicleValue(30000, 3, 20000); // 20k at 3 years = low
    expect(lowMileage).toBeGreaterThan(highMileage);
  });
});

describe('getRecommendedTerm', () => {
  it('should include longer terms for new cars', () => {
    const terms = getRecommendedTerm(0, 750);
    expect(terms).toContain(84);
  });

  it('should limit terms for older vehicles', () => {
    const terms = getRecommendedTerm(5, 750);
    expect(terms).not.toContain(84);
  });

  it('should limit terms for subprime', () => {
    const terms = getRecommendedTerm(0, 600);
    expect(terms).not.toContain(84);
  });
});
