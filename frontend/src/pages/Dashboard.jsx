import { useEffect, useState } from 'react';
import { getMyAccounts } from '../api/accountApi';
import { getTransactions } from '../api/transactionApi';
import { useAuth } from '../auth/AuthContext';
import { 
  Wallet, 
  ArrowUpRight, 
  ArrowDownRight, 
  CreditCard, 
  Plus
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Button } from '../components/ui/button';

const Dashboard = () => {
  const { user } = useAuth();
  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accResponse = await getMyAccounts();
        setAccounts(accResponse.data);

        // Fetch transactions for the first account to populate charts/stats for now
        // In a real app, we might aggregate all, but let's start with primary account
        if (accResponse.data.length > 0) {
            const mainAccount = accResponse.data[0].accountNumber;
            const txResponse = await getTransactions(mainAccount);
            setTransactions(txResponse.data);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);

  // Calculate Income/Expense from transactions
  const totalIncome = transactions
    .filter(t => t.transactionType === 'DEPOSIT')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter(t => t.transactionType === 'WITHDRAWAL' || t.transactionType === 'TRANSFER')
    .reduce((sum, t) => sum + t.amount, 0);

  // Mock Graph Data (preserved structure but dynamic if we had time-series data)
  // For now, keeping mock data but cleaning it to look neutral until real aggregation is implemented
  const chartData = [
    { name: 'Mon', income: 0, expense: 0 },
    { name: 'Tue', income: 0, expense: 0 },
    { name: 'Wed', income: 0, expense: 0 },
    { name: 'Thu', income: 0, expense: 0 },
    { name: 'Fri', income: totalIncome > 0 ? totalIncome / 2 : 0, expense: totalExpense > 0 ? totalExpense / 2 : 0 }, // Just a visual placeholder relative to real data
    { name: 'Sat', income: totalIncome > 0 ? totalIncome / 2 : 0, expense: totalExpense > 0 ? totalExpense / 2 : 0 },
    { name: 'Sun', income: 0, expense: 0 },
  ];

  return (
    <div className="space-y-8 animate-in fade-in zoom-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Welcome back, {user?.username} 👋</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Here's your financial overview.</p>
        </div>
        <Link to="/transfer">
            <Button className="gap-2 bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-900/20 dark:shadow-blue-900/40">
                <Plus className="w-5 h-5" />
                New Transfer
            </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-950 dark:to-slate-900 border-none text-white shadow-xl shadow-slate-900/10">
            <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-slate-700/50 rounded-xl backdrop-blur-sm">
                        <Wallet className="w-6 h-6 text-blue-400" />
                    </div>
                </div>
                <div>
                    <p className="text-slate-400 text-sm font-medium mb-1">Total Balance</p>
                    <h3 className="text-4xl font-bold tracking-tight">${totalBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</h3>
                </div>
            </CardContent>
        </Card>

        <Card className="dark:bg-slate-900 dark:border-slate-800">
            <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-xl">
                        <ArrowUpRight className="w-6 h-6 text-green-600 dark:text-green-400" />
                    </div>
                </div>
                <div>
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">Total Income</p>
                    <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">${totalIncome.toLocaleString(undefined, { minimumFractionDigits: 2 })}</h3>
                </div>
            </CardContent>
        </Card>

        <Card className="dark:bg-slate-900 dark:border-slate-800">
            <CardContent className="p-6">
                 <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-xl">
                        <ArrowDownRight className="w-6 h-6 text-red-600 dark:text-red-400" />
                    </div>
                </div>
                <div>
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">Total Expenses</p>
                    <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">${totalExpense.toLocaleString(undefined, { minimumFractionDigits: 2 })}</h3>
                </div>
            </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Chart */}
        <Card className="lg:col-span-2 dark:bg-slate-900 dark:border-slate-800">
            <CardHeader>
                <CardTitle className="dark:text-white">Financial Analytics</CardTitle>
                <CardDescription className="dark:text-slate-400">Income vs Expenses (Based on recent activity)</CardDescription>
            </CardHeader>
            <CardContent>
                 <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} barGap={12}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                        <Tooltip 
                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            cursor={{ fill: 'transparent' }}
                        />
                        <Bar dataKey="income" fill="#2563eb" radius={[6, 6, 0, 0]} maxBarSize={40} />
                        <Bar dataKey="expense" fill="#cbd5e1" radius={[6, 6, 0, 0]} maxBarSize={40} />
                    </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>

        {/* Right Column: Accounts List */}
        <Card className="dark:bg-slate-900 dark:border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between">
                 <CardTitle className="dark:text-white">My Accounts</CardTitle>
                 <Link to="/accounts" className="text-sm text-blue-600 font-medium hover:underline">View All</Link>
            </CardHeader>
            <CardContent className="space-y-4">
                 {loading ? (
                    <div className="flex justify-center p-4">
                        <span className="loading loading-spinner text-primary"></span>
                    </div>
                ) : accounts.length > 0 ? (
                    accounts.map(acc => (
                        <div key={acc.id} className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-blue-200 dark:hover:border-blue-700 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 transition duration-200 group flex items-center justify-between cursor-pointer">
                            <div className="flex items-center gap-4">
                                <div className="avatar placeholder">
                                    <div className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 w-10 rounded-full group-hover:bg-blue-600 group-hover:text-white transition">
                                        <CreditCard className="w-5 h-5" />
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{acc.accountType}</p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">**** {acc.accountNumber.slice(-4)}</p>
                                </div>
                            </div>
                            <p className="font-bold text-slate-900 dark:text-white">${acc.balance.toLocaleString()}</p>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-8 text-slate-500 text-sm">No accounts found.</div>
                )}
                
                <Link to="/accounts">
                    <Button variant="outline" className="w-full mt-4 border-dashed border-2 bg-transparent dark:border-slate-700 dark:text-slate-400 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors">
                        <Plus className="w-4 h-4 mr-2" />
                        Open New Account
                    </Button>
                </Link>
            </CardContent>
        </Card>
      </div>
    </div>
  );
};


export default Dashboard;
