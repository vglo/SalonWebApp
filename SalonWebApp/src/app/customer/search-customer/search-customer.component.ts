import { CustomerInfoResponse } from 'src/app/customer/interfaces/response/customer-registration-response.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-customer',
  templateUrl: './search-customer.component.html',
  styleUrls: ['./search-customer.component.scss']
})
export class SearchCustomerComponent implements OnInit {


  customerInfo: CustomerInfoResponse;

  constructor() { }

  ngOnInit() {
  }

  infoChanged(customerInfo:CustomerInfoResponse){
    this.customerInfo=customerInfo;
  }

}
