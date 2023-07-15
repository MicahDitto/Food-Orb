import { Component, OnInit } from '@angular/core';
import { IFood } from 'src/app/interfaces/ifood';
import { IRestaurant } from 'src/app/interfaces/irestaurant';
import { IfStmt } from '@angular/compiler';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'foodorb-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  names = ["a", "abc", "def", "xyz"];
  searchValue = "";

  // foodList: IFood[] = [
  // { foodID: 1, foodName: "chicken", restaurant: "McDonalds", description: "Large juicy chicken nuggets breaded or battered, then deep-fried or baked.", price: 10},  
  // { foodID: 2, foodName: "burger", restaurant: "McDonalds", description: "One or more cooked patties of ground meat, usually beef, placed inside a sliced bread roll or bun", price: 10},  
  // { foodID: 3, foodName: "salad", restaurant: "McDonalds", description: "Bean salad, tuna salad, fattoush, Greek salad (vegetable-based, but without leafy greens), and sōmen salad (a noodle-based salad", price: 10},  
  // { foodID: 4, foodName: "milkshake", restaurant: "McDonalds", description: "Coming in a variety of different flavors, this dairy drink is sure to delight.", price: 10},  
  // { foodID: 5, foodName: "gyros", restaurant: "McDonalds",  description: "Greek cooked chicken, rice, and vegetables on a soft peta bread, topped with special sauces.", price: 10},  
  // { foodID: 6, foodName: "pizza", restaurant: "McDonalds", description: "Buffalo Chicken, Peparonni, Hawaiian, Supreme, Meat-lovers...", price: 10},
  // { foodID: 7, foodName: "sub", restaurant: "McDonalds", description: "Meat, cheese, veggies, toppings, on your choice of a variety of different breads.", price: 10}   
  // ] 

  // restaurantList: IRestaurant[] = [
  //   {restaurantID: 1, restaurantName: "McDonalds", menu: this.foodList, address: "", phone: "" },
  //   {restaurantID: 2, restaurantName: "McDonalds", menu: this.foodList, address: "", phone: "" },
  //   {restaurantID: 3, restaurantName: "McDonalds", menu: this.foodList, address: "", phone: "" },
  //   {restaurantID: 4, restaurantName: "McDonalds", menu: this.foodList, address: "", phone: "" },
  //   {restaurantID: 5, restaurantName: "McDonalds", menu: this.foodList, address: "", phone: "" },
  //   {restaurantID: 6, restaurantName: "McDonalds", menu: this.foodList, address: "", phone: "" },
    
  // ]
  
  
  foodList: IFood[]= []
  

  constructor(private cartService: CartService) { }

  confirmCart(item) { //IFood
    if(confirm("Confirm add "+item.restaurant+" "+item.foodName+ " to cart?")) {
      this.addToCart(item)
    }
  }
  confirmOrder(item) { //IFood
    if(confirm("Confirm purchase: \n\n Item: "+item.restaurant+" "+item.foodName+ "\n Card: default \n Address: default \n\n Do you wish to proceed?")) {
      console.log("Implement add to cart functionality here");
    }
  }
  addToCart(product) {
    this.cartService.addToCart(product);
    window.alert('Your product has been added to the cart!');
  }
  
  ngOnInit(): void {
    this.cartService.getFoods().subscribe((response: any) => 
    this.foodList = response)
    console.log(this.foodList);
  }

}
