'use client';

import React from 'react';

interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  provider: {
    name: string;
    email: string;
  };
}

interface ServiceCardProps {
  service: Service;
  onBook?: (serviceId: string) => void;
  onEdit?: (service: Service) => void;
  onDelete?: (id: string) => void;
  showActions?: boolean;
  isProvider?: boolean;
}

export function ServiceCard({
  service,
  onBook,
  onEdit,
  onDelete,
  showActions = false,
  isProvider = false,
}: ServiceCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition">
      <h3 className="text-xl font-bold text-gray-800 mb-2">{service.title}</h3>
      <p className="text-gray-600 mb-4">{service.description}</p>

      <div className="mb-4">
        <p className="text-gray-500 text-sm">
          <strong>Provider:</strong> {service.provider.name}
        </p>
        <p className="text-gray-500 text-sm">
          <strong>Email:</strong> {service.provider.email}
        </p>
      </div>

      <div className="mb-4">
        <p className="text-2xl font-bold text-green-600">R${service.price.toFixed(2)}</p>
      </div>

      {showActions && (
        <div className="flex gap-2">
          {!isProvider && onBook && (
            <button
              onClick={() => onBook(service.id)}
              className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 font-semibold"
            >
              Book Now
            </button>
          )}

          {isProvider && onEdit && (
            <button
              onClick={() => onEdit(service)}
              className="flex-1 bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600 font-semibold"
            >
              Edit
            </button>
          )}

          {isProvider && onDelete && (
            <button
              onClick={() => onDelete(service.id)}
              className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-700 font-semibold"
            >
              Delete
            </button>
          )}
        </div>
      )}
    </div>
  );
}
