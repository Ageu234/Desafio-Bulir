'use client';

import React, { useState } from 'react';

interface ServiceFormProps {
  onSubmit: (data: { title: string; description: string; price: number }) => Promise<void>;
  isLoading?: boolean;
  initialData?: {
    title: string;
    description: string;
    price: number;
  };
}

export function ServiceForm({ onSubmit, isLoading = false, initialData }: ServiceFormProps) {
  const [formData, setFormData] = useState(
    initialData || {
      title: '',
      description: '',
      price: 0,
    }
  );
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.title || !formData.description || !formData.price) {
      setError('All fields are required');
      return;
    }

    if (formData.price <= 0) {
      setError('Price must be greater than 0');
      return;
    }

    try {
      await onSubmit(formData);
      if (!initialData) {
        setFormData({ title: '', description: '', price: 0 });
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'An error occurred');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
      {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Service Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="e.g., House Cleaning"
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Describe your service..."
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Price (R$)</label>
        <input
          type="number"
          step="0.01"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
          placeholder="0.00"
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 disabled:opacity-50"
      >
        {isLoading ? 'Saving...' : initialData ? 'Update Service' : 'Create Service'}
      </button>
    </form>
  );
}
