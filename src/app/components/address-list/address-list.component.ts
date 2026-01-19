import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';

interface Address {
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
}

@Component({
  selector: 'foodorb-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.scss']
})
export class AddressListComponent implements OnInit {

  addresses: Address[] = [];

  constructor(private storage: StorageService) {}

  ngOnInit(): void {
    this.loadAddresses();
  }

  loadAddresses(): void {
    const addressesJson = this.storage.getItem('addresses');
    this.addresses = addressesJson ? JSON.parse(addressesJson) : [];
  }

  removeAddress(index: number): void {
    this.addresses.splice(index, 1);
    this.storage.setItem('addresses', JSON.stringify(this.addresses));
  }

  formatAddress(addr: Address): string {
    return `${addr.address}, ${addr.city}, ${addr.state} ${addr.zip}`;
  }
}
