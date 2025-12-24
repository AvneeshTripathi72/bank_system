import { useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { transferMoney } from '../api/accountApi';
import { AlertCircle, CheckCircle, Send, Wallet, UserCircle as UserCircleIcon } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { cn } from '../utils/cn';

const Transfer = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    sourceAccountNumber: '',
    targetAccountNumber: '',
    amount: '',
    description: '' // Optional description
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (status.message) setStatus({ type: '', message: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      await transferMoney(
        formData.sourceAccountNumber,
        {
          targetAccountNumber: formData.targetAccountNumber,
          amount: parseFloat(formData.amount)
        }
      );
      setStatus({ type: 'success', message: 'Transfer successful!' });
      setFormData({ ...formData, amount: '', targetAccountNumber: '', description: '' });
    } catch (err) {
      setStatus({ 
        type: 'error', 
        message: err.response?.data?.message || 'Transfer failed. Check details.' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Transfer Money</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Send money securely to another account instantly.</p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl shadow-slate-200/60 dark:shadow-slate-900/50 border border-slate-100 dark:border-slate-800 p-8">
        {status.message && (
          <div className={cn(
            "p-4 rounded-xl flex items-center gap-3 mb-6 transition-all duration-300",
            status.type === 'error' ? "bg-red-50 text-red-700 border border-red-100 dark:bg-red-900/20 dark:text-red-400 dark:border-red-900/30" : "bg-green-50 text-green-700 border border-green-100 dark:bg-green-900/20 dark:text-green-400 dark:border-green-900/30"
          )}>
            {status.type === 'error' ? <AlertCircle className="w-5 h-5"/> : <CheckCircle className="w-5 h-5"/>}
            <span className="font-medium">{status.message}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">From Account</label>
            <div className="relative">
              <Wallet className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 z-10" />
              <Input
                type="text"
                name="sourceAccountNumber"
                value={formData.sourceAccountNumber}
                onChange={handleChange}
                className="pl-10 h-10 md:h-12 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus-visible:ring-blue-600 font-mono text-slate-900 dark:text-white placeholder:text-slate-400"
                placeholder="Your Account Number"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">To Account</label>
            <div className="relative">
              <UserCircleIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 z-10" />
              <Input
                type="text"
                name="targetAccountNumber"
                value={formData.targetAccountNumber}
                onChange={handleChange}
                className="pl-10 h-10 md:h-12 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus-visible:ring-blue-600 font-mono text-slate-900 dark:text-white placeholder:text-slate-400"
                placeholder="Recipient Account Number"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Amount</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold z-10">$</span>
              <Input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                className="pl-8 h-10 md:h-12 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus-visible:ring-blue-600 text-lg font-bold text-slate-900 dark:text-white"
                placeholder="0.00"
                min="0.01"
                step="0.01"
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-blue-900/20 text-md mt-4"
          >
            {loading ? 'Processing...' : (
              <>
                <Send className="w-5 h-5 mr-2" />
                Transfer Funds
              </>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Transfer;
