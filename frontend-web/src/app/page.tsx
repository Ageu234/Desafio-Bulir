'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="text-center py-12">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Service Booking Platform</h1>
      <p className="text-xl text-gray-600 mb-8">
        Connect clients with service providers in a secure and efficient way
      </p>

      {user ? (
        <div className="bg-blue-50 p-8 rounded-lg max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Hello, {user.name}! 👋</h2>
          <p className="text-gray-700 mb-6">
            {user.role === 'CLIENT'
              ? 'Browse and book services from professional providers'
              : 'Create and manage your services to reach clients'}
          </p>

          <div className="flex gap-4 justify-center">
            {user.role === 'CLIENT' ? (
              <>
                <Link
                  href="/services"
                  className="bg-blue-600 text-white px-6 py-3 rounded font-semibold hover:bg-blue-700"
                >
                  Browse Services
                </Link>
                <Link
                  href="/history"
                  className="bg-purple-600 text-white px-6 py-3 rounded font-semibold hover:bg-purple-700"
                >
                  My Bookings
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/my-services"
                  className="bg-green-600 text-white px-6 py-3 rounded font-semibold hover:bg-green-700"
                >
                  My Services
                </Link>
                <Link
                  href="/create-service"
                  className="bg-blue-600 text-white px-6 py-3 rounded font-semibold hover:bg-blue-700"
                >
                  Create Service
                </Link>
              </>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-blue-50 p-8 rounded-lg max-w-2xl mx-auto">
          <p className="text-gray-700 mb-6">Sign in or create an account to get started</p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/login"
              className="bg-blue-600 text-white px-6 py-3 rounded font-semibold hover:bg-blue-700"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="bg-green-600 text-white px-6 py-3 rounded font-semibold hover:bg-green-700"
            >
              Register
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
