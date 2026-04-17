# Multi-tenant Feature Flag Management System/Platform Frontend

This application using react and node that allows users to check whether a specific feature is enabled for an organization. It communicates with a backend API and displays feature status for user, manager features by organization admin and manage organisation by super admin.

A multi-role SaaS-style frontend system for managing and checking feature flags across organizations. This project includes three separate user flows:

- Super Admin App
- Organization Admin App
- End User App

---

## Overview

### Super Admin App
- Login
- Create Organizations
- View all organizations

### Organization Admin App
- Signup / Login
- Create feature flags with status
- Enable / Disable feature flags
- Manage organization-specific features

### End User App
- Enter Feature Key and organisation id
- Check if feature is enabled for their organization

---

## Key Features

- Organization management  
- Feature flag management 
- Role based access
- Input validation for forms
- User-friendly toast notifications
- Clean and responsive UI
- Reusable components (Input, Button)
- Environment-based API configuration

---

## Tech Stack

- React.js (Vite)
- TypeScript
- Axios (HTTP client)
- React Router (navigation)
- React Hooks
- React Hot Toast (notifications)
- Tailwind CSS
- Node.js  
- Express.js  
- PostgreSQL  
- TypeORM 
- JWT Authentication

### How to run

## Clone repo

git clone https://github.com/sharmilaDeveloper/multi-tenant-feature-flag.git

## Frontend

cd frontend
npm install
npm run dev


## Backend

cd frontend
npm install
npm run dev
