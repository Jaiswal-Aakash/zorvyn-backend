This project is a backend system for a finance dashboard application. It supports user management, financial transaction handling, role based access control, and dashboard level analytics.

The goal of this project is to demonstrate clean backend architecture, proper data modeling, secure API design, and scalable query handling.

## Backend Architecture

The backend follows a layered architecture to ensure separation of concerns, scalability, and maintainability.

### 1. Routes Layer
Handles API endpoints and maps them to controllers.

- `/api/auth`
- `/api/transactions`
- `/api/dashboard`

---

### 2. Controllers Layer
Responsible for handling request/response logic.

- Validates input
- Calls appropriate services or database queries
- Returns structured responses

---

### 3. Services / Business Logic
Contains core application logic 

some logic is handled directly in controllers for simplicity.

---

### 4. Database Layer (Prisma ORM)
Handles all database operations.

- Uses PostgreSQL
- Optimized queries with indexing
- Aggregations using Prisma

---

### 5. Middleware Layer

Includes:

- Authentication (JWT verification)
- Role Based Access Control
- Validation (Zod)
- Security (rate limiting, sanitization)

---

### 6. Utility Layer

Includes reusable helpers such as:

- Caching system (in-memory)
- Query sanitization

---

## Request Flow

Client Request  
- Route  
- Middleware (Auth + RBAC + Validation)  
- Controller  
- Database (Prisma)  
- Response  

---

## Design Decisions

- Used Prisma for type safe DB access
- Implemented RBAC via middleware for clean separation
- Added caching only for aggregation heavy endpoint
- Used pagination and filtering for scalability
- Applied indexing based on query patterns

This design ensures the system is clean, scalable, and easy to extend.

---

# FEATURES

- Authentication using JWT
- Role Based Access Control (Viewer, Analyst, Admin)
- Financial Transactions CRUD
- Dashboard Summary APIs (aggregations)
- Filtering & Pagination
- Security (rate limiting, input sanitization)
- Unit Testing using Jest
- Prisma ORM with PostgreSQL (Supabase)

---

# OPTIMIZATIONS

- Pagination
- Filtering
- Parallel DB Queries
- Dashboard Caching
- Cache Invalidation
- Input Validation using Zod schemas
- Rate Limiting
- Role Based Access Controll
- Efficient Data Modeling (Prisma + postgresql)

---

# TECH STACK

- Backend: Node.js, Express.js
- Database: PostgreSQL (Supabase)
- ORM: Prisma
- Authentication: JWT + bcrypt
- Testing: Jest + Supertest
- Security: Helmet, Rate Limiting

---

# PAGINATION & FILTERING
QUERY PARAMS

- page (default: 1)
- limit (default: 10)
- type (INCOME / EXPENSE)
- category
- startDate
- endDate

---

# Security Features

- Rate limiting to prevent abuse
- Input sanitization
- Protected routes with JWT
- Password hashing
- Proper HTTP status codes

---

# Testing

- Unit & integration tests using Jest
- Auth flow tested:
    Register user
    Login user
    Invalid credentials handling
    Protected route access
