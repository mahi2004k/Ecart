# Ecart 🛒

Ecart is a full-stack e-commerce web application with a customer-facing store and a full admin dashboard. It's built with a React (Vite) frontend and a Node.js/Express + MongoDB backend, and supports authentication with email OTP verification, product management, cart, checkout with Razorpay payments, and order/sales tracking.

## Features

**Customer**
- User signup/login with email OTP verification
- Browse products with search & filters
- Product detail pages with image gallery
- Cart management (add, update quantity, remove)
- Address form & checkout
- Razorpay payment integration
- Order history and order success page
- Profile management

**Admin**
- Add / update / delete products (with image upload via Cloudinary)
- View and manage all orders
- View all registered users and user details
- Per-user order history
- Sales dashboard with charts (Recharts)

## Tech Stack

**Frontend**
- React 18 + Vite
- Redux Toolkit + Redux Persist (state management)
- React Router
- Tailwind CSS + shadcn/ui (Radix UI primitives)
- Axios
- Recharts (sales charts)
- Sonner (toasts)

**Backend**
- Node.js + Express 5
- MongoDB + Mongoose
- JWT authentication (jsonwebtoken)
- bcryptjs (password hashing)
- Multer + Cloudinary (image uploads)
- Razorpay / Cashfree (payments)
- Resend / Nodemailer (transactional email & OTP)

## Project Structure

```
Ecart/
├── backend/
│   ├── config/           # Payment gateway config (Razorpay)
│   ├── controllers/      # Route handlers (user, product, cart, order)
│   ├── database/         # MongoDB connection
│   ├── emailverify/      # OTP generation & email verification
│   ├── middleware/       # Auth, admin check, multer upload
│   ├── models/           # Mongoose schemas (user, product, cart, order, session)
│   ├── routes/           # Express routers
│   ├── utils/            # Cloudinary, data URI, email helpers
│   └── server.js         # App entry point
│
└── frontend/
    ├── public/            # Static assets
    └── src/
        ├── components/    # Reusable UI + shadcn components
        ├── pages/          # Route-level pages (incl. admin/ subfolder)
        ├── redux/          # Redux slices & store
        ├── lib/            # Utilities
        └── App.jsx         # Root app component
```

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- A MongoDB instance (local or Atlas)
- Cloudinary account (for image uploads)
- Razorpay account (for payments)
- Resend account (for transactional emails)

### 1. Clone the repository
```bash
git clone <repo-url>
cd Ecart
```

### 2. Backend setup
```bash
cd backend
npm install
```

Create a `.env` file in `backend/` with the following variables:
```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
SECRET_KEY=your_jwt_secret
CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_SECRET=your_razorpay_secret
CLIENT_URL=http://localhost:5173
RESEND_API_KEY=your_resend_api_key
```

Run the backend:
```bash
npm start
```
The API will be available at `http://localhost:3000/api/v1`.

### 3. Frontend setup
```bash
cd frontend
npm install
```

Create a `.env` file in `frontend/` with:
```env
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
VITE_BACKEND_URL=http://localhost:3000
```

Run the frontend:
```bash
npm run dev
```
The app will be available at `http://localhost:5173`.

## API Overview

Base URL: `/api/v1`

| Resource  | Method & Path                       | Description                     |
|-----------|--------------------------------------|----------------------------------|
| User      | `POST /user/register`               | Register a new user             |
| User      | `POST /user/verify`                 | Verify account via OTP           |
| User      | `POST /user/login`                  | Login                           |
| User      | `POST /user/logout`                 | Logout                          |
| User      | `POST /user/forgot-password`        | Request password reset OTP      |
| User      | `GET /user/all-users`               | (Admin) List all users          |
| Product   | `GET /product/getallproducts`       | List all products               |
| Product   | `POST /product/add`                 | (Admin) Add product              |
| Product   | `PUT /product/update/:productId`    | Update product                  |
| Product   | `DELETE /product/delete/:productId` | Delete product                  |
| Cart      | `GET /cart`                         | Get current user's cart         |
| Cart      | `POST /cart/add`                    | Add item to cart                |
| Cart      | `PUT /cart/update`                  | Update item quantity            |
| Cart      | `DELETE /cart/remove`               | Remove item from cart           |
| Order     | `POST /orders/create-order`         | Create a new order               |
| Order     | `POST /orders/verify-payment`       | Verify Razorpay payment          |
| Order     | `GET /orders/myorder`               | Get logged-in user's orders      |
| Order     | `GET /orders/all`                   | (Admin) Get all orders           |
| Order     | `GET /orders/sales`                 | (Admin) Get sales data           |

## Build for Production

**Frontend**
```bash
cd frontend
npm run build
```
Outputs a production build to `frontend/dist`.

**Backend**
```bash
cd backend
npm start
```

## License

ISC