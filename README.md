HRMS Lite – Full Stack Application

HRMS Lite is a lightweight Human Resource Management System designed to manage employee records and track daily attendance.
This project demonstrates end-to-end full-stack development using React, FastAPI, and PostgreSQL, focusing on clean architecture, usability, and production readiness.

🔗 Live Demo

(Add these after deployment)

Frontend URL: https://your-frontend-url.vercel.app

Backend API URL: https://your-backend-url.onrender.com

GitHub Repository: https://github.com/your-username/hrms-lite

📌 Features
1. Employee Management

Add a new employee

View all employees

Delete an employee

Server-side validation:

Required fields

Valid email format

Duplicate email prevention

2. Attendance Management

Mark daily attendance (Present / Absent)

Prevent duplicate attendance for the same employee on the same date

View attendance history per employee

Status displayed with color indicators

3. Dashboard Summary (Bonus)

Total number of employees

Present today count

Absent today count


4. UI & UX

Clean and professional layout

Loading, empty, and error states

Toast notifications for user actions

Reusable and modular components

🛠 Tech Stack
Frontend

React (Vite)

React Hot Toast

Backend

FastAPI

SQLAlchemy

Pydantic

PostgreSQL

Uvicorn

Database

PostgreSQL

Deployment

Frontend: Vercel / Netlify

Backend: Render / Railway

📂 Project Structure
Backend
backend/
│── app/
│   ├── routes/
│   │   ├── employee.py
│   │   └── attendance.py
│   ├── __init__.py
│   ├── crud.py
│   ├── models.py
│   ├── schemas.py
│   ├── database.py
│   └── main.py
│── requirements.txt
│── .env

Frontend
frontend/
│── src/
│   ├── api/
│   │   └── api.js
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Employees.jsx
│   │   ├── Attendance.jsx
│   │   └── Leave.jsx
│   ├── App.jsx
│   └── main.jsx
│── index.html
│── package.json
│── vite.config.js

🚀 Running the Project Locally
Backend Setup

Navigate to backend folder

cd backend

Install dependencies

pip install -r requirements.txt


Configure .env

DATABASE_URL=postgresql://postgres:password@localhost:5432/hrms_db


Run the server

uvicorn app.main:app --reload


Backend will run at:

http://localhost:8000

Frontend Setup

Navigate to frontend folder

cd frontend


Install dependencies

npm install


Create environment variable

VITE_API_URL=http://localhost:8000


Start development server

npm run dev


Frontend will run at:

http://localhost:5173

🔌 API Endpoints
Employees
Method	Endpoint	Description
GET	/employees	Get all employees
POST	/employees	Add new employee
DELETE	/employees/{id}	Delete employee
Attendance
Method	Endpoint	Description
POST	/attendance	Mark attendance
GET	/attendance/{employee_id}	Get attendance by employee
⚠️ Assumptions & Limitations

Single admin user (no authentication)

Attendance can be marked only once per employee per day

✅ Assignment Coverage Checklist

✔ Full-stack implementation

✔ RESTful APIs

✔ Database persistence

✔ Validations & error handling

✔ Bonus dashboard summary

✔ Deployment-ready architecture

📈 Future Improvements

Attendance date filtering

Attendance analytics charts

Authentication & role-based access

Leave management backend

Pagination & search

👤 Author

Hardik Dua
Full Stack Developer