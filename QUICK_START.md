# 🚀 QUICK START GUIDE

## One-Line Setup for Each Application

### Backend API
```bash
cd backend-api && npm install && cp .env.example .env && npm run prisma:migrate && npm run prisma:seed && npm run dev
```

Backend runs on: **http://localhost:3001**

### Web Frontend
```bash
cd frontend-web && npm install && cp .env.example .env.local && npm run dev
```

Web runs on: **http://localhost:3000**

### Mobile App
```bash
cd mobile-app && npm install && cp .env.example .env && npm start
```

Mobile: Scan QR code with **Expo Go app**

---

## Demo Login Credentials

**Service Provider:**
```
Email: provider@test.com
Password: 123456
```

**Client:**
```
Email: client@test.com
Password: 123456
```

---

## Environment Variables

### Backend (`.env`)
```env
DATABASE_URL=postgresql://user:password@localhost:5432/service_booking_db
JWT_SECRET=your_super_secret_jwt_key_change_in_production
PORT=3001
NODE_ENV=development
```

### Web Frontend (`.env.local`)
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

### Mobile App (`.env`)
```env
EXPO_PUBLIC_API_URL=http://localhost:3001/api
```

---

## Common Commands

### Backend
```bash
cd backend-api
npm run dev              # Start development server
npm run build           # Build for production
npm start               # Start production server
npm run prisma:migrate  # Run database migrations
npm run prisma:seed     # Seed database with sample data
npm run db:reset        # Reset database completely
```

### Web Frontend
```bash
cd frontend-web
npm run dev             # Start development server
npm run build          # Build for production
npm start              # Start production server
npm run lint           # Run linter
```

### Mobile App
```bash
cd mobile-app
npm start              # Start Expo development server
npm run android        # Run on Android emulator
npm run ios           # Run on iOS simulator
npm run web           # Run on web browser
```

---

## Database Setup

### Prerequisites
- PostgreSQL 12+ installed and running
- Database created (or let Prisma create it)

### First Time Setup
```bash
cd backend-api
npm run prisma:migrate  # Creates tables
npm run prisma:seed     # Adds sample data
```

### Reset Database
```bash
cd backend-api
npm run db:reset  # Drops all tables, recreates, and seeds
```

---

## API Endpoints

### Authentication
- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Login

### Users
- `GET /api/users/profile` - Get user profile
- `GET /api/users/balance` - Get balance
- `GET /api/users` - List all users

### Services
- `GET /api/services` - Get all services
- `GET /api/services/:id` - Get service details
- `POST /api/services` - Create service (provider only)
- `PUT /api/services/:id` - Update service (provider only)
- `DELETE /api/services/:id` - Delete service (provider only)
- `GET /api/services/provider/my-services` - Get my services

### Reservations
- `GET /api/reservations` - Get all reservations
- `POST /api/reservations` - Create reservation (client only)
- `DELETE /api/reservations/:id` - Cancel reservation
- `GET /api/reservations/history/my-history` - Get my reservations

### Transactions
- `GET /api/transactions` - Get all transactions
- `GET /api/transactions/user/my-transactions` - Get my transactions
- `GET /api/transactions/:id` - Get transaction details

---

## Web Pages

| Page | Path | Role | Description |
|------|------|------|-------------|
| Home | `/` | Both | Dashboard with quick links |
| Login | `/login` | Both | User authentication |
| Register | `/register` | Both | Account creation |
| Services | `/services` | Both | Browse all services |
| My Services | `/my-services` | Provider | Manage created services |
| Create Service | `/create-service` | Provider | Create new service |
| History | `/history` | Both | View transactions |

---

## Mobile Screens

| Screen | Role | Description |
|--------|------|-------------|
| Login | Both | Email/NIF login |
| Register | Both | Account creation |
| Home | Both | Dashboard |
| Services | Both | Browse services |
| My Services | Provider | Manage services |
| Create Service | Provider | Create new service |
| History | Both | Transaction history |

---

## Project Structure

```
Desafio Bulir/
├── backend-api/        (Node.js API)
├── frontend-web/       (Next.js web app)
├── mobile-app/         (React Native app)
├── README.md           (Main documentation)
├── PROJECT_SUMMARY.md  (Detailed summary)
└── QUICK_START.md      (This file)
```

---

## Troubleshooting

### Backend won't start
- PostgreSQL not running: `postgres -D /usr/local/var/postgres`
- Database URL wrong: Check DATABASE_URL in .env
- Migration failed: Run `npm run prisma:migrate`

### Web can't connect to API
- Backend not running: Run `npm run dev` in backend-api
- Wrong API URL: Check NEXT_PUBLIC_API_URL
- Clear cache: Ctrl+Shift+Delete

### Mobile can't connect to API
- Use machine IP instead of localhost
- Example: `EXPO_PUBLIC_API_URL=http://192.168.1.100:3001/api`
- Same network: Device and PC must be on same WiFi

### Database issues
- Check PostgreSQL is running
- Delete `.env` and reconfigure
- Run `npm run db:reset`

---

## Production Deployment

### Backend
```bash
npm run build
npm start
```

### Web Frontend
```bash
npm run build
npm start
```

### Mobile App
```bash
eas login
eas build --platform android
# or
eas build --platform ios
```

---

## Default Ports

| Service | Port | URL |
|---------|------|-----|
| Backend API | 3001 | http://localhost:3001/api |
| Web Frontend | 3000 | http://localhost:3000 |
| PostgreSQL | 5432 | localhost:5432 |

---

## Tech Stack at a Glance

**Backend:** Node.js + Express + PostgreSQL + Prisma + JWT  
**Web:** Next.js + React + TypeScript + TailwindCSS  
**Mobile:** React Native + Expo + TypeScript  

---

## File Locations

**Database Schema:** `backend-api/prisma/schema.prisma`  
**API Handlers:** `backend-api/src/modules/`  
**Web Pages:** `frontend-web/src/app/`  
**Mobile Screens:** `mobile-app/src/screens/`  

---

## Documentation Links

- Main README: `README.md`
- Backend Docs: `backend-api/README.md`
- Web Docs: `frontend-web/README.md`
- Mobile Docs: `mobile-app/README.md`
- Project Summary: `PROJECT_SUMMARY.md`

---

## Sample Database Query (Prisma)

```typescript
// Get all services with provider details
const services = await prisma.service.findMany({
  include: {
    provider: {
      select: { name: true, email: true }
    }
  }
});
```

---

## Ready to Go! 🚀

Everything is set up and ready to use. Start with the backend, then web, then mobile.

Questions? Check the detailed READMEs in each directory.

**Happy Coding!** 💻
