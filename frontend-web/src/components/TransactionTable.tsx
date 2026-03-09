'use client';

import React from 'react';

interface Transaction {
  id: string;
  amount: number;
  description: string;
  client: { name: string };
  provider: { name: string };
  service: { title: string };
  createdAt: string;
}

interface TransactionTableProps {
  transactions: Transaction[];
}

export function TransactionTable({ transactions }: TransactionTableProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-4 text-left font-semibold">Service</th>
            <th className="p-4 text-left font-semibold">Client</th>
            <th className="p-4 text-left font-semibold">Provider</th>
            <th className="p-4 text-left font-semibold">Amount</th>
            <th className="p-4 text-left font-semibold">Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length === 0 ? (
            <tr>
              <td colSpan={5} className="p-4 text-center text-gray-500">
                No transactions yet
              </td>
            </tr>
          ) : (
            transactions.map((tx) => (
              <tr key={tx.id} className="border-b hover:bg-gray-50">
                <td className="p-4">{tx.service.title}</td>
                <td className="p-4">{tx.client.name}</td>
                <td className="p-4">{tx.provider.name}</td>
                <td className="p-4 font-bold text-green-600">R${tx.amount.toFixed(2)}</td>
                <td className="p-4 text-gray-500 text-sm">
                  {new Date(tx.createdAt).toLocaleDateString('pt-BR')}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
