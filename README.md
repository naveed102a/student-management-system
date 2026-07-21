# Student Management System (DBMS Mini Project)

Simple CRUD project: HTML + CSS + JavaScript (frontend) + Node.js/Express (backend) + PostgreSQL (database).

## Aapko kya download karna hai?

Aapke pas already **VS Code** aur **PostgreSQL** hai. HTML/CSS/JS ke liye alag se kuch install nahi karna — wo browser me hi chalti hain. Sirf ye 2 cheezein install karni hain:

1. **Node.js** — kyunke JavaScript seedha PostgreSQL se baat nahi kar sakti, iske liye ek chhota backend server chahiye hota hai jo Node.js se banega.
   - Download: https://nodejs.org (LTS version le lein)
   - Install karne ke baad terminal me check karein: `node -v`

2. **VS Code Extension (optional but helpful):** "Live Server" ya "PostgreSQL" extension — zaroori nahi, lekin kaam asaan ho jata hai.

Bas itna hi. pgAdmin (PostgreSQL ke sath aata hai) already hoga, wahi se database bana lenge.

## Setup Steps

### 1) Database bana lein
- pgAdmin ya psql terminal kholein
- Ye query chalayein:
  ```sql
  CREATE DATABASE student_management;
  ```
- Uske baad `student_management` database ke andar `schema.sql` file ki saari queries chala dein (table bane ga aur 3 sample students bhi aa jayenge)

### 2) server.js me apni details daalein
`server.js` file kholein aur ye part update karein:
```js
const pool = new Pool({
    user: 'postgres',            // apka postgres username
    host: 'localhost',
    database: 'student_management',
    password: 'YOUR_PASSWORD',   // apna asli postgres password
    port: 5432,
});
```

### 3) Terminal me project folder kholein aur dependencies install karein
```bash
npm install
```
(Ye express, pg, aur cors install karega jo package.json me likhi hain)

### 4) Server chalayein
```bash
npm start
```
Terminal me likha aayega: `Server chal raha hai: http://localhost:3000`

### 5) Browser me kholein
```
http://localhost:3000
```
Bas — ab aap students add/edit/delete kar sakte hain aur wo PostgreSQL database me save hote hain.

## Project ka structure
```
student-management-system/
├── server.js        → backend (Express + PostgreSQL connection + API routes)
├── schema.sql        → database table banane ki query
├── package.json       → Node.js dependencies list
└── public/
    ├── index.html     → frontend page
    ├── style.css      → styling
    └── script.js       → frontend logic (add/edit/delete ke liye fetch calls)
```

## Assignment me kya explain karna hai (agar demo/viva ho)
- **Frontend (HTML/CSS/JS):** form aur table dikhata hai, fetch() se backend API ko call karta hai
- **Backend (Node.js + Express):** API routes banata hai (GET, POST, PUT, DELETE) jo database se baat karte hain
- **Database (PostgreSQL):** ek `students` table jisme data store hota hai
- Ye teeno mil kar ek simple **3-tier architecture** banate hain: Frontend → Backend API → Database
