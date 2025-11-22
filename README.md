# Fitness Frontend (Angular 17)

This folder contains a lightweight Angular 17 project scaffold for the Fitness Club management app. It includes:

- `auth` module: login & register components
- `user` module: profile & list components
- `shared` module: services, guards, interceptor
- `material.module.ts`: common Angular Material imports

Quick notes:

- Install dependencies: `npm install` (requires Node + npm installed).
- Serve locally: `npm run start` (runs `ng serve`).
- Backend endpoints expected:
  - `POST /api/auth/login` -> { accessToken, refreshToken }
  - `POST /api/auth/register` -> { accessToken, refreshToken }
  - `GET /api/user/me` -> current user
  - `GET /api/user` -> user list

The code includes a simple `AuthService` (stores JWTs in `localStorage`), `AuthInterceptor` (adds `Authorization` header) and `AuthGuard` (checks token expiry). You can extend with token refresh endpoints, forms validation, and Material theming.
