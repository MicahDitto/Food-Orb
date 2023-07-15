import { Component, OnInit } from '@angular/core';
import { IFood } from 'src/app/interfaces/ifood';

@Component({
  selector: 'foodorb-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
// HARDCODED CHANGE 
order: IFood[] = [
  { foodID: 1, foodName: "chicken", restaurant: "McDonalds", description: "Large juicy chicken nuggets breaded or battered, then deep-fried or baked.", price: 10}
]
// HARDCODED CHANGE 
user = {
  address: "101 Placeholder Rd"
}

  constructor() { }

  ngOnInit(): void {
  }
  confirmCancel() {
    if(confirm("Are you sure you want to delete Order #"+this.order+"?")) {
      this.cancelOrder();
    }
  }
  cancelOrder() {
    alert("Your order has been canceled.")

  }
}
