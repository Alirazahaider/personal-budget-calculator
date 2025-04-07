"use client";
import React, { useState } from 'react';
import InputField from './InputField';
import { ExpenseCategory } from '@/app/lib/types';

type BudgetFormProps = {
    onSubmit: (data: { income: number; expenses: ExpenseCategory[] }) => void;
};

const BudgetForm: React.FC<BudgetFormProps> = ({ onSubmit }) => {
    const [income, setIncome] = useState<string>('');
    const [expenses, setExpenses] = useState<ExpenseCategory[]>([]);
    const [newExpenseName, setNewExpenseName] = useState<string>('');
    const [newExpenseAmount, setNewExpenseAmount] = useState<string>('');
    const [newExpenseType, setNewExpenseType] = useState<'fixed' | 'variable'>('fixed');

    const handleAddExpense = () => {
        if (newExpenseName && newExpenseAmount) {
            const newExpense: ExpenseCategory = {
                id: Date.now().toString(),
                name: newExpenseName,
                amount: parseFloat(newExpenseAmount),
                type: newExpenseType,
            };
            setExpenses([...expenses, newExpense]);
            setNewExpenseName('');
            setNewExpenseAmount('');
        }
    };

    const handleRemoveExpense = (id: string) => {
        setExpenses(expenses.filter((expense) => expense.id !== id));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (income) {
            onSubmit({
                income: parseFloat(income),
                expenses,
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-gray-900 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-[#cdcdcd] mb-6">Budget Calculator</h2>

            <InputField
                label="Monthly Income"
                type="number"
                value={income}
                onChange={setIncome}
                placeholder="Enter your monthly income"
            />

            <div className="mb-6">
                <h3 className="text-lg font-semibold text-[#117378] mb-4">Add Expense</h3>
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <InputField
                        label="Expense Name"
                        type="text"
                        value={newExpenseName}
                        onChange={setNewExpenseName}
                        placeholder="e.g., Rent, Food"
                        className="flex-1"
                    />
                    <InputField
                        label="Amount"
                        type="number"
                        value={newExpenseAmount}
                        onChange={setNewExpenseAmount}
                        placeholder="Amount"
                        className="flex-1"
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-300 text-sm font-medium mb-3">Expense Type</label>
                    <div className="flex gap-4">
                        <label className="flex-1">
                            <input
                                type="radio"
                                className="hidden peer"
                                checked={newExpenseType === 'fixed'}
                                onChange={() => setNewExpenseType('fixed')}
                            />
                            <div className="p-3 border-2 border-gray-700 rounded-lg cursor-pointer transition-all
                      peer-checked:border-[#0d5256] peer-checked:bg-[#0d5256]/20
                      hover:border-[#117378] hover:bg-[#117378]/10">
                                <div className="flex items-center">
                                    <div className={`w-5 h-5 rounded-full border-2 border-gray-400 mr-3 flex items-center justify-center
                          ${newExpenseType === 'fixed' ? 'border-[#0d5256] bg-[#0d5256]' : ''}`}>
                                        {newExpenseType === 'fixed' && (
                                            <div className="w-2 h-2 rounded-full bg-white"></div>
                                        )}
                                    </div>
                                    <span className="text-white">Fixed Expense</span>
                                </div>
                                <p className="text-xs text-gray-400 mt-1 ml-8">Recurring monthly payments</p>
                            </div>
                        </label>

                        <label className="flex-1">
                            <input
                                type="radio"
                                className="hidden peer"
                                checked={newExpenseType === 'variable'}
                                onChange={() => setNewExpenseType('variable')}
                            />
                            <div className="p-3 border-2 border-gray-700 rounded-lg cursor-pointer transition-all
                      peer-checked:border-[#117378] peer-checked:bg-[#117378]/20
                      hover:border-[#1a9ca1] hover:bg-[#1a9ca1]/10">
                                <div className="flex items-center">
                                    <div className={`w-5 h-5 rounded-full border-2 border-gray-400 mr-3 flex items-center justify-center
                          ${newExpenseType === 'variable' ? 'border-[#117378] bg-[#117378]' : ''}`}>
                                        {newExpenseType === 'variable' && (
                                            <div className="w-2 h-2 rounded-full bg-white"></div>
                                        )}
                                    </div>
                                    <span className="text-white">Variable Expense</span>
                                </div>
                                <p className="text-xs text-gray-400 mt-1 ml-8">Changing monthly costs</p>
                            </div>
                        </label>
                    </div>
                </div>
                <button
                    type="button"
                    onClick={handleAddExpense}
                    className="bg-[#117378] text-white py-2 px-4 rounded-md hover:bg-[#0d5256] transition-colors"
                >
                    Add Expense
                </button>
            </div>

            {expenses.length > 0 && (
                <div className="mb-6">
                    <h3 className="text-lg font-semibold text-[#cdcdcd] mb-4">Your Expenses</h3>
                    <ul className="space-y-2">
                        {expenses.map((expense) => (
                            <li key={expense.id}
                                className="flex justify-between items-center bg-gray-800 p-3 rounded-md">
                                <div>
                                    <span className="font-medium text-white">{expense.name}</span>
                                    <span
                                        className={`ml-2 text-xs px-2 py-1 rounded ${expense.type === 'fixed' ? 'bg-[#0d5256]' : 'bg-[#117378]'}`}>
                    {expense.type}
                  </span>
                                </div>
                                <div className="flex items-center">
                                    <span className="text-white mr-2">${expense.amount.toFixed(2)}</span>
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveExpense(expense.id)}
                                        className="text-red-400 hover:text-red-300"
                                    >
                                        ×
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <button
                type="submit"
                className="w-full bg-[#0d5256] text-white py-2 px-4 rounded-md hover:bg-[#117378] transition-colors"
            >
                Calculate Budget
            </button>
        </form>
    );
};

export default BudgetForm;