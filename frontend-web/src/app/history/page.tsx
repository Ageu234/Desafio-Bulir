'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { reservationsAPI, transactionsAPI } from '@/lib/api';
import { TransactionTable } from '@/components/TransactionTable';

export default function HistoryPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'reservations' | 'transactions'>('reservations');
  const [reservations, setReservations] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }
    loadData();
  }, [user, router]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const [resRes, txRes] = await Promise.all([
        reservationsAPI.getHistory(),
        transactionsAPI.getMyTransactions(),
      ]);
      setReservations(resRes.data);
      setTransactions(txRes.data);
      setError('');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to load history');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelReservation = async (id: string) => {
    if (!confirm('Are you sure you want to cancel this reservation?')) return;

    try {
      await reservationsAPI.delete(id);
      await loadData();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to cancel reservation');
    }
  };

  if (!user) return null;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">History</h1>
        <p className="text-gray-600">View your reservations and transactions</p>
      </div>

      {error && <div className="bg-red-100 text-red-700 p-4 rounded mb-6">{error}</div>}

      <div className="flex gap-4 mb-6 border-b">
        <button
          onClick={() => setActiveTab('reservations')}
          className={`py-4 px-6 font-semibold ${
            activeTab === 'reservations'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Reservations
        </button>
        <button
          onClick={() => setActiveTab('transactions')}
          className={`py-4 px-6 font-semibold ${
            activeTab === 'transactions'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Transactions
        </button>
      </div>

      {isLoading ? (
        <div className="text-center text-gray-600">Loading...</div>
      ) : activeTab === 'reservations' ? (
        <div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-4 text-left font-semibold">Service</th>
                  <th className="p-4 text-left font-semibold">Provider</th>
                  <th className="p-4 text-left font-semibold">Price</th>
                  <th className="p-4 text-left font-semibold">Status</th>
                  <th className="p-4 text-left font-semibold">Date</th>
                  <th className="p-4 text-left font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {reservations.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-4 text-center text-gray-500">
                      No reservations yet
                    </td>
                  </tr>
                ) : (
                  reservations.map((res) => (
                    <tr key={res.id} className="border-b hover:bg-gray-50">
                      <td className="p-4 font-semibold">{res.service.title}</td>
                      <td className="p-4">{res.provider.name}</td>
                      <td className="p-4 text-green-600 font-bold">R${res.price.toFixed(2)}</td>
                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded text-white text-sm font-semibold ${
                            res.status === 'PENDING'
                              ? 'bg-yellow-500'
                              : res.status === 'ACCEPTED' || res.status === 'COMPLETED'
                              ? 'bg-green-500'
                              : 'bg-red-500'
                          }`}
                        >
                          {res.status}
                        </span>
                      </td>
                      <td className="p-4 text-sm text-gray-500">
                        {new Date(res.createdAt).toLocaleDateString('pt-BR')}
                      </td>
                      <td className="p-4">
                        {res.status === 'PENDING' && (
                          <button
                            onClick={() => handleCancelReservation(res.id)}
                            className="text-red-600 hover:text-red-800 font-semibold"
                          >
                            Cancel
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <TransactionTable transactions={transactions} />
      )}
    </div>
  );
}
