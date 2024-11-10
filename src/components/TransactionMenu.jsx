// src/components/TransactionMenu.jsx
import { useState } from 'react';
import { useFinancial } from '../context/FinancialContext';

const TRANSACTIONS = [
  { id: 'depreciation', label: 'Record Depreciation', type: 'expense' },
  { id: 'revenue', label: 'Record Revenue', type: 'revenue' },
  { id: 'expense', label: 'Record Expense', type: 'expense' },
  { id: 'asset-purchase', label: 'Purchase Asset', type: 'asset' },
  { id: 'loan', label: 'Take Loan', type: 'liability' },
  { id: 'pay-dividend', label: 'Pay Dividend', type: 'equity' },
];

const TransactionMenu = () => {
  const { executeTransaction } = useFinancial();
  const [selectedTransaction, setSelectedTransaction] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedTransaction || !amount) return;
    
    executeTransaction(selectedTransaction, amount);
    
    setSelectedTransaction('');
    setAmount('');
  };

  return (
    <div className="bg-gray-900/50 rounded-lg p-4 mb-4 shadow-xl border border-gray-800">
      <form onSubmit={handleSubmit} className="flex flex-row gap-4 items-end">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-400 mb-1">
            Transaction Type
          </label>
          <select
            value={selectedTransaction}
            onChange={(e) => setSelectedTransaction(e.target.value)}
            className="w-full rounded-md bg-gray-800 text-white px-3 py-2 border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="">Select Transaction</option>
            {TRANSACTIONS.map((transaction) => (
              <option key={transaction.id} value={transaction.id}>
                {transaction.label}
              </option>
            ))}
          </select>
        </div>
        
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-400 mb-1">
            Amount
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full rounded-md bg-gray-800 text-white px-3 py-2 border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter amount"
            required
          />
        </div>

        <button
          type="submit"
          className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 active:bg-blue-700 transition-colors"
        >
          Execute Transaction
        </button>
      </form>
    </div>
  );
};

export default TransactionMenu;