# 🎯 Service Booking Platform - Complete Full-Stack Solution

A comprehensive platform for booking services between clients and service providers. Built with modern web and mobile technologies.

## 📚 Table of Contents

- [Architecture Overview](#architecture-overview)
- [What's Included](#whats-included)
- [Tech Stack](#tech-stack)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Feature Overview](#feature-overview)
- [Deployment](#deployment)

---

## 🏗️ Architecture Overview

This is a **monorepo** containing three main applications:

```
Service Booking Platform (Monorepo)
│
├── Backend API (Node.js + Express + PostgreSQL)
├── Web Frontend (Next.js + React)
└── Mobile App (React Native + Expo)
```

All applications consume the **same REST API**, ensuring consistency and data integrity.

---

## 📦 What's Included

### **Backend API** (`/backend-api`)
- RESTful API with Express.js
- PostgreSQL database with Prisma ORM
- JWT authentication
- Role-based access control
- Atomic balance transactions
- Complete CRUD operations

### **Web Application** (`/frontend-web`)
- Next.js web interface
- TailwindCSS styling
- React Context for state management
- Protected routes with authentication
- Responsive design

### **Mobile Application** (`/mobile-app`)
- React Native with Expo
- Cross-platform (iOS/Android)
- Native navigation with React Navigation
- Persistent authentication
- Optimized performance

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Runtime** | Node.js 16+ |
| **Languages** | TypeScript, JavaScript |
| **Backend** | Express.js, NestJS-like structure |
| **Database** | PostgreSQL 12+ |
| **ORM** | Prisma |
| **Web Frontend** | Next.js 14, React 18, TailwindCSS |
| **Mobile** | React Native, Expo 50 |
| **Authentication** | JWT (jsonwebtoken) |
| **Hashing** | bcrypt |
| **HTTP Client** | Axios |
| **State Management** | Context API |

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 16+ installed
- **npm** or **yarn**
- **PostgreSQL** 12+ running
- **Git** (optional)

### 1. Clone or Extract Project

```bash
cd Desafio\ Bulir
```

### 2. Setup Backend API

```bash
cd backend-api
npm install
cp .env.example .env
```

Configure `.env`:
```env
DATABASE_URL=postgresql://user:password@localhost:5432/service_booking_db
JWT_SECRET=your_super_secret_key_change_in_production
PORT=3001
NODE_ENV=development
```

Run migrations and seed:
```bash
npm run prisma:migrate
npm run prisma:seed
```

Start development server:
```bash
npm run dev
```

Server will be available at `http://localhost:3001`

### 3. Setup Web Frontend

```bash
cd ../frontend-web
npm install
cp .env.example .env.local
```

`.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

Start development:
```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

### 4. Setup Mobile App

```bash
cd ../mobile-app
npm install
cp .env.example .env
```

`.env`:
```env
EXPO_PUBLIC_API_URL=http://localhost:3001/api
```

Start Expo:
```bash
npm start
```

Scan QR code with Expo Go app or use emulator.

---

## 📁 Project Structure

```
Desafio Bulir/
│
├── backend-api/
│   ├── src/
│   │   ├── modules/
│   │   │   ├── auth/
│   │   │   ├── users/
│   │   │   ├── services/
│   │   │   ├── reservations/
│   │   │   └── transactions/
│   │   ├── middleware/
│   │   ├── database/
│   │   ├── utils/
│   │   ├── config/
│   │   └── main.ts
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── seed.ts
│   ├── package.json
│   ├── tsconfig.json
│   ├── .env.example
│   └── README.md
│
├── frontend-web/
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   ├── services/
│   │   │   ├── my-services/
│   │   │   └── history/
│   │   ├── components/
│   │   ├── context/
│   │   ├── lib/
│   │   └── globals.css
│   ├── public/
│   ├── next.config.js
│   ├── tailwind.config.ts
│   ├── package.json
│   ├── tsconfig.json
│   ├── .env.example
│   └── README.md
│
├── mobile-app/
│   ├── src/
│   │   ├── screens/
│   │   ├── context/
│   │   ├── navigation/
│   │   └── lib/
│   ├── App.tsx
│   ├── app.json
│   ├── package.json
│   ├── tsconfig.json
│   ├── .env.example
│   └── README.md
│
└── README.md (this file)
```

---

## 📚 API Documentation

### Base URL
```
http://localhost:3001/api
```

### Authentication Endpoints

#### Register
```http
POST /auth/register
Content-Type: application/json

{
  "name": "João Silva",
  "nif": "12345678901",
  "email": "user@example.com",
  "password": "123456",
  "role": "CLIENT" | "SERVICE_PROVIDER"
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "123456"
}
```

### Services Endpoints

#### Create Service (Provider role required)
```http
POST /api/services
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Service Title",
  "description": "Service description",
  "price": 100.00
}
```

#### Get All Services
```http
GET /api/services
```

#### Get My Services (Provider only)
```http
GET /api/services/provider/my-services
Authorization: Bearer {token}
```

### Reservations Endpoints

#### Create Reservation (Client role required)
```http
POST /api/reservations
Authorization: Bearer {token}
Content-Type: application/json

{
  "serviceId": "service-uuid"
}
```

#### Get Reservation History
```http
GET /api/reservations/history/my-history
Authorization: Bearer {token}
```

### Full documentation available in:
- [Backend README](./backend-api/README.md)
- [Web Frontend README](./frontend-web/README.md)
- [Mobile App README](./mobile-app/README.md)

---

## ✨ Feature Overview

### For Clients

✅ Browse and search services  
✅ View service details and pricing  
✅ Book services with one click  
✅ Automatic balance deduction  
✅ View booking history  
✅ Cancel pending bookings  
✅ Transaction history  
✅ Account balance management  

### For Service Providers

✅ Create and manage services  
✅ Edit service details  
✅ Delete services  
✅ View bookings received  
✅ Track earnings  
✅ Transaction history  
✅ Service analytics  

### General Features

✅ Secure JWT authentication  
✅ Email or NIF login  
✅ Role-based access control  
✅ Atomic balance transactions  
✅ Real-time balance updates  
✅ Error handling and validation  
✅ Responsive design (web)  
✅ Native mobile experience  

---

## 💾 Database Schema

### Users Table
- id (UUID)
- name
- nif (unique)
- email (unique)
- password (hashed)
- role (CLIENT | SERVICE_PROVIDER)
- balance (default 1000 for clients)
- createdAt, updatedAt

### Services Table
- id (UUID)
- title
- description
- price
- providerId (FK)
- createdAt, updatedAt

### Reservations Table
- id (UUID)
- serviceId (FK)
- clientId (FK)
- providerId (FK)
- price
- status (PENDING | ACCEPTED | REJECTED | COMPLETED | CANCELLED)
- createdAt, updatedAt

### Transactions Table
- id (UUID)
- clientId (FK)
- providerId (FK)
- serviceId (FK)
- reservationId (FK, optional)
- amount
- description
- createdAt

---

## 🧪 Sample Data

After running the seed script, the database is populated with:

### Sample Users

**Service Provider**
```
Name: João Silva
Email: provider@test.com
NIF: 12345678901
Password: 123456
Balance: R$ 1,000
```

**Client**
```
Name: Maria Santos
Email: client@test.com
NIF: 98765432101
Password: 123456
Balance: R$ 5,000
```

### Sample Services
- Limpeza de Casa (R$ 150)
- Reparo Elétrico (R$ 200)
- Consultoria de TI (R$ 300)

---

## 🚀 Deployment

### Backend Deployment (Render, Railway, Heroku)

1. Push code to GitHub
2. Connect repository to deployment platform
3. Set environment variables:
   ```env
   DATABASE_URL=postgresql://...
   JWT_SECRET=your-production-secret
   NODE_ENV=production
   ```
4. Deploy

### Web Frontend Deployment (Vercel)

1. Push code to GitHub
2. Connect to Vercel
3. Set environment variables:
   ```env
   NEXT_PUBLIC_API_URL=https://your-api.com/api
   ```
4. Deploy (automatic on push)

### Mobile App Deployment

Use EAS (Expo Application Services):
```bash
npm install -g eas-cli
eas login
eas build --platform android
# or
eas build --platform ios
```

---

## 🔐 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt with salt rounds
- **CORS Protection**: Configured for trusted origins
- **Input Validation**: All endpoints validate input
- **Role-Based Access**: Strict role-based authorization
- **Atomic Transactions**: Database-level transaction safety
- **Error Handling**: Secure error messages (no sensitive data)
- **Token Expiration**: JWTs expire after 24 hours

---

## 📊 Performance Considerations

- Connection pooling in Prisma
- Database indexing on foreign keys
- API response caching (client-side)
- Lazy loading on web frontend
- Efficient list rendering in mobile app
- Optimized database queries

---

## 🐛 Troubleshooting

### Backend won't start
- Check if PostgreSQL is running
- Verify DATABASE_URL in .env
- Run migrations: `npm run prisma:migrate`

### Web app can't connect to API
- Ensure backend is running on port 3001
- Check NEXT_PUBLIC_API_URL in .env.local
- Clear browser cache

### Mobile app won't connect
- Use your machine's IP instead of localhost
- Check EXPO_PUBLIC_API_URL matches
- Ensure device is on same network

### Database issues
- Reset database: `npm run db:reset`
- Check PostgreSQL connection
- Verify user permissions

---

## 📝 License

MIT License - feel free to use for any purpose

---

## 👨‍💻 Development Team

Created as a comprehensive full-stack example showcasing:
- Clean Architecture principles
- Separation of Concerns
- Modular code organization
- Type safety with TypeScript
- Best practices for web and mobile development

---

## 📞 Support

For detailed information, refer to individual README files:
- [Backend API Documentation](./backend-api/README.md)
- [Web Frontend Guide](./frontend-web/README.md)
- [Mobile App Guide](./mobile-app/README.md)

---

**Happy Coding! 🚀**
