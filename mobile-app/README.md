# 📱 Service Booking Platform - Mobile App

Mobile application for the Service Booking Platform built with React Native, Expo, and TypeScript.

## 📋 Features

- ✅ Secure authentication (login/register)
- ✅ Browse available services
- ✅ Book services (clients)
- ✅ Create and manage services (providers)
- ✅ Transaction history
- ✅ Real-time balance updates
- ✅ Native mobile experience

## 🛠 Tech Stack

- **Framework**: React Native
- **Build Tool**: Expo
- **Language**: TypeScript
- **Navigation**: React Navigation
- **HTTP Client**: Axios
- **Storage**: AsyncStorage

## 📁 Project Structure

```
src/
├── context/
│   └── AuthContext.tsx     # Authentication context
├── screens/
│   ├── LoginScreen.tsx      # Login screen
│   ├── RegisterScreen.tsx   # Registration screen
│   ├── HomeScreen.tsx       # Home/dashboard screen
│   ├── ServicesScreen.tsx   # Service browsing
│   ├── MyServicesScreen.tsx # Provider's services
│   ├── CreateServiceScreen.tsx # Create service
│   └── HistoryScreen.tsx    # Transaction history
├── navigation/
│   └── RootNavigator.tsx    # Navigation setup
├── lib/
│   └── api.ts              # API client
└── components/

App.tsx                      # Main App component
app.json                      # Expo configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn
- Expo CLI: `npm install -g expo-cli`
- iOS Simulator (Mac) or Android Emulator
- Or Expo Go app on your phone

### Installation

1. **Navigate to mobile directory**
   ```bash
   cd mobile-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```

   Edit `.env`:
   ```env
   EXPO_PUBLIC_API_URL=http://localhost:3001/api
   ```

   > For physical device on local network, use your machine's IP:
   ```env
   EXPO_PUBLIC_API_URL=http://192.168.x.x:3001/api
   ```

### Running the Application

**Start development server:**
```bash
npm start
```

**Open in Expo Go (quick):**
- Scan the QR code with Expo Go app
- Available on iOS App Store and Google Play

**Run on Android Emulator:**
```bash
npm run android
```

**Run on iOS Simulator (Mac only):**
```bash
npm run ios
```

**Run on Web:**
```bash
npm run web
```

## 📱 Screen Overview

### Authentication Screens

- **Login Screen**
  - Email or NIF login
  - Demo credentials: provider@test.com / 123456
  - Link to register

- **Register Screen**
  - Full name, NIF, email, password
  - Role selection (Client or Service Provider)
  - Form validation

### Main Screens

- **Home Screen**
  - User greeting and balance
  - Quick action buttons
  - Role-specific options
  - Logout

- **Services Screen** (Clients)
  - List of all available services
  - Service details and pricing
  - One-tap booking
  - Real-time balance update on booking

- **My Services Screen** (Providers)
  - List of created services
  - Quick create button
  - Delete service option
  - Pull-to-refresh

- **Create Service Screen** (Providers)
  - Form to create new service
  - Title, description, price fields
  - Form validation
  - Auto-navigate on success

- **History Screen**
  - Reservations tab
  - Transactions tab
  - Date and amount display
  - Status indicators

## 🔐 Authentication

- AsyncStorage for token persistence
- Automatic token injection in API headers
- Auto-login on app launch if token exists
- Logout clears all stored data

## 🎨 UI Design

- Native React Native components
- Consistent color scheme
- Touch-friendly buttons
- Loading indicators
- Error handling with messages
- Success notifications

## 📡 API Integration

All endpoints from the backend API are available:

- Authentication (login, register)
- User profile and balance
- Service CRUD
- Reservations/bookings
- Transaction history

## 🔄 State Management

### Global State
- **AuthContext**: User, token, auth methods

### Local State
- React hooks for screen-specific state

## 📲 Performance Considerations

- Lazy loading of screens
- Efficient list rendering
- Image optimization
- Network request cancellation
- Debounced inputs

## 🚀 Building for Production

### Android

```bash
eas build --platform android
```

### iOS

```bash
eas build --platform ios
```

### Generate APK/IPA

```bash
eas build --platform android --local
```

## 🔧 Troubleshooting

### API Connection Issues
- Ensure backend is running on correct port
- Check API_URL in `.env` file
- For device testing, use machine IP instead of localhost

### AsyncStorage Issues
- Clear app data: `expo build:clean`
- Check permissions in `app.json`

### Navigation Issues
- Remove `node_modules`: `rm -rf node_modules`
- Clear cache: `expo start --clear`

## 📝 License

MIT
