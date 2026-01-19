import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { RegistrationPageComponent } from './pages/registration-page/registration-page.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { UsersPageComponent } from './pages/users-page/users-page.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';
import { OrdersPageComponent } from './pages/orders-page/orders-page.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { CancelOrderComponent } from './components/cancel-order/cancel-order.component';

const routes: Routes = [
  { path: "", component: HomePageComponent },
  { path: "login", component: LoginPageComponent },
  { path: "profile", component: ProfilePageComponent, canActivate: [AuthGuard]},
  { path: "register", component: RegistrationPageComponent },
  { path: "forgotpassword", component: ForgotPasswordComponent },
  { path: "users", component: UsersPageComponent },
  { path: "users/:user_id", component: ProfilePageComponent },
  { path: "settings", component: SettingsComponent },
  { path: "cart", component: CartPageComponent },
  { path: "checkout", component: CheckoutPageComponent },
  { path: "orders", component: OrdersPageComponent },
  { path: "tracking", redirectTo: "orders" },
  { path: "orders/:order_id", component: OrderDetailsComponent },
  { path: "orders/cancel", component: CancelOrderComponent },

  { path: "**", component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
