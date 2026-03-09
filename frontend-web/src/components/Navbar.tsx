'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          🎯 Service Booking
        </Link>

        <div className="flex gap-4 items-center">
          {user ? (
            <>
              <span className="text-sm">Welcome, {user.name}</span>
              <span className="text-sm">Balance: R${user.balance.toFixed(2)}</span>

              <div className="flex gap-2">
                {user.role === 'SERVICE_PROVIDER' && (
                  <Link href="/my-services" className="bg-green-500 px-3 py-1 rounded hover:bg-green-700">
                    My Services
                  </Link>
                )}

                <Link href="/services" className="bg-blue-500 px-3 py-1 rounded hover:bg-blue-700">
                  Services
                </Link>

                <Link href="/history" className="bg-purple-500 px-3 py-1 rounded hover:bg-purple-700">
                  History
                </Link>

                <button
                  onClick={handleLogout}
                  className="bg-red-500 px-3 py-1 rounded hover:bg-red-700"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <div className="flex gap-2">
              <Link href="/login" className="bg-white text-blue-600 px-4 py-2 rounded font-bold">
                Login
              </Link>
              <Link href="/register" className="bg-green-500 px-4 py-2 rounded hover:bg-green-700">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
