# 🩸 Blood Bank Management System

A full-stack **MERN** (MongoDB, Express, React, Node.js) web application that connects **blood donors, hospitals, and blood bank organizations** on a single platform — making it easier to track blood inventory, manage donors, and fulfill emergency blood requests.

**Live demo:** [blood-bank-website-3pqy.onrender.com](https://blood-bank-website-3pqy.onrender.com/login)

---

## 📖 Overview

Blood shortages are often a logistics problem, not a supply problem — donors, hospitals, and blood banks don't have a shared, real-time view of who has what. This project solves that by giving each stakeholder a role-based dashboard:

- **Organizations** (blood banks) log blood coming **in** (from donors) and going **out** (to hospitals), and get a live view of available stock per blood group.
- **Donors** can see their donation history and which organizations they've donated to.
- **Hospitals** can request blood from organizations and track what they've received.
- **Admins** get an overview of all donors, hospitals, and organizations on the platform, with the ability to manage (remove) accounts.

## ✨ Features

- 🔐 JWT-based authentication with bcrypt password hashing
- 👥 Role-based accounts: Admin, Organization, Donor, Hospital
- 📊 Real-time blood inventory calculation (`available = total in − total out`) per blood group, per organization
- 🏥 Hospital-facing request flow with automatic stock validation (can't request more than what's available)
- 📈 Analytics endpoint for dashboard summaries
- 🗂️ Admin panel to view and remove donor / hospital / organization accounts
- 📱 Responsive React front end with Redux Toolkit for state management

## 🛠️ Tech Stack

**Frontend:** React 19, React Router, Redux Toolkit, Axios, React Toastify, React Icons
**Backend:** Node.js, Express 5, MongoDB, Mongoose
**Auth & Security:** JSON Web Tokens (JWT), bcryptjs
**Deployment:** Vercel (frontend + serverless), Render (API)

## 🏗️ Architecture

```
client/                React front end (create-react-app)
  ├─ src/components     Shared UI, layouts, protected/public routes
  ├─ src/redux          Redux Toolkit slices + async thunks (auth, etc.)
  └─ src/services        Axios API client

controllers/            Route handlers (business logic)
middlewares/             authMiddleware (JWT check), adminMiddleware (role check)
models/                  Mongoose schemas — User, Inventory
routes/                  Express routers, grouped by resource
config/db.js             MongoDB connection
server.js                App entry point, serves API + React build
```

### Data model

- **User** — one schema for all account types (`admin`, `organization`, `donar`, `hospital`), differentiated by a `role` field with conditionally-required fields (e.g. `hospitalName` only required when `role === "hospital"`).
- **Inventory** — a single ledger of blood movements. Each record is either `inventoryType: "in"` (donor → organization) or `"out"` (organization → hospital). Current stock is derived by aggregating this ledger rather than storing a running total, so the numbers can never drift out of sync.

## 🔌 API Endpoints

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/api/v1/auth/register` | Register a new account | Public |
| POST | `/api/v1/auth/login` | Log in, returns JWT | Public |
| GET | `/api/v1/auth/current-user` | Get logged-in user's profile | JWT |
| POST | `/api/v1/inventory/create-inventory` | Log a blood in/out record | JWT |
| GET | `/api/v1/inventory/get-inventory` | Full inventory ledger (organization only) | JWT |
| GET | `/api/v1/inventory/get-recent-inventory` | Last 3 records | JWT |
| POST | `/api/v1/inventory/get-inventory-hospital` | Hospital/donor consumption records | JWT |
| GET | `/api/v1/inventory/get-donars` | Donors linked to an organization | JWT |
| GET | `/api/v1/inventory/get-hospital` | Hospitals linked to an organization | JWT |
| GET | `/api/v1/admin/donar-list` | All donor accounts | JWT + Admin |
| GET | `/api/v1/admin/hospital-list` | All hospital accounts | JWT + Admin |
| GET | `/api/v1/admin/org-list` | All organization accounts | JWT + Admin |
| DELETE | `/api/v1/admin/delete-donar/:id` | Remove a donor account | JWT + Admin |
| DELETE | `/api/v1/admin/delete-hospital/:id` | Remove a hospital account | JWT + Admin |
| DELETE | `/api/v1/admin/delete-org/:id` | Remove an organization account | JWT + Admin |

## 🚀 Getting Started

### Prerequisites
- Node.js ≥ 18
- A MongoDB instance (local or MongoDB Atlas)

### Installation

```bash
# clone the repo
git clone https://github.com/shivampilania07/Blood_bank_Website.git
cd Blood_bank_Website

# install server dependencies
npm install

# install client dependencies
cd client && npm install && cd ..
```

### Environment variables

Create a `.env` file in the project root:

```env
PORT=8080
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Create a `.env` file in `client/`:

```env
REACT_APP_BASEURL=http://localhost:8080/api/v1
```

### Run locally

```bash
# runs both server (nodemon) and client (react-scripts) concurrently
npm run dev
```

The client runs on `http://localhost:3000` and proxies API calls to the server on `http://localhost:8080`.

## 🔒 Security Notes

This project handles authentication and role-based access manually (no external auth provider), which was a deliberate choice to understand the mechanics of:

- Password hashing with **bcrypt** before storage — plaintext passwords are never persisted.
- Stateless auth via **JWT**, verified on every protected request in `authMiddleware`.
- A secondary **role check** (`adminMiddleware`) for admin-only routes, which re-verifies the user's role against the database on every request rather than trusting a client-supplied value.
- API responses strip the password hash before returning user objects, so credentials never leave the server.

## 🧭 Known Issues / Roadmap

Being transparent about what's next — this is what I'm actively improving:

- [ ] Add role-based restrictions on who can create "in" vs "out" inventory records (currently any authenticated role can log inventory; this should be limited to `organization` accounts)
- [ ] Add rate limiting on `/auth/login` to reduce brute-force risk
- [ ] Add server-side input validation (e.g. `express-validator` or `zod`) rather than relying solely on Mongoose schema validation
- [ ] Add automated tests (Jest/Supertest for the API, React Testing Library for the client)
- [ ] Move from `localStorage` token storage to `httpOnly` cookies to reduce XSS exposure
- [ ] Add pagination to admin list endpoints

## 📄 License

ISC

---

*Built by [Shivam Pilania](https://github.com/shivampilania07)*
