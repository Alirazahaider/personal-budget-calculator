import React from 'react';
import { exportTableToPDF } from '@/app/lib/pdfExport';
import { ExpenseCategory } from '@/app/lib/types';

type ExportButtonProps = {
    expenses: ExpenseCategory[];
    className?: string;
};

const ExportButton: React.FC<ExportButtonProps> = ({ expenses, className = '' }) => {
    const handleExport = () => {
        if (expenses.length > 0) {
            exportTableToPDF(expenses);
        }
    };

    return (
        <button
            onClick={handleExport}
            disabled={expenses.length === 0}
            className={`flex items-center gap-2 bg-[#0d5256] text-white py-2 px-4 rounded-md hover:bg-[#117378] transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Export PDF
        </button>
    );
};

export default ExportButton;