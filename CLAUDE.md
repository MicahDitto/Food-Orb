# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

FoodOrb is an Angular 16 food ordering application. Users can browse foods from various restaurants, register/login, manage addresses and payment methods, add items to cart, and place orders.

## Development Commands

```bash
# Install dependencies
npm install

# Start the mock backend (json-server with auth) - run in first terminal
npm run json-server

# Start Angular dev server - run in second terminal
npm start           # or: ng serve

# Build for production
npm run build

# Run unit tests (Karma/Jasmine)
npm test

# Run e2e tests (Protractor)
npm run e2e

# Run linting
npm run lint
```

**Important:** The app requires the json-server backend running on `localhost:3000` before starting the Angular dev server. The backend provides authentication and data APIs.

## Architecture

### Backend (Mock)

Uses `json-server` with `json-server-auth` middleware. Data is stored in `data/db.json`:
- `/login`, `/register` - Authentication endpoints (json-server-auth)
- `/foods` - Food items catalog
- `/users` - User data including addresses, payments, cart
- `/feed` - Restaurant feed data

Authentication tokens are stored in `localStorage` under key `access-token`.

### Frontend Structure

**Pages** (`src/app/pages/`) - Route-level components:
- `home-page` - Food listing with search filter
- `login-page`, `registration-page`, `forgot-password` - Auth flows
- `profile-page` - User profile view
- `cart-page` - Shopping cart
- `orders-page` - Order history
- `settings` - User settings

**Components** (`src/app/components/`) - Reusable UI:
- `header` - Navigation header
- `login-form` - Login form logic
- `address-list`, `add-address` - Address management
- `payments`, `add-payment` - Payment management
- `order-details`, `cancel-order` - Order views

**Services** (`src/app/services/`):
- `CartService` - Manages cart state (in-memory array) and fetches food data from API
- `UserService` - Handles auth (login/register/logout), user data CRUD

**Guards** (`src/app/guards/`):
- `AuthGuard` - Protects routes requiring authentication (checks for `access-token` in localStorage)

**Pipes** (`src/app/pipes/`):
- `FoodSearchPipe` - Filters food list by name (case-insensitive)

**Interfaces** (`src/app/interfaces/`):
- `IFood` - Food item model (foodID, foodName, restaurant, description, price)
- `IUser` - User model
- `IRestaurant` - Restaurant model

### Routing

Routes are defined in `src/app/app-routing.module.ts`. Protected routes use `canActivate: [AuthGuard]`. The profile route (`/profile`) is the only auth-protected route.

### Styling

Uses Bootstrap 5 for styling. Component-specific styles use SCSS files.
