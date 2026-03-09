# 🌐 Service Booking Platform - Web Frontend

Modern web application for the Service Booking Platform built with Next.js, TypeScript, React, and TailwindCSS.

## 📋 Features

- ✅ User authentication (login/register)
- ✅ Browse available services
- ✅ Book services (clients)
- ✅ Create and manage services (providers)
- ✅ Transaction history
- ✅ Balance management
- ✅ Responsive design
- ✅ Real-time balance updates

## 🛠 Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **HTTP Client**: Axios
- **State Management**: React Context API
- **Query Management**: React Query

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout component
│   ├── page.tsx            # Home page
│   ├── login/              # Login page
│   ├── register/           # Registration page
│   ├── services/           # Service browsing page
│   ├── my-services/        # Provider's services management
│   ├── create-service/     # Service creation page
│   └── history/            # Transaction history page
├── components/
│   ├── Navbar.tsx          # Navigation component
│   ├── ServiceCard.tsx     # Service card component
│   ├── ServiceForm.tsx     # Service form component
│   └── TransactionTable.tsx # Transaction history table
├── context/
│   └── AuthContext.tsx     # Authentication context
├── lib/
│   └── api.ts             # API client and endpoints
└── styles/
    └── globals.css        # Global styles
```

## 🚀 Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

1. **Navigate to frontend directory**
   ```bash
   cd frontend-web
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local`:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3001/api
   ```

### Running the Application

**Development mode** (with hot reload):
```bash
npm run dev
```

**Production build**:
```bash
npm run build
npm start
```

The application will be available at `http://localhost:3000`

## 📚 Application Pages

### Public Pages

- **Login** (`/login`)
  - Email or NIF login
  - Demo credentials provided
  - Redirect to register if new user

- **Register** (`/register`)
  - Multiple role selection (Client or Service Provider)
  - Form validation
  - Auto-login after registration

### Protected Pages

- **Home** (`/`)
  - Dashboard with role-specific options
  - Quick links to main features

- **Services** (`/services`)
  - Browse all available services
  - Filter and search capabilities
  - Book services (clients only)
  - Real-time balance update on booking

- **My Services** (`/my-services`)
  - View created services (providers only)
  - Create new service
  - Edit existing service
  - Delete service

- **Create Service** (`/create-service`)
  - Form to create new service
  - Title, description, and price
  - Success notification

- **History** (`/history`)
  - View reservations made
  - View transaction history
  - Cancel pending reservations

## 🔐 Authentication

- JWT token-based authentication
- Token stored in localStorage
- Automatic token injection in API requests
- Protected routes with redirect to login
- Logout clears local storage

## 🎨 UI Components

### Navbar
- User greeting with balance display
- Navigation links based on user role
- Logout functionality
- Responsive mobile menu

### ServiceCard
- Service title and description
- Provider information
- Price display
- Action buttons (Book, Edit, Delete)

### ServiceForm
- Reusable form for creating/editing services
- Form validation
- Error handling
- Loading state

### TransactionTable
- Displays transaction history
- Shows service, client, provider, amount, and date
- Responsive table design

## 🌐 API Integration

All API calls are managed through the `lib/api.ts` file with organized endpoints:

- `authAPI` - Login and registration
- `usersAPI` - User profile and balance
- `servicesAPI` - Service CRUD operations
- `reservationsAPI` - Booking management
- `transactionsAPI` - Transaction history

## 🔄 State Management

### AuthContext
Global authentication state including:
- Current user information
- JWT token
- Login/logout functions
- Balance refresh

### Local Component State
React hooks for component-specific state management

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints for tablet and desktop
- TailwindCSS responsive utilities
- Touch-friendly interface

## 🎯 Features by Role

### Client Features
- Browse and filter services
- Book services with balance check
- View booking history
- View transaction history
- Manage balance

### Service Provider Features
- Create and manage services
- View service details
- Edit service information
- Delete services
- View reservations
- Track earnings

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy

### Docker Deployment

Create a `Dockerfile`:

```dockerfile
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:18-alpine

WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000

CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t service-booking-web .
docker run -p 3000:3000 --env NEXT_PUBLIC_API_URL=http://api:3001/api service-booking-web
```

## 📝 License

MIT
