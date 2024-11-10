// src/App.jsx
import { FinancialProvider } from './context/FinancialContext';
import FinancialStatements from './components/FinancialStatements';
import TransactionMenu from './components/TransactionMenu';

const App = () => {
  return (
    <FinancialProvider>
      <div className="min-h-screen bg-[#0f172a] p-6">
        <div className="max-w-7xl mx-auto space-y-4">
          <h1 className="text-2xl font-bold text-white text-center">
            Financial Statements Visualizer
          </h1>
          <TransactionMenu />
          <div className="grid grid-cols-3 gap-4">
            <FinancialStatements />
          </div>
        </div>
      </div>
    </FinancialProvider>
  );
};

export default App;