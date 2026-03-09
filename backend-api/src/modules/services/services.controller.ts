import { Request, Response } from 'express';
import prisma from '../../database/prisma';

export class ServiceController {
  async create(req: Request, res: Response) {
    try {
      const providerId = req.user?.userId;
      const { title, description, price } = req.body;

      if (!providerId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      if (!title || !description || price === undefined) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      if (typeof price !== 'number' || price <= 0) {
        return res.status(400).json({ error: 'Price must be a positive number' });
      }

      const service = await prisma.service.create({
        data: {
          title,
          description,
          price,
          providerId,
        },
        include: {
          provider: {
            select: { id: true, name: true, email: true },
          },
        },
      });

      return res.status(201).json({
        message: 'Service created successfully',
        data: service,
      });
    } catch (error) {
      console.error('Create service error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const services = await prisma.service.findMany({
        include: {
          provider: {
            select: { id: true, name: true, email: true },
          },
        },
        orderBy: { createdAt: 'desc' },
      });

      return res.json(services);
    } catch (error) {
      console.error('Get all services error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const service = await prisma.service.findUnique({
        where: { id },
        include: {
          provider: {
            select: { id: true, name: true, email: true },
          },
        },
      });

      if (!service) {
        return res.status(404).json({ error: 'Service not found' });
      }

      return res.json(service);
    } catch (error) {
      console.error('Get service by id error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const providerId = req.user?.userId;
      const { id } = req.params;
      const { title, description, price } = req.body;

      if (!providerId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      // Check if service exists and belongs to the provider
      const service = await prisma.service.findUnique({
        where: { id },
      });

      if (!service) {
        return res.status(404).json({ error: 'Service not found' });
      }

      if (service.providerId !== providerId) {
        return res.status(403).json({ error: 'Forbidden' });
      }

      const updatedService = await prisma.service.update({
        where: { id },
        data: {
          ...(title && { title }),
          ...(description && { description }),
          ...(price !== undefined && { price }),
        },
        include: {
          provider: {
            select: { id: true, name: true, email: true },
          },
        },
      });

      return res.json({
        message: 'Service updated successfully',
        data: updatedService,
      });
    } catch (error) {
      console.error('Update service error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const providerId = req.user?.userId;
      const { id } = req.params;

      if (!providerId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      // Check if service exists and belongs to the provider
      const service = await prisma.service.findUnique({
        where: { id },
      });

      if (!service) {
        return res.status(404).json({ error: 'Service not found' });
      }

      if (service.providerId !== providerId) {
        return res.status(403).json({ error: 'Forbidden' });
      }

      await prisma.service.delete({
        where: { id },
      });

      return res.json({ message: 'Service deleted successfully' });
    } catch (error) {
      console.error('Delete service error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getByProvider(req: Request, res: Response) {
    try {
      const providerId = req.user?.userId;

      if (!providerId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const services = await prisma.service.findMany({
        where: { providerId },
        include: {
          provider: {
            select: { id: true, name: true, email: true },
          },
        },
        orderBy: { createdAt: 'desc' },
      });

      return res.json(services);
    } catch (error) {
      console.error('Get services by provider error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}
