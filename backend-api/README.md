# 🎯 Service Booking Platform - Backend API

REST API backend for the Service Booking Platform built with Node.js, TypeScript, Express, and PostgreSQL.

## 📋 Features

- ✅ JWT Authentication (email/password or NIF/password)
- ✅ Role-Based Access Control (CLIENT | SERVICE_PROVIDER)
- ✅ Service Management (CRUD operations)
- ✅ Booking System with atomic balance transactions
- ✅ Transaction History
- ✅ Balance Management
- ✅ Input validation and error handling

## 🛠 Tech Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT
- **Password Hashing**: bcrypt

## 📁 Project Structure

```
src/
├── modules/
│   ├── auth/              # Authentication logic
│   ├── users/             # User management
│   ├── services/          # Service CRUD
│   ├── reservations/      # Booking system
│   └── transactions/      # Transaction history
├── middleware/            # Express middleware
├── database/              # Database client
├── utils/                 # Utilities (JWT, errors)
├── config/                # Configuration
└── main.ts               # Application entry point

prisma/
├── schema.prisma         # Database schema
└── seed.ts              # Database seeding script
```

## 🚀 Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn
- PostgreSQL 12+

### Installation

1. **Navigate to backend directory**
   ```bash
   cd backend-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```

   Then edit `.env` with your database credentials:
   ```env
   DATABASE_URL=postgresql://user:password@localhost:5432/service_booking_db
   JWT_SECRET=your_super_secret_key_change_in_production
   PORT=3001
   NODE_ENV=development
   ```

4. **Generate Prisma client**
   ```bash
   npm run prisma:generate
   ```

5. **Run database migrations**
   ```bash
   npm run prisma:migrate
   ```

6. **Seed database with sample data**
   ```bash
   npm run prisma:seed
   ```

### Running the Server

**Development mode** (with auto-reload):
```bash
npm run dev
```

**Production build**:
```bash
npm run build
npm start
```

The API will be available at `http://localhost:3001`

## 📚 API Documentation

### Authentication

#### Register
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "João Silva",
  "nif": "12345678901",
  "email": "user@example.com",
  "password": "123456",
  "role": "CLIENT" | "SERVICE_PROVIDER"
}

Response:
{
  "message": "User registered successfully",
  "user": {
    "id": "uuid",
    "name": "João Silva",
    "email": "user@example.com",
    "role": "CLIENT"
  },
  "token": "jwt_token"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "123456"
}

OR

{
  "nif": "12345678901",
  "password": "123456"
}

Response:
{
  "message": "Login successful",
  "user": {
    "id": "uuid",
    "name": "João Silva",
    "email": "user@example.com",
    "role": "CLIENT",
    "balance": 5000
  },
  "token": "jwt_token"
}
```

### Users

#### Get Profile (Protected)
```http
GET /api/users/profile
Authorization: Bearer jwt_token

Response:
{
  "id": "uuid",
  "name": "João Silva",
  "email": "user@example.com",
  "nif": "12345678901",
  "role": "CLIENT",
  "balance": 5000,
  "createdAt": "2024-01-01T00:00:00Z"
}
```

#### Get Balance (Protected)
```http
GET /api/users/balance
Authorization: Bearer jwt_token

Response:
{
  "balance": 5000
}
```

### Services

#### Create Service (Protected - SERVICE_PROVIDER only)
```http
POST /api/services
Authorization: Bearer jwt_token
Content-Type: application/json

{
  "title": "Limpeza de Casa",
  "description": "Serviço completo de limpeza residencial",
  "price": 150
}

Response:
{
  "message": "Service created successfully",
  "data": {
    "id": "uuid",
    "title": "Limpeza de Casa",
    "description": "Serviço completo de limpeza residencial",
    "price": 150,
    "providerId": "uuid",
    "provider": {
      "id": "uuid",
      "name": "João Silva",
      "email": "provider@test.com"
    },
    "createdAt": "2024-01-01T00:00:00Z"
  }
}
```

#### Get All Services
```http
GET /api/services

Response:
[
  {
    "id": "uuid",
    "title": "Limpeza de Casa",
    "description": "Serviço completo de limpeza residencial",
    "price": 150,
    "providerId": "uuid",
    "provider": {
      "id": "uuid",
      "name": "João Silva",
      "email": "provider@test.com"
    },
    "createdAt": "2024-01-01T00:00:00Z"
  }
]
```

#### Get Service by ID
```http
GET /api/services/:id

Response: (Same as single service object above)
```

#### Update Service (Protected - SERVICE_PROVIDER only)
```http
PUT /api/services/:id
Authorization: Bearer jwt_token
Content-Type: application/json

{
  "title": "Updated Title",
  "description": "Updated Description",
  "price": 200
}

Response:
{
  "message": "Service updated successfully",
  "data": { /* updated service */ }
}
```

#### Delete Service (Protected - SERVICE_PROVIDER only)
```http
DELETE /api/services/:id
Authorization: Bearer jwt_token

Response:
{
  "message": "Service deleted successfully"
}
```

#### Get My Services (Protected - SERVICE_PROVIDER only)
```http
GET /api/services/provider/my-services
Authorization: Bearer jwt_token

Response: (Array of services provided by the user)
```

### Reservations

#### Create Reservation (Protected - CLIENT only)
```http
POST /api/reservations
Authorization: Bearer jwt_token
Content-Type: application/json

{
  "serviceId": "uuid"
}

Response:
{
  "message": "Reservation created successfully",
  "data": {
    "id": "uuid",
    "serviceId": "uuid",
    "clientId": "uuid",
    "providerId": "uuid",
    "price": 150,
    "status": "PENDING",
    "createdAt": "2024-01-01T00:00:00Z"
  }
}
```

#### Cancel Reservation (Protected)
```http
DELETE /api/reservations/:id
Authorization: Bearer jwt_token

Response:
{
  "message": "Reservation cancelled successfully",
  "data": { /* updated reservation */ }
}
```

#### Get Reservation History (Protected)
```http
GET /api/reservations/history/my-history
Authorization: Bearer jwt_token

Response:
[
  {
    "id": "uuid",
    "serviceId": "uuid",
    "clientId": "uuid",
    "providerId": "uuid",
    "price": 150,
    "status": "PENDING",
    "service": {
      "title": "Limpeza de Casa",
      "description": "...",
      "price": 150
    },
    "client": {
      "name": "Maria Santos"
    },
    "provider": {
      "name": "João Silva"
    },
    "createdAt": "2024-01-01T00:00:00Z"
  }
]
```

### Transactions

#### Get All Transactions
```http
GET /api/transactions

Response:
[
  {
    "id": "uuid",
    "clientId": "uuid",
    "providerId": "uuid",
    "serviceId": "uuid",
    "amount": 150,
    "description": "Service booking",
    "client": {
      "name": "Maria Santos",
      "email": "client@test.com"
    },
    "provider": {
      "name": "João Silva",
      "email": "provider@test.com"
    },
    "service": {
      "title": "Limpeza de Casa"
    },
    "createdAt": "2024-01-01T00:00:00Z"
  }
]
```

#### Get My Transactions (Protected)
```http
GET /api/transactions/user/my-transactions
Authorization: Bearer jwt_token

Response: (Transactions where user is client or provider)
```

## 🔐 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Role-Based Access Control**: Different permissions for CLIENT and SERVICE_PROVIDER
- **Password Hashing**: bcrypt for secure password storage
- **Input Validation**: Request validation on all endpoints
- **Atomic Transactions**: Database-level transaction support for balance operations
- **CORS**: Cross-origin support for web applications

## 📊 Sample Users

After running the seed script, the following users are created:

**Service Provider**
- Email: `provider@test.com`
- Password: `123456`
- Initial Balance: R$ 1,000

**Client**
- Email: `client@test.com`
- Password: `123456`
- Initial Balance: R$ 5,000

## 🚀 Deployment

### Environment Variables for Production

```env
DATABASE_URL=postgresql://prod_user:prod_password@prod_host:5432/prod_db
JWT_SECRET=very_long_random_string_for_production
PORT=3001
NODE_ENV=production
```

### Docker Deployment (Optional)

Create a `Dockerfile` in the backend directory:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3001

CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t service-booking-api .
docker run -p 3001:3001 --env-file .env service-booking-api
```

## 📝 License

MIT
