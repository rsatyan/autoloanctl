/**
 * autoctl payment command
 */

import { Command } from 'commander';
import { calculateAutoPayment, getRecommendedTerm } from '../lib/calculations';

export function createPaymentCommand(): Command {
  return new Command('payment')
    .description('Calculate auto loan payment')
    .requiredOption('--amount <amount>', 'Loan amount')
    .requiredOption('--rate <rate>', 'Interest rate (%)')
    .option('--term <months>', 'Term in months', '60')
    .option('--compare', 'Compare multiple terms', false)
    .option('--credit-score <score>', 'Credit score (for term recommendations)', '700')
    .option('--vehicle-age <years>', 'Vehicle age in years', '0')
    .option('--format <type>', 'Output format', 'table')
    .action((options) => {
      const amount = parseFloat(options.amount);
      const rate = parseFloat(options.rate);
      
      if (options.compare) {
        const terms = getRecommendedTerm(parseInt(options.vehicleAge), parseInt(options.creditScore));
        console.log('═══════════════════════════════════════════════════════════════');
        console.log('AUTO PAYMENT COMPARISON');
        console.log('═══════════════════════════════════════════════════════════════');
        console.log(`Loan Amount: $${amount.toLocaleString()} at ${rate}%`);
        console.log('');
        console.log('TERM       PAYMENT      TOTAL INT     TOTAL COST');
        console.log('───────────────────────────────────────────────────────────────');
        for (const term of terms) {
          const result = calculateAutoPayment({
            loanAmount: amount,
            vehicleValue: amount,
            interestRate: rate,
            termMonths: term,
            creditScore: parseInt(options.creditScore),
          });
          console.log(
            `${term.toString().padEnd(10)} $${result.monthlyPayment.toLocaleString().padStart(8)}     ` +
            `$${result.totalInterest.toLocaleString().padStart(8)}     $${result.totalCost.toLocaleString()}`
          );
        }
        console.log('═══════════════════════════════════════════════════════════════');
      } else {
        const result = calculateAutoPayment({
          loanAmount: amount,
          vehicleValue: amount,
          interestRate: rate,
          termMonths: parseInt(options.term),
          creditScore: parseInt(options.creditScore),
        });

        if (options.format === 'json') {
          console.log(JSON.stringify(result, null, 2));
        } else {
          console.log('═══════════════════════════════════════════════════════════════');
          console.log('AUTO LOAN PAYMENT');
          console.log('═══════════════════════════════════════════════════════════════');
          console.log(`Loan Amount:        $${amount.toLocaleString()}`);
          console.log(`Rate:               ${rate}%`);
          console.log(`Term:               ${options.term} months`);
          console.log('───────────────────────────────────────────────────────────────');
          console.log(`Monthly Payment:    $${result.monthlyPayment.toLocaleString()}`);
          console.log(`Total Interest:     $${result.totalInterest.toLocaleString()}`);
          console.log(`Total Cost:         $${result.totalCost.toLocaleString()}`);
          console.log('═══════════════════════════════════════════════════════════════');
        }
      }
    });
}
