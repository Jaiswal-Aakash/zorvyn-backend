DEPLOYED LINK - https://zorvyn-backend-i7o7.onrender.com/

# Auth API

Method : POST
Endpoint : /api/auth/register
Body : { email, password, role }
Required Role : Admin
Description : Create a new user

Method : POST
Endpoint : /api/auth/login
Body : { email, password }
Required Role : Viewer, Analyst, Admin
Description : Login and get JWT

# Transaction API

Method : GET
Endpoint : /api/transactions
Query : ?page=1&limit=10&type=INCOME  (example)
Required Role : Viewer, Analyst, Admin
Description : Get paginated & filtered transactions

Method : POST
Endpoint : /api/transactions
Body : { amount, type, category, date, notes }
Required Role : Analyst, Admin
Description : Create a transaction

Method : PUT
Endpoint : /api/transactions/:id
Body : { amount, type, category, date, notes }
Required Role : Admin
Description : Update a transaction

Method : DELETE
Endpoint : /api/transactions/:id
Body : ---
Required Role : Admin
Description : Delete a transaction

# Dashboard API

Method : GET
Endpoint : /api/dashboard/summary
Body : ---
Required Role : Viewer, Analyst, Admin
Description : Aggregated dashboard data

# User API

Method : GET
Endpoint : /api/users/
Body : ---
Required Role : Admin
Description : Get All User

Method : PATCH
Endpoint : /api/users/:id/role
Body : { role }
Required Role : Admin
Description : Update Role

Method : PATCH
Endpoint : /api/users/:id/status
Body : { status }
Required Role : Admin
Description : Update status


