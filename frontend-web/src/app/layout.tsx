'use client';

import React from 'react';
import { AuthProvider } from '@/context/AuthContext';
import { Navbar } from '@/components/Navbar';
import '@/app/globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <AuthProvider>
          <Navbar />
          <main className="container mx-auto py-8">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
