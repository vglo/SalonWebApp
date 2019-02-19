import { Component, OnInit } from '@angular/core';
import { ISalonService } from '../interfaces/salon-service.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, from } from 'rxjs';
import { startWith, map } from 'rxjs/operators';


export interface custInfo {
  name: String;
  id: number;
}

@Component({
  selector: 'app-create-bill',
  templateUrl: './create-bill.component.html',
  styleUrls: ['./create-bill.component.scss']
})
export class CreateBillComponent implements OnInit {


  billParticulars: ISalonService[] = [];

  billForm: FormGroup = new FormGroup({});

  customerSelectForm: FormGroup;

  filteredOptions: Observable<custInfo[]>;

  options: custInfo[] = [{ name: 'Customer1', id: 1 }, { name: 'Customer2', id: 2 }, { name: 'Customer3', id: 1 }];

  billTotal: number = 0;

  grandTotal: number = 0;

  gstPer: number = 0.1;
  discountPer: number = 0.1;

  sgstVal: number = 0;
  cgstVal: number = 0;
  discountVal: number = 0;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initCustomerSelectForm();
    this.filteredOptions =this.customerSelectForm.valueChanges.pipe(
      startWith(''),
       map(customer => { 
         return this.options.filter(option => option.name.toLowerCase().includes(customer.customerId));
        }));
  }



  initCustomerSelectForm() {
    this.customerSelectForm = this.formBuilder.group({
      customerId: ['', [Validators.required]]
    });
  }

  custSelectDisplay(customer: custInfo) {
    return customer ? customer.name : undefined;
  }


  calculateGrandTotal(total){
    this.sgstVal=this.cgstVal=this.discountVal=0;
    this.sgstVal = total*this.gstPer;
    this.cgstVal = total*this.gstPer;
    this.discountVal= total*this.discountPer;
    this.grandTotal = total + this.cgstVal + this.sgstVal - this.discountVal;
  }

  submitForm() {

  }

}
