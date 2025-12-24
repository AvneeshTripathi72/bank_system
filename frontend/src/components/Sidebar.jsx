import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { 
  LayoutDashboard, 
  Wallet, 
  ArrowRightLeft, 
  ShieldCheck, 
  LogOut, 
  UserCircle,
  Building2,
  Users
} from 'lucide-react';
import clsx from 'clsx';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const links = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['ROLE_USER', 'ROLE_ADMIN', 'ROLE_EMPLOYEE'] },
    { path: '/accounts', label: 'My Accounts', icon: Wallet, roles: ['ROLE_USER'] },
    { path: '/transactions', label: 'Transactions', icon: ArrowRightLeft, roles: ['ROLE_USER'] },
    { path: '/transfer', label: 'Transfer Money', icon: ArrowRightLeft, roles: ['ROLE_USER'] }, // New Link
    { path: '/admin', label: 'Admin Panel', icon: ShieldCheck, roles: ['ROLE_ADMIN'] },
    { path: '/employee', label: 'Employee Panel', icon: Users, roles: ['ROLE_EMPLOYEE'] } // Placeholder
  ];

  // Filter links based on user role
  const allowedLinks = links.filter(link => link.roles.includes(user?.role));

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col h-screen border-r border-slate-800 transition-all duration-300">
      <div className="p-6 flex items-center gap-3">
        <div className="p-2 bg-blue-600 rounded-lg">
          <Building2 className="w-6 h-6 text-white" />
        </div>
        <span className="text-xl font-bold text-white tracking-tight">FinTech Bank</span>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4">
        {allowedLinks.map((link) => {
          const Icon = link.icon;
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.path}
              to={link.path}
              className={clsx(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group font-medium",
                isActive 
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-900/50" 
                  : "hover:bg-slate-800 hover:text-white"
              )}
            >
              <Icon className={clsx("w-5 h-5", isActive ? "text-white" : "text-slate-400 group-hover:text-white")} />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl mb-2 bg-slate-800/50">
          <UserCircle className="w-8 h-8 text-slate-400" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">{user?.fullName || user?.username}</p>
            <p className="text-xs text-slate-500 truncate capitalize">{user?.role?.replace('ROLE_', '').toLowerCase()}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-red-950/30 hover:text-red-300 rounded-lg transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
