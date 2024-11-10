import { useEffect, useState } from 'react';
import { useFinancial } from '../context/FinancialContext';
import AnimatedNumber from './AnimatedNumber';

const StatementCard = ({ title, children }) => (
  <div className="bg-gray-900/50 rounded-lg p-4 shadow-xl border border-gray-800">
    <h2 className="text-xl font-bold text-white mb-4">{title}</h2>
    {children}
  </div>
);

const StatementSection = ({ title, children }) => (
  <div className="mb-4">
    <h3 className="text-lg font-semibold text-gray-300 mb-2">{title}</h3>
    <div className="space-y-1">{children}</div>
  </div>
);

const StatementRow = ({ label, value, prevValue }) => (
  <div className="flex justify-between items-center text-sm">
    <span className="text-gray-400">{label}</span>
    <AnimatedNumber value={value} prevValue={prevValue} />
  </div>
);

const TotalRow = ({ label, value, prevValue }) => (
  <div className="flex justify-between items-center font-semibold text-sm border-t border-gray-700 pt-1 mt-1">
    <span className="text-gray-300">{label}</span>
    <AnimatedNumber value={value} prevValue={prevValue} />
  </div>
);


const FinancialStatements = () => {
  const { statements } = useFinancial();
  const [prevStatements, setPrevStatements] = useState(statements);

  useEffect(() => {
    setPrevStatements(statements);
  }, [statements]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8">
      {/* Balance Sheet */}
      <StatementCard title="Balance Sheet">
        <div className="space-y-4 sm:space-y-6">
          <StatementSection title="Assets">
            <StatementRow 
              label="Cash" 
              value={statements.balanceSheet.assets.cash}
              prevValue={prevStatements.balanceSheet.assets.cash}
            />
            <StatementRow 
              label="Inventory"
              value={statements.balanceSheet.assets.inventory}
              prevValue={prevStatements.balanceSheet.assets.inventory}
            />
            <StatementRow 
              label="Equipment"
              value={statements.balanceSheet.assets.equipment}
              prevValue={prevStatements.balanceSheet.assets.equipment}
            />
            <TotalRow 
              label="Total Assets"
              value={statements.balanceSheet.assets.totalAssets}
              prevValue={prevStatements.balanceSheet.assets.totalAssets}
            />
          </StatementSection>

          <StatementSection title="Liabilities">
            <StatementRow 
              label="Accounts Payable"
              value={statements.balanceSheet.liabilities.accountsPayable}
              prevValue={prevStatements.balanceSheet.liabilities.accountsPayable}
            />
            <StatementRow 
              label="Loans"
              value={statements.balanceSheet.liabilities.loans}
              prevValue={prevStatements.balanceSheet.liabilities.loans}
            />
            <TotalRow 
              label="Total Liabilities"
              value={statements.balanceSheet.liabilities.totalLiabilities}
              prevValue={prevStatements.balanceSheet.liabilities.totalLiabilities}
            />
          </StatementSection>

          <StatementSection title="Equity">
            <StatementRow 
              label="Common Stock"
              value={statements.balanceSheet.equity.commonStock}
              prevValue={prevStatements.balanceSheet.equity.commonStock}
            />
            <StatementRow 
              label="Retained Earnings"
              value={statements.balanceSheet.equity.retainedEarnings}
              prevValue={prevStatements.balanceSheet.equity.retainedEarnings}
            />
            <TotalRow 
              label="Total Equity"
              value={statements.balanceSheet.equity.totalEquity}
              prevValue={prevStatements.balanceSheet.equity.totalEquity}
            />
          </StatementSection>
        </div>
      </StatementCard>

      {/* Income Statement */}
      <StatementCard title="Income Statement">
        <div className="space-y-4">
          <StatementRow 
            label="Revenue"
            value={statements.incomeStatement.revenue}
            prevValue={prevStatements.incomeStatement.revenue}
          />
          <StatementRow 
            label="Expenses"
            value={statements.incomeStatement.expenses}
            prevValue={prevStatements.incomeStatement.expenses}
          />
          <TotalRow 
            label="Net Income"
            value={statements.incomeStatement.netIncome}
            prevValue={prevStatements.incomeStatement.netIncome}
          />
        </div>
      </StatementCard>

      {/* Cash Flow Statement */}
      <StatementCard title="Cash Flow Statement">
        <div className="space-y-4">
          <StatementRow 
            label="Operating Activities"
            value={statements.cashFlow.operatingActivities}
            prevValue={prevStatements.cashFlow.operatingActivities}
          />
          <StatementRow 
            label="Investing Activities"
            value={statements.cashFlow.investingActivities}
            prevValue={prevStatements.cashFlow.investingActivities}
          />
          <StatementRow 
            label="Financing Activities"
            value={statements.cashFlow.financingActivities}
            prevValue={prevStatements.cashFlow.financingActivities}
          />
          <TotalRow 
            label="Net Cash Flow"
            value={statements.cashFlow.netCashFlow}
            prevValue={prevStatements.cashFlow.netCashFlow}
          />
        </div>
      </StatementCard>
    </div>
  );
};

export default FinancialStatements;