import React from 'react';
import { ExpenseCategory } from '@/app/lib/types';


type BudgetSummaryProps = {
    income: number;
    expenses: ExpenseCategory[];
};

const BudgetSummary: React.FC<BudgetSummaryProps> = ({ income, expenses }) => {
    const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const remainingBudget = income - totalExpenses;
    const percentageSpent = income > 0 ? (totalExpenses / income) * 100 : 0;

    return (
        <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-[#cdcdcd] mb-4">Budget Summary</h3>


            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-800 p-4 rounded-md">
                    <h4 className="text-gray-400 text-sm">Total Income</h4>
                    <p className="text-2xl font-bold text-white">${income.toFixed(2)}</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-md">
                    <h4 className="text-gray-400 text-sm">Total Expenses</h4>
                    <p className="text-2xl font-bold text-white">${totalExpenses.toFixed(2)}</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-md">
                    <h4 className="text-gray-400 text-sm">Remaining</h4>
                    <p className={`text-2xl font-bold ${remainingBudget >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        ${remainingBudget.toFixed(2)}
                    </p>
                </div>
            </div>

            <div className="w-full bg-gray-700 rounded-full h-4 mb-2">
                <div
                    className="bg-[#0d5256] h-4 rounded-full"
                    style={{width: `${Math.min(percentageSpent, 100)}%`}}
                ></div>
            </div>
            <p className="text-gray-300 text-sm text-right">
                {percentageSpent.toFixed(1)}% of income spent
            </p>

            {remainingBudget < 0 && (
                <div className="mt-4 p-3 bg-red-900/30 text-red-300 rounded-md">
                    Warning: You're spending more than you earn!
                </div>
            )}
        </div>
    );
};

export default BudgetSummary;