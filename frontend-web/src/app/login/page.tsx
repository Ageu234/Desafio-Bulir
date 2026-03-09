'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

export default function LoginPage() {
  const [loginType, setLoginType] = useState<'email' | 'nif'>('email');
  const [email, setEmail] = useState('');
  const [nif, setNif] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { login, loginByNif } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (loginType === 'email') {
        if (!email || !password) {
          setError('Email and password are required');
          setIsLoading(false);
          return;
        }
        await login(email, password);
      } else {
        if (!nif || !password) {
          setError('NIF and password are required');
          setIsLoading(false);
          return;
        }
        await loginByNif(nif, password);
      }
      router.push('/');
    } catch (err: any) {
      setError(err.response?.data?.error || 'An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Login</h1>

        {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-3">Login Method</label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="email"
                  checked={loginType === 'email'}
                  onChange={(e) => setLoginType(e.target.value as 'email' | 'nif')}
                  className="mr-2"
                />
                <span>Email</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="nif"
                  checked={loginType === 'nif'}
                  onChange={(e) => setLoginType(e.target.value as 'email' | 'nif')}
                  className="mr-2"
                />
                <span>NIF</span>
              </label>
            </div>
          </div>

          {loginType === 'email' ? (
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e: { target: { value: any; }; }) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          ) : (
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">NIF</label>
              <input
                type="text"
                value={nif}
                onChange={(e) => setNif(e.target.value)}
                placeholder="123.456.789-00"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          )}

          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 disabled:opacity-50"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Don't have an account?{' '}
          <Link href="/register" className="text-blue-600 font-semibold hover:underline">
            Register here
          </Link>
        </p>

        <div className="mt-6 p-4 bg-blue-50 rounded text-sm text-gray-700">
          <p className="font-semibold mb-2">Demo Credentials:</p>
          <p>Email: provider@test.com</p>
          <p>Password: 123456</p>
        </div>
      </div>
    </div>
  );
}
