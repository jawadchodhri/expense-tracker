# 💰 Expense Tracker — Full-Stack Web Application

A full-stack personal finance and expense tracking web application built with **Next.js 16**, **Express.js**, and **MongoDB Atlas**. Features real-time balance calculations, overdraft prevention, interactive charts, and secure JWT cookie authentication.

🔗 **Live Demo:** [https://expense-tracker-flash-41bc.vercel.app](https://expense-tracker-flash-41bc.vercel.app)  
⚙️ **API Endpoint:** [https://expense-tracker-backend-9yqm.onrender.com](https://expense-tracker-backend-9yqm.onrender.com/api/health)
## 🛠️ Tech Stack

### Frontend
![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![JavaScript](https://img.shields.io/badge/JavaScript_ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Recharts](https://img.shields.io/badge/Recharts-22b5bf?style=for-the-badge&logo=d3dotjs&logoColor=white)

### Backend
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![JSON Web Tokens](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![bcrypt](https://img.shields.io/badge/bcryptjs-4A154B?style=for-the-badge&logo=auth0&logoColor=white)

### Database
![MongoDB](https://img.shields.io/badge/MongoDB_Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose_ODM-880000?style=for-the-badge&logo=mongodb&logoColor=white)

### Deployment & Tooling
![Vercel](https://img.shields.io/badge/Vercel_Frontend-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Render](https://img.shields.io/badge/Render_Backend-46E3B7?style=for-the-badge&logo=render&logoColor=black)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)
### ✨ Key Features

### 🔐 Authentication & Security
* **Full-Stack Authentication:** Secure user registration, login, and session handling using JSON Web Tokens (JWT).
* **Password Hashing:** Passwords encrypted using `bcryptjs` with salted hashing before saving to the database.
* **HttpOnly Cookies:** Authentication tokens stored in secure, `httpOnly`, `SameSite` cookies to protect against XSS and token-theft attacks.
* **Protected Routes & Middleware:** Client-side and server-side route protection guards ensuring only authenticated users can access financial records.

### 💼 Multi-Account & Transaction Management
* **Multi-Account Support:** Create and manage distinct financial accounts (e.g., Bank, Cash, Savings, Credit Cards).
* **Comprehensive CRUD Operations:** Full capability to Create, Read, Update, and Delete both Income and Expense transactions.
* **Account-Specific Tracking:** Each transaction is dynamically tied to a specific financial account and isolated per user ID.

### 🛡️ Smart Business Logic & Safeguards
* **Overdraft Prevention:** Real-time server-side balance checks that block expense submissions if the selected account has insufficient funds.
* **Referential Data Integrity:** Built-in deletion guards that prevent users from deleting financial accounts that have active transaction histories.
* **Duplicate Detection:** Case-insensitive account name validation using MongoDB Collation (`strength: 2`) preventing duplicate entries like "Bank" and "bank".
* **MongoDB Aggregations:** High-performance MongoDB aggregation pipelines (`$match`, `$group`, `$sum`) to compute real-time account balances and global totals.

### 📊 Interactive Analytics & Dashboard
* **Dynamic Financial Summary:** Real-time calculation of Total Income, Total Expenses, and Net Current Balance.
* **Visual Data Charts:** Interactive data visualization using **Recharts**:
  * 📈 **Monthly Comparison Bar Charts:** Track income vs. expense trends over time.
  * 🥧 **Category Breakdown Pie Charts:** Categorical distribution of spending and earnings.
* **Recent Activity Feed:** Chronological transaction ledger with instant color-coded status badges and account references.

### ⚡ Responsive & Modern UI
* **Clean, Modern Design:** Fully responsive layout built with **Tailwind CSS**, optimized for mobile, tablet, and desktop screens.
* **Instant Client Feedback:** Real-time input validation, confirmation modals for critical deletions, and seamless navigation.

