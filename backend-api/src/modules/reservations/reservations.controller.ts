import { Request, Response } from 'express';
import prisma from '../../database/prisma';

export class ReservationController {
  async create(req: Request, res: Response) {
    try {
      const clientId = req.user?.userId;
      const { serviceId } = req.body;

      if (!clientId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      if (!serviceId) {
        return res.status(400).json({ error: 'Service ID is required' });
      }

      // Get service details
      const service = await prisma.service.findUnique({
        where: { id: serviceId },
      });

      if (!service) {
        return res.status(404).json({ error: 'Service not found' });
      }

      // Get client details
      const client = await prisma.user.findUnique({
        where: { id: clientId },
      });

      if (!client) {
        return res.status(404).json({ error: 'Client not found' });
      }

      // Check if client has sufficient balance
      if (client.balance < service.price) {
        return res.status(400).json({
          error: 'Insufficient balance',
          requiredBalance: service.price,
          currentBalance: client.balance,
        });
      }

      // Use database transaction to ensure atomicity
      const result = await prisma.$transaction(async (tx: any) => {
        // Create reservation
        const reservation = await tx.reservation.create({
          data: {
            serviceId,
            clientId,
            providerId: service.providerId,
            price: service.price,
            status: 'PENDING',
          },
        });

        // Deduct balance from client
        await tx.user.update({
          where: { id: clientId },
          data: {
            balance: {
              decrement: service.price,
            },
          },
        });

        // Add balance to provider
        await tx.user.update({
          where: { id: service.providerId },
          data: {
            balance: {
              increment: service.price,
            },
          },
        });

        // Create transaction record
        const transaction = await tx.transaction.create({
          data: {
            clientId,
            providerId: service.providerId,
            serviceId,
            reservationId: reservation.id,
            amount: service.price,
            description: `Booking for service: ${service.title}`,
          },
        });

        return { reservation, transaction };
      });

      return res.status(201).json({
        message: 'Reservation created successfully',
        data: result.reservation,
      });
    } catch (error) {
      console.error('Create reservation error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const userId = req.user?.userId;
      const { id } = req.params;

      if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      // Get reservation
      const reservation = await prisma.reservation.findUnique({
        where: { id },
      });

      if (!reservation) {
        return res.status(404).json({ error: 'Reservation not found' });
      }

      // Check if user is client or provider
      if (reservation.clientId !== userId && reservation.providerId !== userId) {
        return res.status(403).json({ error: 'Forbidden' });
      }

      // Only allow cancellation of pending reservations
      if (reservation.status !== 'PENDING') {
        return res.status(400).json({
          error: 'Can only cancel pending reservations',
        });
      }

      // Use database transaction to ensure atomicity
      const result = await prisma.$transaction(async (tx: any) => {
        // Update reservation status to cancelled
        const updatedReservation = await tx.reservation.update({
          where: { id },
          data: { status: 'CANCELLED' },
        });

        // Refund client
        await tx.user.update({
          where: { id: reservation.clientId },
          data: {
            balance: {
              increment: reservation.price,
            },
          },
        });

        // Deduct from provider
        await tx.user.update({
          where: { id: reservation.providerId },
          data: {
            balance: {
              decrement: reservation.price,
            },
          },
        });

        return updatedReservation;
      });

      return res.json({
        message: 'Reservation cancelled successfully',
        data: result,
      });
    } catch (error) {
      console.error('Delete reservation error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getHistory(req: Request, res: Response) {
    try {
      const userId = req.user?.userId;

      if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      // Get user to determine role
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { role: true },
      });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      let reservations;

      if (user.role === 'CLIENT') {
        // Get reservations where user is client
        reservations = await prisma.reservation.findMany({
          where: { clientId: userId },
          include: {
            service: {
              select: { title: true, description: true, price: true },
            },
            client: {
              select: { name: true },
            },
            provider: {
              select: { name: true },
            },
          },
          orderBy: { createdAt: 'desc' },
        });
      } else {
        // Get reservations where user is provider
        reservations = await prisma.reservation.findMany({
          where: { providerId: userId },
          include: {
            service: {
              select: { title: true, description: true, price: true },
            },
            client: {
              select: { name: true },
            },
            provider: {
              select: { name: true },
            },
          },
          orderBy: { createdAt: 'desc' },
        });
      }

      return res.json(reservations);
    } catch (error) {
      console.error('Get reservation history error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const reservations = await prisma.reservation.findMany({
        include: {
          service: {
            select: { title: true, description: true, price: true },
          },
          client: {
            select: { name: true },
          },
          provider: {
            select: { name: true },
          },
        },
        orderBy: { createdAt: 'desc' },
      });

      return res.json(reservations);
    } catch (error) {
      console.error('Get all reservations error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}
