export const fmt = (n: number) => "$" + n.toLocaleString("en-US")

/* ----- Overview ----- */
export const INCOME = 5860
export const EXPENSES = 4942
export const FREE = INCOME - EXPENSES // 918 → display 919 per source rounding
export const ASSETS_TOTAL = 399749
export const DEBTS_TOTAL = 374624
export const NET_WORTH = ASSETS_TOTAL - DEBTS_TOTAL // 25,125

export const ALLOCATION = [
  { name: "Housing", amount: 2160, color: "oklch(0.62 0.2 18)" },
  { name: "Transport", amount: 2493, color: "oklch(0.78 0.14 80)" },
  { name: "Subscription", amount: 87, color: "oklch(0.7 0.16 300)" },
  { name: "Utilities", amount: 202, color: "oklch(0.82 0.115 212)" },
] as const

/* ----- Assets ----- */
export type AssetItem = { name: string; sub?: string; value: number }
export type AssetGroup = { category: string; items: AssetItem[] }

export const ASSET_GROUPS: AssetGroup[] = [
  {
    category: "Cash & Savings",
    items: [
      { name: "Checking", sub: "Bank of America checking account", value: 1696 },
      { name: "Cash", value: 0 },
      { name: "Rocket Money Savings", value: 1038 },
      { name: "Venmo", value: 27 },
    ],
  },
  {
    category: "Retirement Account",
    items: [{ name: "401(k) Retirement", sub: "Employer matched · ux.worksaveretire.com", value: 10771 }],
  },
  {
    category: "Investment Account",
    items: [{ name: "Vanguard IRA", sub: "vanguard.com/en/investor/portfolio", value: 9851 }],
  },
  {
    category: "Real Estate",
    items: [{ name: "Home Value", sub: "Primary residence estimate", value: 300000 }],
  },
  {
    category: "Vehicle",
    items: [
      { name: "Corvette", value: 73366 },
      { name: "Dodge Journey", value: 3000 },
    ],
  },
]

/* ----- Expenses ----- */
export type ExpenseItem = { name: string; cadence: string; amount: number; payable?: boolean }
export type ExpenseGroup = { category: string; items: ExpenseItem[] }

export const EXPENSE_GROUPS: ExpenseGroup[] = [
  {
    category: "Housing",
    items: [{ name: "Mortgage", cadence: "Monthly", amount: 2160, payable: true }],
  },
  {
    category: "Transport",
    items: [
      { name: "Corvette", cadence: "Monthly", amount: 1693, payable: true },
      { name: "Telluride", cadence: "Monthly", amount: 800, payable: true },
    ],
  },
  {
    category: "Subscription",
    items: [
      { name: "Spotify", cadence: "Monthly", amount: 13 },
      { name: "Amazon Prime", cadence: "Monthly", amount: 19 },
      { name: "Rocket Money", cadence: "Monthly", amount: 10 },
      { name: "Planet Fitness", cadence: "Monthly", amount: 27 },
      { name: "Netflix", cadence: "Monthly", amount: 18 },
    ],
  },
  {
    category: "Utilities",
    items: [{ name: "Electric", cadence: "Monthly", amount: 202 }],
  },
]

/* ----- Debts ----- */
export type DebtType = "Auto Loan" | "Mortgage" | "Credit Card"
export type DebtItem = {
  name: string
  type: DebtType
  balance: number
  apr?: number
  min?: number
}

export const DEBTS: DebtItem[] = [
  { name: "Corvette", type: "Auto Loan", balance: 93182, apr: 8.49, min: 1843 },
  { name: "Home Mortgage", type: "Mortgage", balance: 243955, apr: 7.125, min: 2167 },
  { name: "Secondary Mortgage", type: "Mortgage", balance: 10060, apr: 7.125, min: 60 },
  { name: "BOA Red", type: "Credit Card", balance: 4000 },
  { name: "BOA Gray", type: "Credit Card", balance: 15744 },
  { name: "Southwest", type: "Credit Card", balance: 5815 },
  { name: "Prime Visa", type: "Credit Card", balance: 1769 },
  { name: "CreditOne", type: "Credit Card", balance: 99 },
]

export const sum = (arr: { amount?: number; value?: number; balance?: number }[]) =>
  arr.reduce((t, x) => t + (x.amount ?? x.value ?? x.balance ?? 0), 0)
