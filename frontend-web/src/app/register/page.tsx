'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    nif: '',
    email: '',
    password: '',
    role: 'CLIENT' as 'CLIENT' | 'SERVICE_PROVIDER',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { register } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!formData.name || !formData.nif || !formData.email || !formData.password) {
      setError('All fields are required');
      setIsLoading(false);
      return;
    }

    try {
      await register(formData);
      router.push('/');
    } catch (err: any) {
      setError(err.response?.data?.error || 'An error occurred during registration');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Register</h1>

        {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Full Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Your name"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">NIF</label>
            <input
              type="text"
              value={formData.nif}
              onChange={(e) => setFormData({ ...formData, nif: e.target.value })}
              placeholder="123.456.789-00"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="your@email.com"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="At least 6 characters"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-3">Account Type</label>
            <div className="space-y-2">
              <label className="flex items-center p-3 border border-gray-300 rounded cursor-pointer hover:bg-blue-50">
                <input
                  type="radio"
                  value="CLIENT"
                  checked={formData.role === 'CLIENT'}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value as 'CLIENT' | 'SERVICE_PROVIDER' })}
                  className="mr-3"
                />
                <div>
                  <p className="font-semibold">Client</p>
                  <p className="text-sm text-gray-600">Browse and book services</p>
                </div>
              </label>

              <label className="flex items-center p-3 border border-gray-300 rounded cursor-pointer hover:bg-blue-50">
                <input
                  type="radio"
                  value="SERVICE_PROVIDER"
                  checked={formData.role === 'SERVICE_PROVIDER'}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value as 'CLIENT' | 'SERVICE_PROVIDER' })}
                  className="mr-3"
                />
                <div>
                  <p className="font-semibold">Service Provider</p>
                  <p className="text-sm text-gray-600">Offer services to clients</p>
                </div>
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 disabled:opacity-50"
          >
            {isLoading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-600 font-semibold hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
