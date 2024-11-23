# Full-Stack Authentication System

A modern authentication system built with React, featuring email OTP verification, secure login, and JWT authentication.

## 🚀 Features

- Email-based signup with OTP verification
- Secure login with JWT authentication
- Password hashing using bcrypt
- Responsive design using Tailwind CSS
- Protected routes for authenticated users
- Mobile-friendly interface

## 🛠️ Tech Stack

### Frontend
- React.js with TypeScript
- Tailwind CSS for styling
- Axios for API requests
- React Router for navigation
- Formik and yup  for form validation

### Backend
- Node.js with Express
- TypeScript
- MongoDB for database
- JWT for authentication
- Nodemailer for sending OTP emails

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or pnpm
- Git

### Frontend Setup

```bash
# Clone the repository
git clone <your-repo-url>

# Navigate to frontend directory
cd frontend

# Install dependencies using npm
npm install
# Or using pnpm
pnpm install

# Create .env file
cp .env.example .env

# Start development server
npm run dev
# Or using pnpm
pnpm dev
```

### Environment Variables

Create a `.env` file in the frontend directory:

```env
REACT_APP_API_URL=http://localhost:3000
```

## 🔑 Key Features Implementation

### Auth Flow

1. **Signup**
   - User enters email and password
   - Backend generates OTP and sends via email
   - User verifies OTP
   - Account creation complete

2. **Login**
   - User enters credentials
   - Backend validates and returns JWT
   - Frontend stores token in secure storage
   - User redirected to welcome page

3. **Protected Routes**
   - JWT verification on each request
   - Automatic redirect for unauthenticated users
   - Token refresh mechanism

## 🔒 Security Features

- Password hashing using bcrypt
- JWT-based authentication
- HTTP-only cookies
- CORS protection
- OTP authentication

## 📱 Responsive Design

The application is fully responsive and works seamlessly on:
- Desktop (1024px and above)
- Tablet (768px to 1023px)
- Mobile (320px to 767px)


## 📚 API Documentation

### Authentication Endpoints

```typescript
POST /signup
POST /verify-otp
POST /login
```

## 🚀 Deployment

- MongoDB Atlas: Database
- Vercel: Backend API's
- GitHub Pages: Frontend of the applicatioin
