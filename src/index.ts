#!/usr/bin/env node

/**
 * autoctl - Auto loan underwriting and calculations
 * Part of the LendCtl Suite
 */

import { Command } from 'commander';
import { createLtvCommand } from './commands/ltv';
import { createPaymentCommand } from './commands/payment';

const program = new Command();

program
  .name('autoctl')
  .description('Auto loan underwriting and calculations - part of the LendCtl Suite')
  .version('0.1.0');

program.addCommand(createLtvCommand());
program.addCommand(createPaymentCommand());

program.parse();

export * from './lib/calculations';
export * from './types';
