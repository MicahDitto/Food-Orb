import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'foodorb-add-payment',
  templateUrl: './add-payment.component.html',
  styleUrls: ['./add-payment.component.scss']
})
export class AddPaymentComponent implements OnInit {

  newPaymentForm = {
    name: "",
    card: "",
    date: "",
    cvc: "",
  }

  constructor() { }

  ngOnInit(): void {
  }
  addPayment() {
    
  }

  get name() {
    return this.newPaymentForm.name;
  }
  get card() {
    return this.newPaymentForm.card;
  }
  get date() {
    return this.newPaymentForm.date;
  }
  get cvc() {
    return this.newPaymentForm.cvc;
  }
}
