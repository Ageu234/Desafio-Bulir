import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import prisma from '../../database/prisma';
import { createToken } from '../../utils/jwt';
import { AppError } from '../../utils/errors';

export class AuthController {
  async register(req: Request, res: Response) {
    try {
      const { name, nif, email, password, role } = req.body;

      // Validate input
      if (!name || !nif || !email || !password || !role) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      if (!['CLIENT', 'SERVICE_PROVIDER'].includes(role)) {
        return res.status(400).json({ error: 'Invalid role' });
      }

      // Check if user already exists
      const existingUser = await prisma.user.findFirst({
        where: {
          OR: [{ email }, { nif }],
        },
      });

      if (existingUser) {
        return res.status(409).json({ error: 'Email or NIF already registered' });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create user
      const user = await prisma.user.create({
        data: {
          name,
          nif,
          email,
          password: hashedPassword,
          role,
          balance: role === 'SERVICE_PROVIDER' ? 0 : 1000, // Initial balance for clients
        },
      });

      // Create token
      const token = createToken({ userId: user.id, role: user.role });

      return res.status(201).json({
        message: 'User registered successfully',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        token,
      });
    } catch (error) {
      console.error('Register error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, nif, password } = req.body;

      // Validate input
      if ((!email && !nif) || !password) {
        return res.status(400).json({ error: 'Email/NIF and password are required' });
      }

      // Find user
      const user = await prisma.user.findFirst({
        where: email
          ? { email }
          : { nif },
      });

      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Verify password
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Create token
      const token = createToken({ userId: user.id, role: user.role });

      return res.json({
        message: 'Login successful',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          balance: user.balance,
        },
        token,
      });
    } catch (error) {
      console.error('Login error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}
