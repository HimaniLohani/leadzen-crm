# 🚀 LeadFlow – Smart Leads Dashboard

LeadFlow is a full-stack CRM-style leads management dashboard that allows users to add, track, and analyze leads in real-time with a modern UI and deployed backend integration.

---

## 🌐 Live Deployment

### Frontend (Vercel)
https://leadzen-crm.vercel.app/

### Backend (Render)
https://leadzen-backend-hj7j.onrender.com

---

## 📌 Features

- ➕ Add new leads in real-time
- 📊 Live analytics dashboard updates automatically
- 🗂️ Leads management table with instant sync
- 🔄 No page refresh required (real-time updates)
- ☁️ Fully deployed frontend & backend
- 📡 REST API integration with MongoDB

---

## 🛠️ Tech Stack

Frontend:
- React.js
- Axios
- Recharts

Backend:
- Node.js
- Express.js
- MongoDB
- Mongoose

Deployment:
- Frontend: Vercel  
- Backend: Render  
- Database: MongoDB Atlas  

---

## 📂 Project Structure

leadzen-crm/
├── frontend/
├── backend/
├── README.md

---

## ⚙️ Setup Instructions

### 1. Clone Repository
git clone https://github.com/HimaniLohani/leadzen-crm
cd leadzen-crm

---

### 2. Backend Setup
cd backend
npm install

Create `.env` file:
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.tnowpgd.mongodb.net/?retryWrites=true&w=majority
PORT=5000

Start backend:
npm start

Backend runs on:
http://localhost:5000

---

### 3. Frontend Setup
cd frontend
npm install
npm start

Frontend runs on:
http://localhost:3000

---

## 🔗 API Endpoints

GET /api/leads → Fetch all leads  
POST /api/leads → Add new lead  

---

## 🔄 System Flow

React Frontend → Express Backend → MongoDB Atlas → Real-time UI Update

---

## 📈 Future Enhancements

- Authentication (Login/Signup)
- Role-based access control
- AI-based lead scoring system
- Advanced filtering & search
- CSV export feature
- Advanced analytics dashboard

---

## 👨‍💻 Author
Himani Lohani

---

## 📌 Note

This project is fully functional, deployed, and demonstrates real-world full-stack development including API development, database integration, and dynamic frontend state management with real-time updates.
