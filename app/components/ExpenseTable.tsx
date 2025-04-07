import React from 'react';
import { ExpenseCategory } from '@/app/lib/types';
import ExportButton from './ExportButton';

type ExpenseTableProps = {
    expenses: ExpenseCategory[];
    onRemove: (id: string) => void;
};

const ExpenseTable: React.FC<ExpenseTableProps> = ({ expenses, onRemove }) => {
    if (expenses.length === 0) return null;

    return (
        <div className="bg-gray-900 p-6 rounded-lg shadow-lg mt-6">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-[#cdcdcd]">Expense Details</h3>
                <ExportButton expenses={expenses} />
            </div>

            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                    <tr className="bg-gray-800 text-gray-300">
                        <th className="p-3 text-left">Name</th>
                        <th className="p-3 text-left">Type</th>
                        <th className="p-3 text-right">Amount</th>
                        <th className="p-3 text-right">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {expenses.map((expense) => (
                        <tr key={expense.id} className="border-b border-gray-700 hover:bg-gray-800/50">
                            <td className="p-3 text-white">{expense.name}</td>
                            <td className="p-3">
                  <span className={`px-2 py-1 rounded text-xs ${
                      expense.type === 'fixed'
                          ? 'bg-[#0d5256] text-white'
                          : 'bg-[#117378] text-white'
                  }`}>
                    {expense.type}
                  </span>
                            </td>
                            <td className="p-3 text-right text-white">${expense.amount.toFixed(2)}</td>
                            <td className="p-3 text-right">
                                <button
                                    onClick={() => onRemove(expense.id)}
                                    className="text-red-400 hover:text-red-300 px-2 py-1 rounded hover:bg-red-900/20"
                                >
                                    Remove
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                    <tfoot>
                    <tr className="bg-gray-800 text-white font-medium">
                        <td className="p-3" colSpan={2}>Total Expenses</td>
                        <td className="p-3 text-right">
                            ${expenses.reduce((sum, exp) => sum + exp.amount, 0).toFixed(2)}
                        </td>
                        <td className="p-3"></td>
                    </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
};

export default ExpenseTable;