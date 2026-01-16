import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'foodorb-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.scss']
})
export class AddAddressComponent implements OnInit {

  addressList: any

  newAddressForm ={
    name: "",
    address: "",
    city: "",
    state: "",
    zip: ""
  }

  userId = window.sessionStorage.getItem("id")
  constructor(private user: UserService) { }

  ngOnInit(): void {
    this.user.getAddressesForUser(this.userId).subscribe((response: any) => {
      this.addressList = response.addresses
    })
  }
  addAddress() {
    this.addressList.push(this.newAddressForm);
    this.user.addAddressToUser(this.addressList, this.userId)
  }
}
