# HRMS Lite

HRMS Lite is a lightweight Human Resource Management System built as a full-stack web application.  
It allows an admin to manage employees and track daily attendance through a clean, production-style interface.

This project was built as part of a Full-Stack coding assignment to demonstrate API design, database modeling, frontend UX, and deployment readiness.

---

## Live Demo

Frontend:  
https://hrms-web-gamma.vercel.app

Backend API:  
https://hrms-web-hg0y.onrender.com

GitHub Repository:  
https://github.com/yuvsingh17/HRMS_Web

---

## Features

### Employee Management

- Add employee
- Unique employee ID validation
- Email format validation
- List all employees
- Delete employee

### Attendance Management

- Mark attendance (Present / Absent)
- Prevent duplicate same-day attendance
- View attendance records per employee

### UI/UX

- Clean professional layout
- Loading states
- Empty states
- Error handling
- Responsive interface

---

## Tech Stack

### Frontend

- React (Vite)
- Axios
- CSS

### Backend

- FastAPI (Python)
- MongoDB (Motor async driver)

### Deployment

- Frontend → Vercel
- Backend → Render
- Database → MongoDB Atlas

---

## Run Locally

### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Backend runs on:
http://127.0.0.1:8000

---

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:
http://localhost:5173

---

## Environment Variables

Backend `.env`

```
MONGO_URL=your_mongodb_connection_string
```

Frontend `.env`

```
VITE_BASE_URL=http://127.0.0.1:8000
```

---

## Assumptions

- Single admin user
- No authentication required
- Basic HR demo system
- Attendance stored per employee per day
- Payroll and advanced HR features out of scope

---

## Limitations

- No user roles
- No employee editing
- No analytics dashboard
- No authentication layer

---

## Author

Built as part of a Full-Stack HRMS Lite assignment.

Live App:  
https://hrms-web-gamma.vercel.app

GitHub Repo:  
https://github.com/yuvsingh17/HRMS_Web
