import ThemeToggle from './ThemeToggle';
import { useAuth } from '../auth/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Bell, Search, UserCircle, LogOut, Menu, LayoutDashboard } from 'lucide-react';
import { Input } from './ui/input';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 sticky top-0 z-40 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          
          {/* Left: Branding & Mobile Menu */}
          <div className="flex items-center gap-4">
            <div className={`lg:hidden`}>
                <Button variant="ghost" size="icon">
                    <Menu className="w-5 h-5 text-slate-700 dark:text-slate-200"/>
                </Button>
            </div>
            <Link to="/dashboard" className="text-xl font-bold bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent truncate flex items-center gap-2">
                FinTech Bank
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-1 ml-6">
                <Link to="/accounts" className="px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-lg transition-colors">
                    Accounts
                </Link>
                <Link to="/transactions" className="px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-lg transition-colors">
                    Transactions
                </Link>
                 <Link to="/transfer" className="px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-lg transition-colors">
                    Transfer
                </Link>
            </div>
          </div>

          {/* Right: User Actions */}
          <div className="flex items-center gap-2 lg:gap-4 ml-auto">
             <div className="flex items-center gap-2 mr-2">
                 <ThemeToggle />
             </div>

            {user ? (
               <div className="relative group">
                  <button className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white">
                    <Menu className="w-6 h-6" />
                  </button>

                  {/* Dropdown Menu (Shadcn Style) */}
                  <div className="absolute right-0 top-full mt-2 w-56 rounded-md border border-slate-200 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-950 p-1 text-slate-950 dark:text-slate-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transition-all duration-200 z-50">
                    <div className="px-2 py-1.5 text-sm font-semibold text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800 mb-1">
                      My Account
                    </div>
                    
                    <Link to="/profile" className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
                      <UserCircle className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>

                    <div className="h-px my-1 bg-slate-100 dark:bg-slate-800" />
                    
                    <button onClick={handleLogout} className="relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </button>
                  </div>
               </div>
            ) : (
               <div className="flex gap-2">
                 <Link to="/login">
                    <Button variant="ghost">Login</Button>
                 </Link>
                 <Link to="/register">
                    <Button className="bg-blue-600 hover:bg-blue-700">Get Started</Button>
                 </Link>
               </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
