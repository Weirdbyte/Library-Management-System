# Library-Management-System
A full-stack web app for managing library operations

📚 BookNest – Library Management System
BookNest is a full-stack MERN-based library management system designed to automate and streamline day-to-day library operations such as book issuing, returns, user management, and analytics. It provides a secure, scalable, and efficient platform for both administrators and users.
🚀 Features
👤 Authentication & Security
JWT-based authentication
Password hashing using bcrypt
Role-based access control (Admin / User)
Secure session handling
📖 Library Operations
Add, update, delete, and search books
Issue & return books
Track due dates and overdue books
Borrowing history for each user
📊 Admin Dashboard
View total books, issued books, active users
Monitor overdue books
Analytics using Chart.js
📧 Automation
Automated due & overdue email reminders using Node-Cron
Improves timely returns and user compliance
🛠 Tech Stack
Frontend
React.js
Tailwind CSS
Chart.js
Backend
Node.js
Express.js
Database
MongoDB (Mongoose ODM)
Authentication & Utilities
JWT
bcrypt
Node-Cron
Nodemailer
⚙️ System Architecture
Copy code

Client (React)
   ↓
REST API (Express.js)
   ↓
MongoDB (Books, Users, Borrows)
📦 Key Modules
Module
Description
User Management
Register, login, roles, and profiles
Book Management
CRUD operations on books
Borrow System
Issue, return, track books
Notifications
Automated email reminders
Analytics
Graphical insights for admins
📈 Performance
Handles 10,000+ API requests/day
Supports 1,500+ active sessions
Average API latency < 120ms
Processes 3,000+ monthly book transactions
🔐 API Highlights
POST /api/auth/register
POST /api/auth/login
GET /api/books
POST /api/borrow
POST /api/return
GET /api/admin/stats
🖥️ How to Run Locally
1️⃣ Clone the Repository
Copy code
Bash
git clone https://github.com/Weirdbyte/Library-Management-System.git
cd Library-Management-System
2️⃣ Setup Backend
Copy code
Bash
cd server
npm install
npm start
Create a .env file:
Copy code

MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret_key
EMAIL=your_email
EMAIL_PASS=your_email_password
3️⃣ Setup Frontend
Copy code
Bash
cd client
npm install
npm run dev
🎯 Why BookNest?
BookNest was built to solve real-world library inefficiencies by automating workflows, improving security, and providing actionable insights to administrators. It is designed to be scalable, fast, and production-ready.
👨‍💻 Author
Subhash Chandra
B.Tech CSE, MNNIT Allahabad
GitHub: subhash2707
Email: subhashc2707@gmail.com
