import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ExpenseCategory } from './types';

interface TableColumn {
    header: string;
    dataKey: string;
}

export const exportTableToPDF = (expenses: ExpenseCategory[]) => {
    const doc = new jsPDF('landscape');

    // Title
    doc.setFontSize(20);
    doc.setTextColor(13, 82, 86); // Primary color #0d5256
    doc.text('Expense Report', 145, 20, { align: 'center' });

    // Date
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 145, 30, { align: 'center' });

    // Table columns
    const columns: TableColumn[] = [
        { header: 'Expense Name', dataKey: 'name' },
        { header: 'Type', dataKey: 'type' },
        { header: 'Amount ($)', dataKey: 'amount' }
    ];

    // Prepare data
    const tableData = expenses.map(expense => ({
        name: expense.name,
        type: expense.type.charAt(0).toUpperCase() + expense.type.slice(1),
        amount: expense.amount.toFixed(2)
    }));

    // Add total row
    const totalAmount = expenses.reduce((sum, exp) => sum + exp.amount, 0);

    // Create table
    autoTable(doc, {
        startY: 40,
        head: [columns.map(col => col.header)],
        body: [
            ...tableData.map(row => columns.map(col => row[col.dataKey as keyof typeof row])),
            ['TOTAL', '', totalAmount.toFixed(2)]
        ],
        headStyles: {
            fillColor: [13, 82, 86], // Primary color
            textColor: 255,
            fontStyle: 'bold'
        },
        columnStyles: {
            0: { cellWidth: 'auto', fontStyle: 'bold' },
            1: { cellWidth: 'auto' },
            2: { cellWidth: 'auto', halign: 'right' }
        },
        styles: {
            fontSize: 10,
            cellPadding: 5,
            overflow: 'linebreak'
        },
        footStyles: {
            fillColor: [17, 115, 120], // Secondary color #117378
            textColor: 255,
            fontStyle: 'bold'
        },
        didDrawCell: (data: any) => {
            if (data.section === 'body' && data.column.index === 2) {
                doc.setTextColor(0, 0, 0);
            }
        }
    });

    // Save PDF
    doc.save(`expense-report-${new Date().toISOString().slice(0, 10)}.pdf`);
};