# Cloud Wallet Dashboard

A full-stack dashboard application built and deployed on AWS EC2 using Node.js, Express, MySQL, and PM2.

The app allows users to manage transactions (add, edit, delete) and view them in a clean dashboard with a live total and chart.

---

## Live Access

[http://16.28.54.248:3000/](http://16.28.54.248:3000/)

---

## Project Overview

This project combines backend development, database management, cloud deployment, and frontend integration into one working system.

The application runs on an Ubuntu EC2 instance and connects to a MySQL database hosted on the same server. The dashboard loads live data from the backend and updates based on user actions.

---

## Project Goal

The goal of this project was to understand how a full-stack application works in a real cloud environment.

Focus areas:
- connecting frontend to backend APIs  
- managing a relational database  
- deploying an app on AWS EC2  
- handling real user actions (CRUD)  
- keeping a backend process running using PM2  

---

## Tech Stack

**Cloud / Hosting**
- AWS EC2 (Ubuntu)

**Backend**
- Node.js  
- Express.js  

**Database**
- MySQL  

**Frontend**
- HTML  
- CSS  
- JavaScript  
- Chart.js  

**Process Management**
- PM2  

**Tools**
- EC2 Instance Connect  
- Nano  
- Git & GitHub  

---

## Features

- User profile display  
- Transaction table  
- Add transaction  
- Edit transaction  
- Delete transaction  
- Total transactions count  
- Total amount calculation  
- Chart visualization (Chart.js)  
- Live data fetched from backend  
- Public access via EC2 IP  
- Persistent backend using PM2  

---

## API Routes

### Users
- `GET /users` → returns all users  

### Transactions
- `GET /transactions` → returns all transactions  
- `POST /transactions` → adds a new transaction  
- `PUT /transactions/:id` → updates a transaction  
- `DELETE /transactions/:id` → deletes a transaction  

---

## Database Structure

### users table
- id (primary key, auto increment)  
- name  
- email  

### transactions table
- id (primary key, auto increment)  
- user_id  
- amount  
- created_at  

**Relationship:**  
One user → many transactions  

---

## MySQL Concepts Practiced

**Commands used**
- CREATE DATABASE  
- USE  
- CREATE TABLE  
- INSERT INTO  
- SELECT  
- UPDATE  
- DELETE  
- WHERE  
- JOIN  

**Concepts learned**
- primary keys  
- auto increment  
- constraints (not null)  
- one-to-many relationships  
- linking tables  
- filtering and updating data  

---

## Application Flow

1. User opens the dashboard  
2. Frontend sends request to backend  
3. Express handles API request  
4. Backend queries MySQL  
5. MySQL returns data  
6. Backend sends JSON response  
7. Frontend updates the dashboard  

---

## Architecture

Browser → Frontend (HTML/CSS/JS) → Express API → MySQL → Response → Dashboard


---

## Setup Process

### EC2 Setup
- launched Ubuntu instance  
- connected via EC2 Instance Connect  
- updated system  

### MySQL Setup
- installed MySQL  
- created database `Cloudapp`  
- created tables  
- inserted data  
- created a dedicated MySQL user  

### Backend Setup
- initialized Node project  
- installed dependencies  
- created Express server  
- connected to MySQL  
- built API routes  

### Frontend Setup
- built dashboard UI  
- displayed transactions  
- calculated totals  
- added Chart.js  

### Deployment
- opened port 3000 in AWS security group  
- accessed app via public IP  
- used PM2 to keep server running  
