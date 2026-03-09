'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { servicesAPI } from '@/lib/api';
import { ServiceForm } from '@/components/ServiceForm';

export default function CreateServicePage() {
  const { user } = useAuth();
  const router = useRouter();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    if (user.role !== 'SERVICE_PROVIDER') {
      router.push('/services');
      return;
    }
  }, [user, router]);

  const handleCreateService = async (data: any) => {
    try {
      setIsLoading(true);
      await servicesAPI.create(data);
      router.push('/my-services');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to create service');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  if (!user || user.role !== 'SERVICE_PROVIDER') return null;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Create New Service</h1>
        <p className="text-gray-600">Add a new service to your portfolio</p>
      </div>

      {error && <div className="bg-red-100 text-red-700 p-4 rounded mb-6">{error}</div>}

      <ServiceForm onSubmit={handleCreateService} isLoading={isLoading} />
    </div>
  );
}
