import { Request, Response } from 'express';
import prisma from '../../database/prisma';

export class UserController {
  async getProfile(req: Request, res: Response) {
    try {
      const userId = req.user?.userId;

      if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          name: true,
          email: true,
          nif: true,
          role: true,
          balance: true,
          createdAt: true,
        },
      });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      return res.json(user);
    } catch (error) {
      console.error('Get profile error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getBalance(req: Request, res: Response) {
    try {
      const userId = req.user?.userId;

      if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { balance: true },
      });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      return res.json({ balance: user.balance });
    } catch (error) {
      console.error('Get balance error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          balance: true,
          createdAt: true,
        },
      });

      return res.json(users);
    } catch (error) {
      console.error('Get all users error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}
