export interface SelectOption<T = string> {
  label: string;
  value: T;
}

export interface FormData {
  genders: SelectOption[];
  transactionTypes: SelectOption[];
  expenseCategories: SelectOption[];
  incomeCategories: SelectOption[];
  currencies: SelectOption[];
  months: SelectOption<number>[];
}

const GENDERS: SelectOption[] = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Other", value: "other" },
  { label: "Prefer not to say", value: "unspecified" },
];

const TRANSACTION_TYPES: SelectOption[] = [
  { label: "Income", value: "income" },
  { label: "Expense", value: "expense" },
  { label: "Transfer", value: "transfer" },
];

const EXPENSE_CATEGORIES: SelectOption[] = [
  { label: "Food & Dining", value: "food" },
  { label: "Transportation", value: "transport" },
  { label: "Shopping", value: "shopping" },
  { label: "Entertainment", value: "entertainment" },
  { label: "Bills & Utilities", value: "bills" },
  { label: "Health", value: "health" },
  { label: "Education", value: "education" },
  { label: "Housing", value: "housing" },
  { label: "Travel", value: "travel" },
  { label: "Other", value: "other" },
];

const INCOME_CATEGORIES: SelectOption[] = [
  { label: "Salary", value: "salary" },
  { label: "Freelance", value: "freelance" },
  { label: "Investments", value: "investments" },
  { label: "Business", value: "business" },
  { label: "Rental", value: "rental" },
  { label: "Gifts", value: "gifts" },
  { label: "Refunds", value: "refunds" },
  { label: "Other", value: "other" },
];

const CURRENCIES: SelectOption[] = [
  { label: "USD ($)", value: "USD" },
  { label: "EUR (€)", value: "EUR" },
  { label: "GBP (£)", value: "GBP" },
  { label: "INR (₹)", value: "INR" },
  { label: "JPY (¥)", value: "JPY" },
  { label: "CAD (C$)", value: "CAD" },
  { label: "AUD (A$)", value: "AUD" },
];

const MONTHS: SelectOption<number>[] = [
  { label: "January", value: 1 },
  { label: "February", value: 2 },
  { label: "March", value: 3 },
  { label: "April", value: 4 },
  { label: "May", value: 5 },
  { label: "June", value: 6 },
  { label: "July", value: 7 },
  { label: "August", value: 8 },
  { label: "September", value: 9 },
  { label: "October", value: 10 },
  { label: "November", value: 11 },
  { label: "December", value: 12 },
];

export function useFormData(): FormData {
  return {
    genders: GENDERS,
    transactionTypes: TRANSACTION_TYPES,
    expenseCategories: EXPENSE_CATEGORIES,
    incomeCategories: INCOME_CATEGORIES,
    currencies: CURRENCIES,
    months: MONTHS,
  };
}
