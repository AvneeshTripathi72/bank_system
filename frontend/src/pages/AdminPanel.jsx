import { useState, useEffect } from 'react';
import { ShieldCheck, AlertTriangle, Users, Activity, Search } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';

const AdminPanel = () => {
    // In a real app, this would fetch from adminApi
    // For now, enhancing the mock data to look more realistic and "enterprise"
    const [logs] = useState([
        { id: 1, action: "SUSPICIOUS_TRANSFER", user: "user123", desc: "Large transfer attempt > $10k detected", time: "2024-05-20 10:00", severity: "HIGH" },
        { id: 2, action: "LOGIN_FAILURE", user: "unknown_ip", desc: "Multiple failed login attempts from IP 192.168.1.5", time: "2024-05-20 11:30", severity: "MEDIUM" },
        { id: 3, action: "ACCOUNT_CREATED", user: "admin_sys", desc: "New premium account approved for client #8832", time: "2024-05-20 12:45", severity: "LOW" },
        { id: 4, action: "API_RATE_LIMIT", user: "system", desc: "Rate limit threshold reached for external API", time: "2024-05-20 13:15", severity: "MEDIUM" }
    ]);

    return (
        <div className="space-y-8 animate-in fade-in zoom-in duration-500">
             {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
                    <ShieldCheck className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                    Admin Console
                </h1>
                <p className="text-slate-500 dark:text-slate-400 mt-1">System monitoring, security alerts, and user management.</p>
                </div>
                
                <div className="relative w-full md:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input 
                        placeholder="Search logs..." 
                        className="pl-9 h-10 bg-white dark:bg-slate-900"
                    />
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-gradient-to-br from-red-50 to-white dark:from-red-900/20 dark:to-slate-900 border-red-100 dark:border-red-900/30">
                    <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-red-100 dark:bg-red-900/50 rounded-xl text-red-600 dark:text-red-400">
                                <AlertTriangle className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Active Alerts</p>
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">3 High Priority</h3>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-blue-50 to-white dark:from-blue-900/20 dark:to-slate-900 border-blue-100 dark:border-blue-900/30">
                    <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-xl text-blue-600 dark:text-blue-400">
                                <Users className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Users</p>
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">1,248</h3>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-50 to-white dark:from-purple-900/20 dark:to-slate-900 border-purple-100 dark:border-purple-900/30">
                    <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-purple-100 dark:bg-purple-900/50 rounded-xl text-purple-600 dark:text-purple-400">
                                <Activity className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">System Status</p>
                                <h3 className="text-2xl font-bold text-green-600 dark:text-green-400">Operational</h3>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Audit Logs Table */}
            <Card className="dark:bg-slate-900 dark:border-slate-800">
                <CardHeader>
                    <CardTitle className="dark:text-white">Security Audit Logs</CardTitle>
                    <CardDescription className="dark:text-slate-400">Recent system activities and security events</CardDescription>
                </CardHeader>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-slate-500 uppercase bg-slate-50 dark:bg-slate-800 dark:text-slate-400">
                            <tr>
                                <th className="px-6 py-4 font-semibold">Timestamp</th>
                                <th className="px-6 py-4 font-semibold">Severity</th>
                                <th className="px-6 py-4 font-semibold">Action</th>
                                <th className="px-6 py-4 font-semibold">User / Source</th>
                                <th className="px-6 py-4 font-semibold">Details</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {logs.map(log => (
                                <tr key={log.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                    <td className="px-6 py-4 font-mono text-slate-600 dark:text-slate-400 whitespace-nowrap">
                                        {log.time}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                                            log.severity === 'HIGH' 
                                                ? 'bg-red-50 text-red-700 border-red-100 dark:bg-red-900/30 dark:text-red-400 dark:border-red-900/50'
                                            : log.severity === 'MEDIUM'
                                                ? 'bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-900/50'
                                            : 'bg-green-50 text-green-700 border-green-100 dark:bg-green-900/30 dark:text-green-400 dark:border-green-900/50'
                                        }`}>
                                            {log.severity}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                                        {log.action}
                                    </td>
                                    <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xs font-bold">
                                                {log.user.charAt(0).toUpperCase()}
                                            </div>
                                            {log.user}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-slate-500 dark:text-slate-400 max-w-xs truncate" title={log.desc}>
                                        {log.desc}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

export default AdminPanel;
