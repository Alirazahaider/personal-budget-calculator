export type ExpenseCategory = {
    id: string;
    name: string;
    amount: number;
    type: 'fixed' | 'variable';
};

export type BudgetData = {
    income: number;
    expenses: ExpenseCategory[];
};