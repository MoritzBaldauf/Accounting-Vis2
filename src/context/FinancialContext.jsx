// src/context/FinancialContext.jsx
import { createContext, useContext, useState } from 'react';

const FinancialContext = createContext();

export const useFinancial = () => {
  const context = useContext(FinancialContext);
  if (!context) {
    throw new Error('useFinancial must be used within a FinancialProvider');
  }
  return context;
};

export const FinancialProvider = ({ children }) => {
  const [statements, setStatements] = useState({
    balanceSheet: {
      assets: {
        cash: 100000,
        inventory: 50000,
        equipment: 200000,
        totalAssets: 350000,
      },
      liabilities: {
        accountsPayable: 30000,
        loans: 100000,
        totalLiabilities: 130000,
      },
      equity: {
        commonStock: 150000,
        retainedEarnings: 70000,
        totalEquity: 220000,
      },
    },
    incomeStatement: {
      revenue: 500000,
      expenses: 400000,
      netIncome: 100000,
    },
    cashFlow: {
      operatingActivities: 80000,
      investingActivities: -50000,
      financingActivities: 30000,
      netCashFlow: 60000,
    },
  });

  const executeTransaction = (type, amount) => {
    amount = Number(amount);
    
    // Create a new object to ensure state update is detected
    setStatements(prev => {
      const next = JSON.parse(JSON.stringify(prev)); // Deep clone to ensure new references
      
      switch (type) {
        case 'depreciation':
          next.balanceSheet.assets.equipment -= amount;
          next.balanceSheet.assets.totalAssets -= amount;
          next.incomeStatement.expenses += amount;
          next.incomeStatement.netIncome -= amount;
          next.balanceSheet.equity.retainedEarnings -= amount;
          next.balanceSheet.equity.totalEquity -= amount;
          break;
          
        case 'revenue':
          next.balanceSheet.assets.cash += amount;
          next.balanceSheet.assets.totalAssets += amount;
          next.incomeStatement.revenue += amount;
          next.incomeStatement.netIncome += amount;
          next.balanceSheet.equity.retainedEarnings += amount;
          next.balanceSheet.equity.totalEquity += amount;
          next.cashFlow.operatingActivities += amount;
          next.cashFlow.netCashFlow += amount;
          break;
      }
      
      return next;
    });
  };

  return (
    <FinancialContext.Provider value={{ statements, executeTransaction }}>
      {children}
    </FinancialContext.Provider>
  );
};