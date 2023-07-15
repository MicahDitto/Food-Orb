import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private router: Router, private cart: CartService) { }

  login(model : { email : string, password : string }) {
    console.log(model.email)
    return this.http.post("http://localhost:3000/login", model)
      .subscribe((response: any) => {
        window.localStorage.setItem("access-token", response.accessToken)
        this.getUserDetails(model.email)
        // window.localStorage.setItem("name", response.name)
        // window.localStorage.setItem("id", response.id)
        // window.localStorage.setItem("email", response.email)
        this.router.navigateByUrl("");
        return response
      }, () => {
        this.router.navigateByUrl("/not-authorized");
      })
  }

  register(model) {
    return this.http.post("http://localhost:3000/register", model)
      .subscribe((response: any) => {
        this.router.navigateByUrl("/login");
        return response;
      }, () => {
        this.router.navigateByUrl("/not-authorized");
      })
  }

  logout() {
    this.cart.clearCart()
    window.sessionStorage.removeItem("access-token");
    window.sessionStorage.clear();
    window.localStorage.clear();
    this.router.navigateByUrl("/login");
  }

  getUserDetails(userEmail) {
    return this.http.get("http://localhost:3000/users?email=" + userEmail );
  }

  addAddressToUser(model, id) {
    this.router.navigateByUrl("/api/v1/settings");
    return this.http.patch("http://localhost:3000/users" + id, {address : model}).subscribe((response : any) => {
    });
  }

  updateAddresses(model, id) {
    return this.http.patch("http://localhost:3000/users" + id, {address : model}).subscribe((response : any) => {
    });
  }

  getAddressesForUser(id) {
    return this.http.get("http://localhost:3000/users" + id);
  }

}
