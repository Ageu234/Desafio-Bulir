'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { servicesAPI } from '@/lib/api';
import { ServiceCard } from '@/components/ServiceCard';
import { ServiceForm } from '@/components/ServiceForm';
import Link from 'next/link';

export default function MyServicesPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [services, setServices] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingService, setEditingService] = useState<any>(null);
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    if (user.role !== 'SERVICE_PROVIDER') {
      router.push('/services');
      return;
    }

    loadServices();
  }, [user, router]);

  const loadServices = async () => {
    try {
      setIsLoading(true);
      const response = await servicesAPI.getMyServices();
      setServices(response.data);
      setError('');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to load services');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateService = async (data: any) => {
    try {
      if (editingService) {
        await servicesAPI.update(editingService.id, data);
        setSuccess('Service updated successfully!');
      } else {
        await servicesAPI.create(data);
        setSuccess('Service created successfully!');
      }
      setShowForm(false);
      setEditingService(null);
      await loadServices();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      throw err;
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return;

    try {
      await servicesAPI.delete(id);
      setSuccess('Service deleted successfully!');
      await loadServices();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to delete service');
    }
  };

  const handleEdit = (service: any) => {
    setEditingService(service);
    setShowForm(true);
  };

  if (!user || user.role !== 'SERVICE_PROVIDER') return null;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">My Services</h1>
          <p className="text-gray-600">Manage your offered services</p>
        </div>
        <button
          onClick={() => {
            setEditingService(null);
            setShowForm(!showForm);
          }}
          className="bg-green-600 text-white px-6 py-2 rounded font-semibold hover:bg-green-700"
        >
          {showForm ? 'Cancel' : '+ Create Service'}
        </button>
      </div>

      {error && <div className="bg-red-100 text-red-700 p-4 rounded mb-6">{error}</div>}
      {success && <div className="bg-green-100 text-green-700 p-4 rounded mb-6">{success}</div>}

      {showForm && (
        <div className="mb-8">
          <ServiceForm
            onSubmit={handleCreateService}
            initialData={editingService}
          />
        </div>
      )}

      {isLoading ? (
        <div className="text-center text-gray-600">Loading your services...</div>
      ) : services.length === 0 ? (
        <div className="text-center text-gray-600">
          <p className="mb-4">You haven't created any services yet</p>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-6 py-2 rounded font-semibold hover:bg-blue-700"
          >
            Create Your First Service
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onEdit={handleEdit}
              onDelete={handleDelete}
              showActions={true}
              isProvider={true}
            />
          ))}
        </div>
      )}
    </div>
  );
}
