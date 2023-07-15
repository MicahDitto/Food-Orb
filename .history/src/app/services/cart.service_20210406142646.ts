import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IFood } from '../interfaces/ifood';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public data:{}
  cart = [];
  private url: string = "http://localhost:3000/foods"; //"http://localhost:3000/foods"
  
  constructor( private http: HttpClient) { }

// getFoods(): Observable<IFood[]>{
//     return this.http.get<IFood[]>(this.url)
//     // .map(res => res.json());
    
//   }

  getFoods() {
    return this.http.get(this.url)
    // .map(res => res.json());
    
  }
  // getFoods() {
  //   return this.http.get<{ foodID: number, foodName: string, restaurant: string, description: string, price: number}  []>
  //   // return this.http.get("http://localhost:3000/foods"))
    
  //   ('/data/db.json');
    
  //   // this.url = "http://localhost:3000/foods"
  // }

  
  private handleError(error: any) {
    let errMsg: string;
    errMsg = error.message ? error.message :  error.toString();
    console.log(errMsg);
    return Observable.throw(errMsg);
  }

  addToCart(value){
      this.cart.push(value)
  }

  getItemsFromCart() {
    return this.cart;
  }

  clearCart(){
    this.cart = [];
  }
}
