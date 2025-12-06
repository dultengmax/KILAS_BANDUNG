"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { loginUser } from '@/lib/action/auth';

const page = () => {
  const [status, setStatus] = React.useState<'idle' | 'success' | 'error'>("idle");
  const [message, setMessage] = React.useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      const result = await loginUser(formData);
      // Asumsikan loginUser mengembalikan sesuatu jika sukses, null/undefined jika gagal
      if (result && result.success === true) {
        setStatus('success');
        setMessage('Login berhasil!');
      } else {
        setStatus('error');
        setMessage( `${result.message}`);
      }
    } catch (err) {
      setStatus('error');
      setMessage('Terjadi kesalahan saat login.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-600 to-indigo-900">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md"
      >
        <motion.h2
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-3xl font-bold text-center text-indigo-700 mb-6"
        >
          Login to Your Account
        </motion.h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your password"
              required
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={status === 'idle' ? false : status === 'success' ? true : status === 'error' ? false : true}
            className={`w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${status === 'idle' ? '' : status === 'success' ? 'bg-green-500 cursor-not-allowed' : status === 'error' ? '' : 'opacity-60 cursor-not-allowed'}`}
          >
            {status === 'idle' && 'Login'}
            {status !== 'idle' && status !== 'success' && (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                </svg>
                Loading...
              </span>
            )}
            {status === 'success' && 'Success'}
          </motion.button>
        </form>
        {status === 'success' && (
          <div className="mt-4 text-green-600 text-center font-semibold">{message}</div>
        )}
        {status === 'error' && (
          <div className="mt-4 text-red-600 text-center font-semibold">{message}</div>
        )}
        <div className="mt-6 text-center">
          <a href="#" className="text-sm text-indigo-600 hover:underline">Forgot password?</a>
        </div>
      </motion.div>
    </div>
  );
};

export default page;