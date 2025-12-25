import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register as registerApi } from '../api/authApi';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    fullName: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerApi(formData);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-sky-600">Register</h2>
        {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-400 rounded bg-gray-50 text-gray-900 focus:outline-none focus:bg-white focus:border-sky-500 focus:ring-1 focus:ring-sky-500 placeholder-gray-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-400 rounded bg-gray-50 text-gray-900 focus:outline-none focus:bg-white focus:border-sky-500 focus:ring-1 focus:ring-sky-500 placeholder-gray-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-400 rounded bg-gray-50 text-gray-900 focus:outline-none focus:bg-white focus:border-sky-500 focus:ring-1 focus:ring-sky-500 placeholder-gray-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-400 rounded bg-gray-50 text-gray-900 focus:outline-none focus:bg-white focus:border-sky-500 focus:ring-1 focus:ring-sky-500 placeholder-gray-500"
              required
            />
          </div>
          <button type="submit" className="w-full bg-sky-500 text-white py-2 rounded hover:bg-sky-600">
            Register
          </button>
        </form>
         <div className="mt-4 text-center">
          <p className="text-gray-600">Already have an account? <Link to="/login" className="text-sky-500 hover:underline">Login</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Register;
