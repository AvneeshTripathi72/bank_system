import { useState, useEffect } from 'react';
import { useAuth } from '../auth/AuthContext';
import { updateProfile } from '../api/userApi';
import { User, MapPin, Calendar, Lock, Save, Loader2 } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';

const Profile = () => {
  const { user, refreshUser } = useAuth();
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    age: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || '',
        address: user.address || '',
        age: user.age || '',
        password: '' // Don't pre-fill password
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setStatus({ type: '', message: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const payload = {
        fullName: formData.fullName,
        address: formData.address,
        age: formData.age ? parseInt(formData.age) : null,
        password: formData.password || null
      };

      const response = await updateProfile(payload);
      
      // Update local storage/context if name changed (optional, implies re-login or context update)
      // handling context update is complex without a method, but for now we show success
      setStatus({ type: 'success', message: 'Profile updated successfully!' });
      refreshUser();
      
      // Clear password field
      setFormData(prev => ({ ...prev, password: '' }));
      
    } catch (error) {
       setStatus({ 
        type: 'error', 
        message: error.response?.data?.message || 'Failed to update profile.' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
       <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Profile Settings</h1>
            <p className="text-slate-500 dark:text-slate-400">Update your personal information and security settings.</p>
       </div>

       <Card className="dark:bg-slate-900 dark:border-slate-800">
         <CardHeader>
           <CardTitle className="dark:text-white">Personal Details</CardTitle>
           <CardDescription className="dark:text-slate-400">Manage your name, address, and other personal details.</CardDescription>
         </CardHeader>
         <CardContent>
            {status.message && (
                <div className={`p-4 rounded-xl mb-6 font-medium ${
                    status.type === 'error' 
                    ? 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400' 
                    : 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400'
                }`}>
                    {status.message}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                        <User className="w-4 h-4" /> Full Name
                    </label>
                    <Input 
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="dark:bg-slate-800 dark:border-slate-700"
                        placeholder="John Doe"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                            <MapPin className="w-4 h-4" /> Address
                        </label>
                        <Input 
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="dark:bg-slate-800 dark:border-slate-700"
                            placeholder="123 FinTech Blvd"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                            <Calendar className="w-4 h-4" /> Age
                        </label>
                        <Input 
                            type="number"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            className="dark:bg-slate-800 dark:border-slate-700"
                            placeholder="25"
                        />
                    </div>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                    <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                        <Lock className="w-4 h-4 text-blue-500" /> Security
                    </h4>
                    <div className="space-y-2">
                         <label className="text-sm font-medium text-slate-700 dark:text-slate-300">New Password</label>
                         <Input 
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="dark:bg-slate-800 dark:border-slate-700"
                            placeholder="Leave blank to keep current password"
                        />
                         <p className="text-xs text-slate-500">Only enter a password if you want to change it.</p>
                    </div>
                </div>

                <div className="flex justify-end pt-4">
                    <Button type="submit" disabled={loading} className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-900/20">
                        {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                        Save Changes
                    </Button>
                </div>
            </form>
         </CardContent>
       </Card>
    </div>
  );
};

export default Profile;
