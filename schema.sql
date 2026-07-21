-- Student Management System - Database Schema
-- PostgreSQL

-- Step 1: Pehle pgAdmin ya psql me ye database bana lein:
-- CREATE DATABASE student_management;

-- Step 2: Us database ke andar (student_management) ye query chalayein:

CREATE TABLE IF NOT EXISTS students (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    roll_no VARCHAR(50) UNIQUE NOT NULL,
    department VARCHAR(100) NOT NULL,
    semester INT NOT NULL,
    email VARCHAR(100),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Thoda sample data (optional, testing ke liye)
INSERT INTO students (name, roll_no, department, semester, email) VALUES
('Ali Raza', 'CS-101', 'Computer Science', 3, 'ali.raza@example.com'),
('Sara Khan', 'CS-102', 'Computer Science', 3, 'sara.khan@example.com'),
('Bilal Ahmed', 'SE-201', 'Software Engineering', 5, 'bilal.ahmed@example.com');
