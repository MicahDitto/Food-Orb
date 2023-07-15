import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { HttpClientModule } from "@angular/common/http"

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { RegistrationPageComponent } from './pages/registration-page/registration-page.component';
import { HeaderComponent } from './components/header/header.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { AddressListComponent } from './components/address-list/address-list.component';
import { AddAddressComponent } from './components/add-address/add-address.component';
import { PaymentsComponent } from './components/payments/payments.component';
import { AddPaymentComponent } from './components/add-payment/add-payment.component';
import { UsersPageComponent } from './pages/users-page/users-page.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { OrdersPageComponent } from './pages/orders-page/orders-page.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { CancelOrderComponent } from './components/cancel-order/cancel-order.component';
import { FoodSearchPipe } from './pipes/food-search.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    LoginFormComponent,
    HomePageComponent,
    NotFoundComponent,
    ProfilePageComponent,
    RegistrationPageComponent,
    HeaderComponent,
    ForgotPasswordComponent,
    SettingsComponent,
    AddressListComponent,
    AddAddressComponent,
    PaymentsComponent,
    AddPaymentComponent,
    UsersPageComponent,
    CartPageComponent,
    OrdersPageComponent,
    OrderDetailsComponent,
    CancelOrderComponent,
    FoodSearchPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
