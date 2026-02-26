# autoloanctl

Auto loan underwriting and calculations. Part of the **LendCtl Suite**.

## Features

- **LTV Calculation** — With max LTV by credit tier
- **Payment Calculation** — Monthly payment and total cost
- **Term Comparison** — Compare payment across terms
- **GAP Analysis** — Identify underwater loan risk
- **Dealer Reserve** — Calculate spread and reserve

## Installation

```bash
npm install -g autoloanctl
```

## Quick Start

### Calculate LTV

```bash
autoloanctl ltv --loan-amount 28000 --vehicle-value 32000 --credit-score 700
```

### Calculate Payment

```bash
autoloanctl payment --amount 25000 --rate 6.5 --term 60
```

### Compare Terms

```bash
autoloanctl payment --amount 25000 --rate 6.5 --compare --credit-score 720
```

## Commands

### `autoloanctl ltv`
Calculate loan-to-value ratio.

Options:
- `--loan-amount <amount>` - Loan amount (required)
- `--vehicle-value <value>` - Vehicle value (required)
- `--credit-score <score>` - Credit score (default: 700)
- `--condition <type>` - new|used|certified (default: used)

### `autoloanctl payment`
Calculate monthly payment.

Options:
- `--amount <amount>` - Loan amount (required)
- `--rate <rate>` - Interest rate % (required)
- `--term <months>` - Term in months (default: 60)
- `--compare` - Compare multiple terms

## Credit Tiers & Max LTV

| Tier | Score | New | Certified | Used |
|------|-------|-----|-----------|------|
| Superprime | 720+ | 130% | 125% | 120% |
| Prime | 680-719 | 120% | 115% | 110% |
| Near-prime | 620-679 | 110% | 105% | 100% |
| Subprime | <620 | 100% | 95% | 90% |

## License

Apache-2.0 © Avatar Consulting
