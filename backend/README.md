# Civora – Smart Civic Management System (Backend API)

Production-ready Express.js & MongoDB backend API for **Civora – Smart Civic Management System** (Kolhapur Municipal Corporation Grid).

---

## 🚀 Quick Overview

- **Tech Stack**: Node.js, Express.js, MongoDB, Mongoose, JWT, BcryptJS, Cloudinary, Multer, Express-Validator, Helmet, Morgan, CORS.
- **Port**: `5000` (Default)
- **Base URL**: `http://localhost:5000/api`
- **Health Check**: `GET /api/health`

---

## 🛠️ Required Environment Variables (`.env`)

Create a `.env` file inside `backend/` directory:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://127.0.0.1:27017/civora
JWT_SECRET=civora_super_secret_jwt_key_2026_kolhapur
JWT_EXPIRE=30d

# Cloudinary Setup (Optional - Falls back to Data URI locally)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# CORS
CLIENT_URL=http://localhost:3000
```

---

## 🏃 How to Run Locally

### 1. Install Backend Dependencies
```bash
cd backend
npm install
```

### 2. Seed Initial Database (Users, Complaints, Schedules, Bills)
```bash
npm run seed
```

### 3. Start Development Server
```bash
npm run dev
# or
npm start
```

---

## 📚 Complete API Endpoint Reference

### 🏥 Health Check
- `GET /api/health` — Check server uptime and status

### 🔑 Authentication (`/api/auth`)
- `POST /api/auth/register` — Citizen registration
- `POST /api/auth/login` — Citizen / Admin / Staff login (Returns JWT)
- `GET /api/auth/profile` — Get logged-in user profile (Protected)

### 🚨 Complaints Module (`/api/complaints` & `/api/admin/complaints`)
- `POST /api/complaints` — Submit a complaint (Supports multipart/form-data image upload to Cloudinary)
- `GET /api/complaints/my` — Get logged-in user's complaints
- `GET /api/complaints/:id` — Get single complaint details
- `GET /api/admin/complaints` — View all complaints (Search/Filter by status, category, priority)
- `PUT /api/admin/complaints/:id/status` — Update complaint status & admin remark
- `PUT /api/admin/complaints/:id/assign` — Assign complaint to staff
- `DELETE /api/admin/complaints/:id` — Delete complaint (Admin only)

### 💧 Water Schedule (`/api/water-schedule` & `/api/admin/water-schedule`)
- `GET /api/water-schedule` — Get water supply schedules (Public)
- `POST /api/admin/water-schedule` — Create water schedule (Admin only)
- `PUT /api/admin/water-schedule/:id` — Update water schedule (Admin only)
- `DELETE /api/admin/water-schedule/:id` — Delete water schedule (Admin only)

### 🗑️ Garbage Schedule (`/api/garbage-schedule` & `/api/admin/garbage-schedule`)
- `GET /api/garbage-schedule` — Get garbage pickup schedules (Public)
- `POST /api/admin/garbage-schedule` — Create garbage schedule (Admin only)
- `PUT /api/admin/garbage-schedule/:id` — Update garbage schedule (Admin only)
- `DELETE /api/admin/garbage-schedule/:id` — Delete garbage schedule (Admin only)

### 💳 Bill Management (`/api/bills` & `/api/admin/bills`)
- `GET /api/bills` — Get citizen bills
- `GET /api/bills/:id` — Get single bill
- `POST /api/admin/bills` — Generate bill (Admin only)
- `PUT /api/admin/bills/:id` — Update bill status / record transaction

### 🔔 Notifications (`/api/notifications` & `/api/admin/notifications`)
- `GET /api/notifications` — Get user notifications & city broadcasts
- `PUT /api/notifications/:id/read` — Mark notification as read
- `POST /api/admin/notifications` — Create broadcast or targeted notification (Admin only)

### 📊 Admin Dashboard (`/api/admin/dashboard`)
- `GET /api/admin/dashboard/stats` — Total citizens, complaints, pending, resolved, water & garbage schedules count
- `GET /api/admin/dashboard/recent-complaints` — Latest 5 complaints
- `GET /api/admin/dashboard/category-stats` — Complaint count breakdown by category
- `GET /api/admin/dashboard/status-stats` — Complaint count breakdown by status

---

## ☁️ Deployment Instructions

### Deployment to Render (Backend)
1. Push `backend/` code to GitHub repository.
2. Go to **Render Dashboard** -> **New Web Service**.
3. Select your repository and set Root Directory to `backend`.
4. Set Build Command: `npm install`
5. Set Start Command: `node server.js`
6. Add Environment Variables (`MONGO_URI`, `JWT_SECRET`, `CLOUDINARY_*`, `CLIENT_URL`).
7. Deploy service. Render will provide your live API URL (e.g., `https://civora-api.onrender.com`).

### Deployment to Vercel (Frontend)
1. In Vercel Project Settings -> Environment Variables:
   Set `VITE_API_URL` = `https://civora-api.onrender.com/api`
2. Deploy Frontend to Vercel.

---

## 👤 Default Seed Credentials

After running `npm run seed`:

- **Admin Login**: `admin@kolhapur.gov.in` | Password: `adminpassword123`
- **Staff Login**: `staff@kolhapur.gov.in` | Password: `staffpassword123`
- **Citizen Login**: `citizen@kolhapur.gov.in` | Password: `citizenpassword123`
