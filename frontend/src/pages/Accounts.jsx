import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { getMyAccounts, createAccount, depositMoney, withdrawMoney, transferMoney } from '../api/accountApi';
import { Plus, CreditCard } from 'lucide-react';

const Accounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newAccountType, setNewAccountType] = useState('SAVINGS');

  // Simple Action State
  const [actionType, setActionType] = useState(null); // 'DEPOSIT', 'WITHDRAW', 'TRANSFER'
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [amount, setAmount] = useState('');
  const [targetAccount, setTargetAccount] = useState('');

  const fetchAccounts = async () => {
    try {
      const response = await getMyAccounts();
      setAccounts(response.data);
    } catch (error) {
      console.error("Failed to fetch accounts", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  const handleCreateAccount = async () => {
    try {
      await createAccount(newAccountType);
      setShowCreateModal(false);
      fetchAccounts();
    } catch (error) {
      alert("Failed to create account");
    }
  };

  const handleAction = async (e) => {
    e.preventDefault();
    try {
      if (actionType === 'DEPOSIT') {
        await depositMoney(selectedAccount, parseFloat(amount));
      } else if (actionType === 'WITHDRAW') {
        await withdrawMoney(selectedAccount, parseFloat(amount));
      } else if (actionType === 'TRANSFER') {
        await transferMoney(selectedAccount, { targetAccountNumber: targetAccount, amount: parseFloat(amount) });
      }
      alert('Transaction Successful');
      setActionType(null);
      setAmount('');
      setTargetAccount('');
      fetchAccounts();
    } catch (error) {
      alert('Transaction Failed: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">My Accounts</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">Manage your savings and checking accounts.</p>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="px-5 py-2.5 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-900/20 transition-all flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Create Account
        </button>
      </div>

      {/* Accounts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {accounts.map(acc => (
          <div key={acc.id} className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 hover:shadow-md transition-all group relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <CreditCard className="w-24 h-24 text-blue-600 transform rotate-12 translate-x-4 -translate-y-4" />
            </div>
            
            <div className="flex justify-between items-start mb-6 relative z-10">
              <div>
                <span className="inline-block px-2.5 py-1 text-xs font-bold bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg mb-2 uppercase tracking-wide">
                  {acc.accountType}
                </span>
                <h3 className="font-mono text-lg text-slate-600 dark:text-slate-400 tracking-wider">**** {acc.accountNumber.slice(-4)}</h3>
              </div>
            </div>
            
            <div className="mb-6 relative z-10">
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Available Balance</p>
                <p className="text-3xl font-extrabold text-slate-900 dark:text-white">${acc.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
            </div>
            
            <div className="grid grid-cols-3 gap-2 relative z-10">
              <button onClick={() => { setSelectedAccount(acc.accountNumber); setActionType('DEPOSIT'); }} className="px-3 py-2 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-green-50 hover:text-green-700 dark:hover:bg-green-900/20 dark:hover:text-green-400 text-sm font-medium transition-colors">Deposit</button>
              <button onClick={() => { setSelectedAccount(acc.accountNumber); setActionType('WITHDRAW'); }} className="px-3 py-2 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-amber-50 hover:text-amber-700 dark:hover:bg-amber-900/20 dark:hover:text-amber-400 text-sm font-medium transition-colors">Withdraw</button>
              <button onClick={() => { setSelectedAccount(acc.accountNumber); setActionType('TRANSFER'); }} className="px-3 py-2 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-blue-900/20 dark:hover:text-blue-400 text-sm font-medium transition-colors">Transfer</button>
            </div>
          </div>
        ))}
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl w-full max-w-md shadow-2xl border border-slate-100 dark:border-slate-800">
            <h3 className="text-xl font-bold mb-6 text-slate-900 dark:text-white">Create New Account</h3>
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">Account Type</label>
              <select 
                value={newAccountType}
                onChange={(e) => setNewAccountType(e.target.value)}
                className="w-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none transition"
              >
                <option value="SAVINGS">Savings Account</option>
                <option value="CURRENT">Current Account</option>
              </select>
            </div>
            <div className="flex justify-end gap-3">
              <button onClick={() => setShowCreateModal(false)} className="px-5 py-2.5 text-slate-600 dark:text-slate-400 font-medium hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition">Cancel</button>
              <button onClick={handleCreateAccount} className="px-5 py-2.5 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-900/20">Create Account</button>
            </div>
          </div>
        </div>
      )}

      {/* Action Modal */}
      {actionType && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl w-full max-w-md shadow-2xl border border-slate-100 dark:border-slate-800">
            <h3 className="text-xl font-bold mb-1 text-slate-900 dark:text-white uppercase tracking-wide text-sm text-blue-600 dark:text-blue-400 mb-4">{actionType} Funds</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">Account: <span className="font-mono font-medium text-slate-900 dark:text-slate-200">{selectedAccount}</span></p>
            
            <form onSubmit={handleAction} className="space-y-4">
              <div>
                <label className="block mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">Amount</label>
                <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">$</span>
                    <input 
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl pl-8 pr-4 py-3 text-lg font-bold focus:ring-2 focus:ring-blue-500 outline-none transition"
                      placeholder="0.00"
                      step="0.01"
                      required
                    />
                </div>
              </div>
              {actionType === 'TRANSFER' && (
                <div>
                  <label className="block mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">Target Account Number</label>
                  <input 
                    type="text"
                    value={targetAccount}
                    onChange={(e) => setTargetAccount(e.target.value)}
                    className="w-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl px-4 py-3 font-mono focus:ring-2 focus:ring-blue-500 outline-none transition"
                    placeholder="Enter account number"
                    required
                  />
                </div>
              )}
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setActionType(null)} className="px-5 py-2.5 text-slate-600 dark:text-slate-400 font-medium hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition">Cancel</button>
                <button type="submit" className="px-5 py-2.5 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-900/20">Confirm {actionType}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Accounts;
