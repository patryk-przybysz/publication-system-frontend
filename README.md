# Publication System Frontend

A React frontend application for the digital publishing platform. This client application provides a user-friendly interface for article submission, user management, and demonstrates Role-Based and Attribute-Based Access Control interactions with the backend API.

This project was originally designed and implemented by our team as part of an academic initiative at **Gdańsk University of Technology**, within the course **_Introduction to Cybersecurity_**. It serves as the frontend companion to our Publication System API, showcasing real-world applications of **RBAC** and **ABAC** access control models.

## 🚀 Quick Start

1. **Prerequisites**: Bun (or Node.js 18+) and [Backend API](https://github.com/varev-dev/publication-system-api) running
   - or set `VITE_ENABLE_API_MOCKING=true` to use MSW instead of the live backend
2. **Clone & Install**:
   ```bash
   git clone https://github.com/patryk-przybysz/publication-system-frontend
   cd publication-system-frontend
   bun install
   ```
3. **Run**: `bun dev` → Opens at `http://localhost:3000`

## 🛠️ Technologies

- **TypeScript**
- **React 19**
- **Vite**
- **TanStack Router & Query**
- **Tailwind CSS v4**
- **Radix UI / Shadcn/UI**

## 🧪 Testing & Mocking

- Run the Vitest suite with `bun run test`
- The repository uses MSW for integration-style tests, and the browser worker can be enabled locally with `VITE_ENABLE_API_MOCKING=true`

## 📁 Project Structure

Project structure inspired by [Bulletproof React](https://github.com/alan2207/bulletproof-react):

```
src/
├── app/                   # Application routing
│   └── routes/            # File-based routes
├── components/            # Reusable UI components
├── features/              # Feature-specific components
├── hooks/                 # Custom React hooks
├── lib/                   # Utility libraries
├── config/                # Configuration files
├── types/                 # TypeScript type definitions
├── utils/                 # Utility functions
└── assets/                # Static assets
```

---

For backend setup and API documentation, see [README.md](https://github.com/varev-dev/publication-system-api/blob/main/README.md).
