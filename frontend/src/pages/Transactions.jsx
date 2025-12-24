import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { getMyAccounts } from '../api/accountApi';
import { getTransactions } from '../api/transactionApi';

const Transactions = () => {
    const [accounts, setAccounts] = useState([]);
    const [selectedAccount, setSelectedAccount] = useState('');
    const [transactions, setTransactions] = useState([]);
    
    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                const res = await getMyAccounts();
                setAccounts(res.data);
                if (res.data.length > 0) {
                    setSelectedAccount(res.data[0].accountNumber);
                }
            } catch (error) {
                console.error("Error fetching accounts", error);
            }
        };
        fetchAccounts();
    }, []);

    useEffect(() => {
        if (!selectedAccount) return;
        
        const fetchTransactions = async () => {
            try {
                const res = await getTransactions(selectedAccount);
                setTransactions(res.data);
            } catch (error) {
                console.error("Error fetching transactions", error);
            }
        };
        fetchTransactions();
    }, [selectedAccount]);

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
           <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
               <div>
                   <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Transactions</h1>
                   <p className="text-slate-500 dark:text-slate-400 mt-1">View and filter your transaction history.</p>
               </div>
               
               <div className="flex items-center gap-3 w-full md:w-auto">
                   <label className="text-sm font-medium text-slate-600 dark:text-slate-400 whitespace-nowrap">Account:</label>
                   <select 
                       className="select select-bordered select-sm w-full md:w-64 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                       value={selectedAccount} 
                       onChange={(e) => setSelectedAccount(e.target.value)}
                   >
                       {accounts.map(acc => (
                           <option key={acc.id} value={acc.accountNumber}>
                               {acc.accountType} - **** {acc.accountNumber.slice(-4)} (${acc.balance})
                           </option>
                       ))}
                   </select>
               </div>
           </div>

           <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
               <div className="overflow-x-auto">
                   <table className="table">
                       {/* head */}
                       <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 font-semibold uppercase text-xs tracking-wider">
                           <tr>
                               <th className="py-4 pl-6">Date</th>
                               <th>Type</th>
                               <th>Description</th>
                               <th>Status</th>
                               <th className="pr-6 text-right">Amount</th>
                           </tr>
                       </thead>
                       <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                           {transactions.length > 0 ? (
                               transactions.map(tx => (
                                   <tr key={tx.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                       <td className="pl-6 py-4">
                                           <div className="font-medium text-slate-900 dark:text-white">
                                               {new Date(tx.timestamp).toLocaleDateString()}
                                           </div>
                                           <div className="text-xs text-slate-500 dark:text-slate-400">
                                               {new Date(tx.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                           </div>
                                       </td>
                                       <td>
                                           <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                                               tx.transactionType === 'DEPOSIT' 
                                                   ? 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-900/30' 
                                               : tx.transactionType === 'WITHDRAWAL' 
                                                   ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-900/30'
                                               : 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-900/30'
                                           }`}>
                                               {tx.transactionType}
                                           </span>
                                       </td>
                                       <td>
                                           <div className="text-slate-900 dark:text-white font-medium max-w-xs truncate" title={tx.description}>
                                               {tx.description}
                                           </div>
                                       </td>
                                       <td>
                                           <div className={`badge badge-sm font-semibold ${tx.status === 'SUCCESS' ? 'badge-success gap-2 text-white' : 'badge-ghost'}`}>
                                               {tx.status}
                                           </div>
                                       </td>
                                       <td className="pr-6 text-right">
                                           <span className={`font-bold font-mono text-lg ${
                                               tx.transactionType === 'DEPOSIT' ? 'text-green-600 dark:text-green-400' : 'text-slate-900 dark:text-white'
                                           }`}>
                                               {tx.transactionType === 'DEPOSIT' ? '+' : '-'}${tx.amount.toFixed(2)}
                                           </span>
                                       </td>
                                   </tr>
                               ))
                           ) : (
                               <tr>
                                   <td colSpan="5" className="text-center py-12 text-slate-500 dark:text-slate-400">
                                       No transactions found for this account.
                                   </td>
                               </tr>
                           )}
                       </tbody>
                   </table>
               </div>
           </div>
        </div>
    );
};

export default Transactions;
