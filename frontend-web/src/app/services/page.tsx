'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { servicesAPI, reservationsAPI, usersAPI } from '@/lib/api';
import { ServiceCard } from '@/components/ServiceCard';
import { useRouter } from 'next/navigation';

export default function ServicesPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [services, setServices] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [bookingError, setBookingError] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState('');

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }
    loadServices();
  }, [user, router]);

  const loadServices = async () => {
    try {
      setIsLoading(true);
      const response = await servicesAPI.getAll();
      setServices(response.data);
      setError('');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to load services');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBook = async (serviceId: string) => {
    if (user?.role !== 'CLIENT') {
      setBookingError('Only clients can book services');
      return;
    }

    try {
      setBookingError('');
      setBookingSuccess('');
      await reservationsAPI.create({ serviceId });
      setBookingSuccess('Service booked successfully!');
      await usersAPI.getBalance(); // Refresh balance
      setTimeout(() => setBookingSuccess(''), 3000);
    } catch (err: any) {
      setBookingError(
        err.response?.data?.error ||
          err.response?.data?.message ||
          'Failed to book service'
      );
    }
  };

  if (!user) return null;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Available Services</h1>
        <p className="text-gray-600">Browse and book services from professional providers</p>
      </div>

      {error && <div className="bg-red-100 text-red-700 p-4 rounded mb-6">{error}</div>}
      {bookingError && <div className="bg-red-100 text-red-700 p-4 rounded mb-6">{bookingError}</div>}
      {bookingSuccess && <div className="bg-green-100 text-green-700 p-4 rounded mb-6">{bookingSuccess}</div>}

      {isLoading ? (
        <div className="text-center text-gray-600">Loading services...</div>
      ) : services.length === 0 ? (
        <div className="text-center text-gray-600">No services available</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onBook={user.role === 'CLIENT' ? handleBook : undefined}
              showActions={user.role === 'CLIENT'}
            />
          ))}
        </div>
      )}
    </div>
  );
}
