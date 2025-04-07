import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { ExpenseCategory } from '@/app/lib/types';

ChartJS.register(ArcElement, Tooltip, Legend);

type ExpenseChartProps = {
    expenses: ExpenseCategory[];
};

const ExpenseChart: React.FC<ExpenseChartProps> = ({ expenses }) => {
    if (expenses.length === 0) return null;

    const data = {
        labels: expenses.map((expense) => expense.name),
        datasets: [
            {
                data: expenses.map((expense) => expense.amount),
                backgroundColor: [
                    '#0d5256',
                    '#117378',
                    '#1a9ca1',
                    '#23c6cb',
                    '#2ceff5',
                    '#0d525680',
                    '#11737880',
                    '#1a9ca180',
                ],
                borderColor: 'black',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                position: 'right' as const,
                labels: {
                    color: 'white',
                },
            },
            tooltip: {
                callbacks: {
                    label: function(context: any) {
                        const label = context.label || '';
                        const value = context.raw || 0;
                        const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
                        const percentage = Math.round((value / total) * 100);
                        return `${label}: $${value} (${percentage}%)`;
                    },
                },
            },
        },
    };

    return (
        <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-[#cdcdcd] mb-4">Spending Breakdown</h3>
            <div className="h-64 md:h-80">
                <Doughnut data={data} options={options} />
            </div>
        </div>
    );
};

export default ExpenseChart;