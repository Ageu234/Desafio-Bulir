import { Request, Response } from 'express';
import prisma from '../../database/prisma';

export class TransactionController {
  async getAll(req: Request, res: Response) {
    try {
      const transactions = await prisma.transaction.findMany({
        include: {
          client: {
            select: { name: true, email: true },
          },
          provider: {
            select: { name: true, email: true },
          },
          service: {
            select: { title: true },
          },
        },
        orderBy: { createdAt: 'desc' },
      });

      return res.json(transactions);
    } catch (error) {
      console.error('Get all transactions error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getByUser(req: Request, res: Response) {
    try {
      const userId = req.user?.userId;

      if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const transactions = await prisma.transaction.findMany({
        where: {
          OR: [{ clientId: userId }, { providerId: userId }],
        },
        include: {
          client: {
            select: { name: true, email: true },
          },
          provider: {
            select: { name: true, email: true },
          },
          service: {
            select: { title: true },
          },
        },
        orderBy: { createdAt: 'desc' },
      });

      return res.json(transactions);
    } catch (error) {
      console.error('Get transactions by user error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const transaction = await prisma.transaction.findUnique({
        where: { id },
        include: {
          client: {
            select: { name: true, email: true },
          },
          provider: {
            select: { name: true, email: true },
          },
          service: {
            select: { title: true },
          },
        },
      });

      if (!transaction) {
        return res.status(404).json({ error: 'Transaction not found' });
      }

      return res.json(transaction);
    } catch (error) {
      console.error('Get transaction by id error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}
