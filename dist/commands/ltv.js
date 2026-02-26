"use strict";
/**
 * autoctl ltv command
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLtvCommand = createLtvCommand;
const commander_1 = require("commander");
const calculations_1 = require("../lib/calculations");
function createLtvCommand() {
    return new commander_1.Command('ltv')
        .description('Calculate auto loan LTV')
        .requiredOption('--loan-amount <amount>', 'Loan amount')
        .requiredOption('--vehicle-value <value>', 'Vehicle value')
        .option('--credit-score <score>', 'Credit score', '700')
        .option('--condition <type>', 'Vehicle condition (new|used|certified)', 'used')
        .option('--format <type>', 'Output format', 'table')
        .action((options) => {
        const result = (0, calculations_1.calculateAutoLtv)(parseFloat(options.loanAmount), parseFloat(options.vehicleValue), parseInt(options.creditScore), options.condition);
        if (options.format === 'json') {
            console.log(JSON.stringify(result, null, 2));
        }
        else {
            console.log('═══════════════════════════════════════════════════════════════');
            console.log('AUTO LOAN LTV');
            console.log('═══════════════════════════════════════════════════════════════');
            console.log(`LTV:                ${result.ltv}%`);
            console.log(`Max LTV:            ${result.maxLtv}%`);
            console.log(`Status:             ${result.withinGuidelines ? '✓ Within guidelines' : '✗ Exceeds guidelines'}`);
            console.log(`GAP Recommended:    ${result.gapRecommended ? 'Yes' : 'No'}`);
            console.log(`Est. 3yr Deprec:    $${result.estimatedDepreciation.toLocaleString()}`);
            console.log('═══════════════════════════════════════════════════════════════');
        }
    });
}
//# sourceMappingURL=ltv.js.map