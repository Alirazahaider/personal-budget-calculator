"use client";
import React, { useState } from 'react';
import BudgetForm from './components/BudgetForm';
import BudgetSummary from './components/BudgetSummary';
import ExpenseChart from './components/ExpenseChart';
import { ExpenseCategory } from '@/app/lib/types';
import ExpenseTable from "@/app/components/ExpenseTable";

export default function BudgetCalculator() {
  const [budgetData, setBudgetData] = useState<{
    income: number;
    expenses: ExpenseCategory[];
  } | null>(null);

  const handleSubmit = (data: { income: number; expenses: ExpenseCategory[] }) => {
    setBudgetData(data);
  };

  return (
      <main className="min-h-screen bg-black text-white p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-[#cdcdcd] mb-8 text-center">
            Personal Budget Calculator
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <BudgetForm onSubmit={handleSubmit} />
            </div>

            <div className="space-y-8">
              {budgetData && (
                  <>
                    <BudgetSummary income={budgetData.income} expenses={budgetData.expenses} />
                    <ExpenseChart expenses={budgetData.expenses} />
                    <ExpenseTable
                        expenses={budgetData.expenses}
                        onRemove={(id) => {
                          setBudgetData(prev => ({
                            ...prev!,
                            expenses: prev!.expenses.filter(exp => exp.id !== id)
                          }));
                        }}
                    />
                  </>
              )}
            </div>
          </div>
        </div>
      </main>
  );
}