# Vacation Management Portal

A simple vacation management portal built with **React + Vite** on the frontend and **json-server** as a mock backend. This project demonstrates a basic employee and manager workflow for submitting, approving, and managing vacation requests.

---

## 📌 Quick Links

- [Installation](#-installation)
- [Connecting to the Portal](#-connecting-to-the-portal)
- [Features](#-features)
- [Implementation Notes](#-implementation-notes)
- [Tests](#-tests)
- [Password Privacy & Security Notes](#-password-privacy--security-notes)
- [Future Plans](#-future-plans)

---

## ⚙️ Installation

### Server (Mock Backend)

Install json-server globally if you don’t have it:

`npm install -g json-server`

Start the mock server:

```
cd server
json-server --watch db.json --port 3000
```

> 💡 You can use any port, but if you change it, update the client .env accordingly.

Anytime you need to reset the database, run

```
node reset-db.js
```

### Client

Run the client:

```bash
cd client
npm install
npm run dev
```

This starts the frontend on http://localhost:5173 (default Vite port).

> ⚠️ If you are running json-server on a custom port, update the .env file in the client root with your API URL:

```
VITE_API_URL=http://localhost:YOUR_PORT`
```

Then restart the client. This ensures the frontend points to the correct backend.

---

## 🌐 Connecting to the Portal

You can use the following test users to log in quickly:

| Role       | Username  | Password |
| ---------- | :-------: | :------: |
| _Manager_  | manager1  |  123456  |
| _Employee_ | employee1 |  qwerty  |

_These passwords are intentionally simple for demo purposes and do not follow the portal password rules._

---

## 🚀 Features

### Employee

- Sign in to the portal.

- View a table of submitted vacation requests with status (pending, approved, rejected).

- Create new vacation requests with start/end dates and reason.

- Delete pending requests.

### Manager (inherits Employee features)

All of the above but also:

- Create a new user (role, employee ID, username, email, password).

- View, update, and delete users.

- View all vacation requests from all users.

- Approve or reject pending vacation requests in a dedicated section.

---

## 💡 Implementation Notes

Since this project uses json-server as a mock backend, a few operations are handled on the **client** side:

- **User deletion:** Normally, the server would handle cascading deletes (removing a user and their requests together). Here, it’s done with multiple client requests.
- **User names in requests:** A real API would return joined user data. Here, the client fetches each user name separately.
- **Automtic rejection of old requests:** In a real backend, requests with a start date before today could be automatically marked rejected. With json-server, this logic would need to be handled by the client or a real server.

These are temporary workarounds to keep the setup simple while maintaining realistic behavior.

---

## 🧪 Tests

The project currently includes automated tests for helpers and API functions:

- **Helpers tests:** verify utility functions like date formatting and day counting.
- **API tests:** cover creating, fetching, updating, approving/rejecting, and deleting users and vacation requests using the seed data.

You can run the tests with:

```
cd client
npm test
```

> ⚠️ Important: Make sure the database is reset (node reset-db.js) and json-server is running at API_URL before running tests, as they rely on the seeded data.

- **Future tests**: **Hooks** and **JSX** tests will be added later to cover frontend components and state management.

---

## 🔒 Password Privacy & Security Notes

Passwords in this demo are stored in plaintext due to using json-server and are blurred in the manager dashboard, revealing on hover to protect against casual onlookers.

The blur/reveal is purely visual and does not provide real security. In a real system:

- Passwords would be hashed.

- Plaintext would only be sent from a secure server to authenticated managers.

- Server-side protections like HTTPS and access checks would apply.

Also, all inputs are sanitized on the server-side to prevent malicious code injection.

---

## 🔮 Future Adds

Planned improvements and features:

- More tests, including React hooks and UI components.

- Enhanced table features: sorting, filtering, and username search.

- Session handling to keep users logged in.

- Approve/reject requests with manager info and approval date.

- Automatically mark requests as rejected if start date is before today.

- Count working days instead of total days using a file with non-working days.
