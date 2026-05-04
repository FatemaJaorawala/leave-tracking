# 🏖️ Leave Time-Off Tracker System

A full-stack Leave Management System built using **React.js, Node.js, Express.js, and MySQL**.  
It allows employees to apply for leaves and managers to approve or reject them, while automatically handling weekends and public holidays.

---

## 🚀 Features

### 👨‍💼 Employee
- Apply for leave
- Select leave type (Sick, Casual, WFH, etc.)
- View leave history
- Track leave status (Pending / Approved / Rejected)
- Holiday validation (cannot apply on public holidays)

### 🧑‍💻 Manager
- View pending leave requests
- Approve / Reject leave requests
- Add comments while acting on requests

### ⚙️ System Features
- Working days calculation (excluding weekends + Indian public holidays)
- Holiday master table
- Role-based system (Employee / Manager)
- Timestamp tracking (created_at, acted_at)

---

## 🛠️ Tech Stack

**Frontend:**
- React.js
- Axios
- CSS

**Backend:**
- Node.js
- Express.js

**Database:**
- MySQL

---

## 🗄️ Database Tables

- users
- leave_requests
- leave_types
- holidays

---

## 📌 API Endpoints

### Auth
- POST `/api/auth/signup`
- POST `/api/auth/login`

### Leaves
- POST `/api/leaves/apply`
- GET `/api/leaves/my/:userId`
- GET `/api/leaves/pending/:managerId`
- PUT `/api/leaves/update-status/:id`

### Leave Types
- GET `/api/leavetypes`

### Holidays
- GET `/api/holidays`

---

## 🧠 Key Logic

### Working Days Calculation
- Excludes weekends (Saturday, Sunday)
- Excludes Indian public holidays
- Dynamically calculates leave duration

---

## 📸 Screenshots (Add Later)
- Employee Dashboard
- Apply Leave Page
- Manager Dashboard

---

## ⚡ Setup Instructions

### Backend
```bash
cd server
npm install
node server.js
cd client
npm install
npm start