# Food-Orb Cleanup Requirements

This document outlines the cleanup tasks organized by priority and category.

---

## Phase 1: Critical Bugs (Must Fix)

### 1.1 Storage Inconsistency Bug
**Location:** `src/app/services/user.service.ts`
- **Issue:** Login stores token in `localStorage` (line 17), but logout removes from `sessionStorage` (lines 41-42)
- **Impact:** Logout is broken - users can't actually log out
- **Fix:** Change logout to use `localStorage.removeItem()` consistently

### 1.2 Invalid Route Navigation
**Location:** `src/app/services/user.service.ts:52`
- **Issue:** Navigates to `/api/v1/settings` which doesn't exist
- **Fix:** Change to `/settings`

### 1.3 Missing Route Definition
**Location:** `src/app/services/user.service.ts:25,35`
- **Issue:** Navigates to `/not-authorized` but route is not defined in `app-routing.module.ts`
- **Fix:** Add route or change navigation target

---

## Phase 2: Code Quality

### 2.1 Remove Dead/Commented Code

| File | Lines | Description |
|------|-------|-------------|
| `pages/home-page/home-page.component.ts` | 14 | Unused `names` array |
| `pages/home-page/home-page.component.ts` | 17-35 | Commented-out mock data |
| `services/cart.service.ts` | 11 | Unused `data` property |
| `services/cart.service.ts` | 17-34 | Commented-out code |
| `pages/registration-page/registration-page.component.ts` | 34-60 | Commented-out FormGroup |
| `components/add-address/add-address.component.ts` | 34-40 | Commented-out getter |
| `pipes/food-search.pipe.ts` | 1 | Commented-out import |

### 2.2 Remove Unused Imports

| File | Import | Line |
|------|--------|------|
| `pages/home-page/home-page.component.ts` | `IfStmt` | 4 |
| `pages/home-page/home-page.component.ts` | `IRestaurant` | 3 |
| `components/login-form/login-form.component.ts` | `HeaderComponent` | 3 |
| `pages/cart-page/cart-page.component.ts` | `users from db.json` | 2 |

### 2.3 Fix Invalid Constructor Syntax

| File | Issue |
|------|-------|
| `pages/cart-page/cart-page.component.ts:22` | Label syntax `userList: users` instead of assignment |
| `pages/users-page/users-page.component.ts:14` | Same label syntax issue |

### 2.4 Remove Unused Variables

| File | Variable | Line |
|------|----------|------|
| `components/login-form/login-form.component.ts` | `header: HeaderComponent` | 17 |
| `pages/users-page/users-page.component.ts` | `users: IUser[] = []` | 11 |

---

## Phase 3: Architecture Improvements

### 3.1 Fix Service Subscription Pattern
**Location:** `src/app/services/user.service.ts`
- **Issue:** Methods subscribe internally but return Subscription objects
- **Best Practice:** Services should return Observables; components handle subscriptions
- **Affected Methods:** `login()`, `register()`, `addAddressToUser()`, `updateAddresses()`

### 3.2 Add Type Safety
**Files to update:**
- `user.service.ts` - Type all parameters and responses
- `cart.service.ts` - Type `cart` array as `IFood[]`, type `addToCart(value)`
- `food-search.pipe.ts` - Return type should be `IFood[]` not `any`
- `add-address.component.ts` - Type `addressList`

### 3.3 Fix Direct DOM Manipulation
**Location:** `components/header/header.component.ts:18`
- **Issue:** Uses `document.getElementById()`
- **Fix:** Use `@ViewChild` or template reference variables

### 3.4 Create Storage Abstraction
- Create `StorageService` to wrap localStorage/sessionStorage
- Replace direct `window.localStorage` and `window.sessionStorage` calls
- Improves testability and SSR compatibility

---

## Phase 4: Functionality Completion

### 4.1 Implement Stub Methods

| File | Method | Current State |
|------|--------|---------------|
| `components/add-payment/add-payment.component.ts` | `addPayment()` | Empty |
| `pages/cart-page/cart-page.component.ts` | `createOrder()` | Empty |
| `pages/forgot-password/forgot-password.component.ts` | `findEmail()` | Only commented code |
| `pages/home-page/home-page.component.ts` | `confirmOrder()` | Has TODO comment |

### 4.2 Replace Hardcoded Data

| File | Description |
|------|-------------|
| `pages/orders-page/orders-page.component.ts` | Hardcoded order data |
| `components/order-details/order-details.component.ts` | Hardcoded order details |

### 4.3 Evaluate Empty Components
Decide: implement or remove?
- `pages/login-page/login-page.component.ts`
- `pages/settings/settings.component.ts`
- `components/address-list/address-list.component.ts`
- `components/payments/payments.component.ts`
- `components/cancel-order/cancel-order.component.ts`

---

## Phase 5: Memory Leak Prevention

### 5.1 Add Subscription Cleanup
Components with subscriptions need `OnDestroy` and unsubscribe logic:
- `pages/home-page/home-page.component.ts`
- `components/add-address/add-address.component.ts`

Options:
- Use `async` pipe in templates
- Use `takeUntil` pattern with destroy subject
- Store and unsubscribe manually

---

## Phase 6: Routing Cleanup

### 6.1 Remove Uncertain/Dead Routes
**Location:** `app-routing.module.ts`
- Line 24: Route with "Maybe?" comment - decide if needed
- Line 32: Commented `friends` route - remove if not needed

---

## Phase 7: Tooling Updates (Optional)

### 7.1 Migrate from TSLint to ESLint
- TSLint is deprecated
- Remove `tslint`, `codelyzer` packages
- Add `@angular-eslint/*` packages

### 7.2 Replace Protractor
- Protractor is deprecated
- Consider migrating to Cypress or Playwright

---

## Progress Tracking

| Phase | Status | Notes |
|-------|--------|-------|
| Phase 1: Critical Bugs | Complete | Fixed storage, route navigation, auth redirects |
| Phase 2: Code Quality | Complete | Removed dead code, unused imports, fixed constructors |
| Phase 3: Architecture | Complete | Fixed subscriptions, added types, created StorageService |
| Phase 4: Functionality | Complete | Implemented OrderService, stub methods, address/payment components |
| Phase 5: Memory Leaks | **POSTPONED** | On hold until UI work complete |
| Phase 6: Routing | **POSTPONED** | On hold until UI work complete |
| Phase 7: Tooling | **POSTPONED** | Optional - on hold until UI work complete |

---

## UI & Functionality Work (Current Priority)

**Status:** In Progress

The following UI/functionality work takes priority over remaining cleanup phases:

### Authentication
- [ ] Fix Login functionality
- [ ] Fix Register functionality

### Core User Flow
The app should support this flow:
1. **Search/Browse** - User searches for food they want on home page
2. **Pick Restaurant** - User selects from restaurant options offering that food
3. **Order from Menu** - User browses restaurant menu and adds items to cart
4. **Checkout** - User proceeds to checkout
5. **Payment** - User selects or adds a payment method
6. **Confirm Order** - User confirms and places the order

### Specific Pages to Fix
- [ ] Home/Search page - needs working search functionality
- [ ] Orders page - currently non-functional

### Mock Data Needed
- [ ] Food items with variety of options
- [ ] Placeholder images for food items
- [ ] Restaurant data

---

## Notes

- **UI work takes priority** - Resume cleanup phases (5, 6, 7) after UI is complete
- Run `npm run lint` and `npm test` after each phase
- Commit after completing each phase
