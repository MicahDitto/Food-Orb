import { Component, OnInit } from '@angular/core';
import { IFood } from 'src/app/interfaces/ifood';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'foodorb-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  searchValue = "";
  foodList: IFood[] = []
  

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
