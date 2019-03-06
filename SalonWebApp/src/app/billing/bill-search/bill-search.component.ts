import { Component, OnInit } from '@angular/core';
import { BillResponse, BillHasService } from '../interfaces/response/bill-response.model';

@Component({
  selector: 'app-bill-search',
  templateUrl: './bill-search.component.html',
  styleUrls: ['./bill-search.component.scss']
})
export class BillSearchComponent implements OnInit {

  billFormData: BillResponse;

  constructor() { }

  ngOnInit() {
  }

  setBillInfo(billData: BillResponse){
    this.billFormData = billData;
  }

}
