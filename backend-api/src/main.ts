import express, { Express, Request, Response, NextFunction } from 'express';
import { config } from './config';

// Import routes
import authRoutes from './modules/auth/auth.routes';
import userRoutes from './modules/users/users.routes';
import servicesRoutes from './modules/services/services.routes';
import reservationsRoutes from './modules/reservations/reservations.routes';
import transactionRoutes from './modules/transactions/transactions.routes';

const app: Express = express();

// Middleware
app.use(express.json());

// CORS middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  next();
});

// Health check route
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/reservations', reservationsRoutes);
app.use('/api/transactions', transactionRoutes);

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
const port = config.port;
app.listen(port, () => {
  console.log(`✅ Server running on http://localhost:${port}`);
  console.log(`Environment: ${config.nodeEnv}`);
});

export default app;
