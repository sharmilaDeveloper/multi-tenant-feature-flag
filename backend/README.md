# Multi-tenant Feature Flag Management System/Platform Backend

This application using node.js allows users to check whether a specific feature is enabled for an organization. It communicates with a backend API and displays feature status for user, manager features by organization admin and manage organisation by super admin.

Live Demo:  https://jam.dev/c fd28526f-940d-429d-9ff5-730093430645

---



## For Super admin Login:

Go to login from home page
Username : superadmin@yopmail.com
Password : superadmin

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

## Features

-  Organization management  
-  Feature flag management  
-  Org–Feature mapping system  
-  Role-based access (SUPER_ADMIN / ORG_ADMIN / USER)  
-  Feature enable/disable check API  
-  Proper validation & error handling  
-   RESTful APIs  

---

## Tech Stack

- Node.js  
- Express.js  
- PostgreSQL  
- TypeORM 
- JWT Authentication  

---

## Installation

### Clone Repository

git clone https://github.com/sharmilaDeveloper/multi-tenant-feature-flag.git

cd backend

# Install Dependencies
npm install

# Setup Environment Variables

Create a .env file:

PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=postgres
DB_NAME=multi_tenant_feature_flags
JWT=q1w2e3r4t5y6u7i8o9ASDFGH0987654321JKL

# Run Database Migrations (if needed)
npm run migration:run

# Start Server
npm run dev

Server runs at:

http://localhost:3000

## 
For Super admin Login:

Go to login from home page
Username : superadmin@yopmail.com
Password : superadmin
