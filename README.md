# 📦 Delivo  ( Delivery Management Frontend)


Delivo is a modern, responsive delivery management web application built with **React**, **TypeScript**, **Vite**, **Tailwind CSS**, and **Redux Toolkit**. It provides an intuitive interface for efficiently managing parcel deliveries with robust role-based access control.

---

**Live Demo:** https://delivo-beryl.vercel.app/

---

## 🎯 Project Overview

Delivo is a comprehensive web application that serves as the user interface for a parcel delivery management system. It provides different dashboards and functionalities based on user roles (Admin, Sender, Receiver), ensuring secure and efficient parcel management.

## ✨ Key Features

### 🔐 **Authentication & Authorization**
- **Secure Login/Register** with JWT-based authentication
- **Role-based Access Control** (Admin, Sender, Receiver)
- **HTTP-only Cookie Authentication** for enhanced security
- **Automatic Token Refresh** and session management

### 📊 **Admin Dashboard**
- **Analytics Dashboard** with interactive charts and statistics
- **User Management** - View, block/unblock, and assign roles to users
- **Parcel Management** - Comprehensive parcel oversight with status updates
- **Real-time Statistics** - Total parcels, users, delivery performance metrics
- **User profile update** - Admin update their profile information like image , phone number etc.

### 📦 **Parcel Management**
- **Create Parcels** with detailed recipient information
- **Track Parcels** with real-time status updates and history
- **Cancel Parcels** (for pending deliveries)
- **Public Tracking** - Track parcels without login using tracking numbers
- **Status Management** - Update parcel statuses with proper workflow

### 🎨 **User Experience**
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **Dark/Light Mode** - Toggle between themes
- **Modern UI Components** - Built with shadcn/ui and Tailwind CSS
- **Interactive Charts** - Data visualization with Recharts
- **Real-time Updates** - Live data synchronization

### 📱 **Public Features**
- **Homepage** - Landing page with service information
- **About Page** - Company information and team details
- **Contact Page** - Inquiry form and contact information
- **Parcel Tracking** - Public tracking without authentication

## 🛠️ Technology Stack

- **Frontend Framework:** React with TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS + shadcn/ui components
- **State Management:** Redux Toolkit + RTK Query
- **Charts & Visualization:** Recharts
- **Icons:** Lucide React
- **Forms:** React Hook Form + Zod validation
- **Alerts & Modals:** SweetAlert, shadcn Dialog
- **Notifications:** Sonner(toast)
- **HTTP Client:** Axios



## 🚀 Getting Started

### Prerequisites
- Node.js 
- npm or yarn
- Backend API running (see [Backend README](../parcel-nexus-backend/README.md))

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Rika4698/Parcel-Delivery-API-Frontend.git
   cd Parcel-Delivery-API-Frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory:
   ```env
   VITE_BASE_URL=http://localhost:5000/api/v1
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`

### 🧪 Test Credentials

For testing purposes, you can use these pre-configured accounts:

| Role | Email | Password | Access |
|------|-------|----------|---------|
| **Admin** | `person@gmail.com` | `12345678` | Full system access, analytics, user & parcel management |
| **Sender** | `Samira12@gmail.com` | `*Samira12` | Create parcels, update parcel, view sent parcels, track deliveries |
| **Receiver** | `karim12@gmail.com` | `*Karim12` | View incoming parcels, confirm deliveries |

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.



## 🎨 UI Components

The application uses a comprehensive set of UI components built with shadcn/ui:

- **Layout Components:** Sidebar
- **Form Components:** Input, Select, Textarea
- **Data Display:** Table, Card, Badge, Avatar
- **Feedback:** Toast, Alert Dialog, Loading Spinner
- **Navigation:** Breadcrumb, Pagination

## 🔐 Authentication Flow

1. **Login:** User enters credentials
2. **Token Storage:** Access and refresh tokens stored in HTTP-only cookies
3. **Route Protection:** Protected routes check authentication status
4. **Role-based Access:** Different dashboards based on user role
5. **Auto Refresh:** Tokens automatically refreshed when needed

## 📊 Role-based Features

### 👑 **Admin**
- Analytics dashboard with charts and statistics
- User management (view, block/unblock, assign roles)
- Parcel management (view all, update status, block/unblock)
- System-wide oversight and control
- Update admin profile information

### 📤 **Sender**
- Create new parcels
- Update pending parcels
- View sent parcels with status tracking
- Cancel pending parcels
- Track delivery progress

### 📥 **Receiver**
- View incoming parcels
- Confirm parcel delivery
- Track parcel status

## 🌐 API Integration

The frontend integrates with the backend API using RTK Query:

- **Authentication API:** Login, register, logout, token refresh
- **User API:** User management, role assignment
- **Parcel API:** CRUD operations, status updates, tracking
- **Analytics API:** Dashboard statistics and metrics

## 🎯 Key Pages

### **Public Pages**
- **Home (`/`):** Landing page with service overview
- **About (`/about`):** Company information and team
- **Contact (`/contact`):** Contact form and information
- **Track (`/track`):** Public parcel tracking

### **Protected Pages**
- **Admin Dashboard (`/admin/analytics`):** Analytics and overview
- **User Management (`/admin/users`):** User administration
- **Parcel Management (`/admin/all-parcels`):** Parcel oversight
- **My Parcels (`/parcels`):** Sender's parcel management
- **Incoming Parcels (`/incoming-parcels`):** Receiver's parcels

## 🚀 Deployment

The application is deployed on Vercel with automatic deployments from the main branch.

### Environment Variables for Production
```env
VITE_BASE_URL=https://parcel-delivery-api-backend.onrender.com/api/v1
```



## 📱 Responsive Design

The application is fully responsive and optimized for:

- **Desktop:** Full-featured experience
- **Tablet:** Adapted layouts and touch interactions
- **Mobile:** Mobile-first design with optimized navigation



## 🚀 Other Features

The following features are planned for future releases:

- **🔐 Google OAuth Login** - Social authentication with Google
- **✅ Email Verification** - Two-factor authentication for enhanced security
- **👤 User Verification System** - Default `isVerified` property set to `false`
- Optimization of the pages, currently the loading time is too slow
- File(image) uploading feature

## 🔗 Related Links

- **Backend Live Link:** https://parcel-delivery-api-backend.onrender.com/
- **Live Demo:** https://delivo-beryl.vercel.app/
- **Backend GitHub Repository:** https://github.com/Rika4698/Parcel-Delivery-API-Backend
- **Frontend GitHub Repository:** https://github.com/Rika4698/Parcel-Delivery-API-Frontend


---

**👤 Author Sharmin Akter Reka**