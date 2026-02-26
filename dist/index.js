#!/usr/bin/env node
"use strict";
/**
 * autoctl - Auto loan underwriting and calculations
 * Part of the LendCtl Suite
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const ltv_1 = require("./commands/ltv");
const payment_1 = require("./commands/payment");
const program = new commander_1.Command();
program
    .name('autoctl')
    .description('Auto loan underwriting and calculations - part of the LendCtl Suite')
    .version('0.1.0');
program.addCommand((0, ltv_1.createLtvCommand)());
program.addCommand((0, payment_1.createPaymentCommand)());
program.parse();
__exportStar(require("./lib/calculations"), exports);
__exportStar(require("./types"), exports);
//# sourceMappingURL=index.js.map