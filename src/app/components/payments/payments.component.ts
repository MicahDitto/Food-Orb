import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';

interface Payment {
  name: string;
  card: string;
  date: string;
  cvc: string;
}

@Component({
  selector: 'foodorb-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {

  payments: Payment[] = [];

  constructor(private storage: StorageService) {}

  ngOnInit(): void {
    this.loadPayments();
  }

  loadPayments(): void {
    const paymentsJson = this.storage.getItem('payments');
    this.payments = paymentsJson ? JSON.parse(paymentsJson) : [];
  }

  removePayment(index: number): void {
    this.payments.splice(index, 1);
    this.storage.setItem('payments', JSON.stringify(this.payments));
  }
}
