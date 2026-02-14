# HRMS Lite

HRMS Lite is a lightweight Human Resource Management System built as a full-stack web application.  
It allows an admin to manage employees and track daily attendance through a clean and production-style interface.

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
- Email validation
- List employees
- Delete employee

### Attendance Management

- Mark attendance
- Prevent duplicate same-day attendance
- View attendance records per employee

### UI/UX

- Clean production layout
- Loading states
- Empty states
- Error handling
- Responsive design

---

## Tech Stack

Frontend:

- React (Vite)
- Axios
- CSS

Backend:

- FastAPI (Python)
- MongoDB (Motor async driver)

Deployment:

- Frontend → Vercel
- Backend → Render
- Database → MongoDB Atlas

---

## Run Locally

### Backend

cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload

Backend runs on:
http://127.0.0.1:8000

---

### Frontend

cd frontend
npm install
npm run dev

Frontend runs on:
http://localhost:5173

---

## Environment Variables

Backend `.env`:

Frontend `.env`:

VITE_BASE_URL=http://127.0.0.1:8000

---

## Assumptions

- Single admin user
- No authentication required
- Basic HR demo system
- Attendance is stored per day per employee
- No payroll or advanced HR features

---

## Limitations

- No user roles
- No editing employee records
- No analytics dashboard
- No authentication layer

---

## Author

Built as part of a Full-Stack HRMS Lite assignment.
Live App:
https://hrms-web-gamma.vercel.app

GitHub Repo:
https://github.com/yuvsingh17/HRMS_Web

The application is deployed and fully functional.
Frontend and backend are connected to live database.
