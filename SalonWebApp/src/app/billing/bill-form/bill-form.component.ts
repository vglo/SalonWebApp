import { Subject } from 'rxjs';
import { State, getShopId } from './../../reducers/index';
import { Component, OnInit, Output, EventEmitter, Input, AfterViewInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl, NgModel } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import {SalonServiesResponse} from '../interfaces/response/salon-servies-response.model';
import { BillingServiceService } from '../services/billing-service/billing-service.service';
import { Store } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';



export interface billFormTemplate {
  particular: string;
  rate: number;
  quantity?: number;
  amount?: number;
}


export interface BillCalculations{
  total: number;
  discount: number;
}

@Component({
  selector: 'app-bill-form',
  templateUrl: './bill-form.component.html',
  styleUrls: ['./bill-form.component.scss']
})
export class BillFormComponent implements OnInit, OnDestroy {


  @Input('formGroup')
  billForm: FormGroup;

  @Output('formGroupChange')
  formGroupChange: EventEmitter<FormGroup> = new EventEmitter();

  @Output('onFormSubmit') formSubmitEvent: EventEmitter<any> = new EventEmitter();

  @Output('formDataChange') formDataChange: EventEmitter<billFormTemplate[]> = new EventEmitter();

  @Input('formData')
  formData: billFormTemplate[] = [];

  @Input('total')
  total: number;

  @Output('totalChange')
  totalChange: EventEmitter<number> = new EventEmitter();

  @ViewChild('discountType')
  discountType;

  @ViewChild('discountValue')
  discountValue : ElementRef;

  @Input('discount')
  discount: number = 0;

  @Output('discountChange')
  discountChange : EventEmitter<number> = new EventEmitter();

  @Input('billTotal')
  billCalulation: BillCalculations = {total:0,discount:0};

  @Output('billTotalChange')
  billCalculationsChange : EventEmitter<BillCalculations> =  new EventEmitter();

  unsubscribe: Subject<void> =new Subject();

  shopId;

  salonServices: SalonServiesResponse[] = [];

  constructor(private formBuilder: FormBuilder, private billingService: BillingServiceService,
      private store: Store<State>) { }

  ngOnInit() {
    this.initForm();
    this.store.select(getShopId).pipe(takeUntil(this.unsubscribe)).subscribe(id => this.shopId=id);
    this.populateSalonServices();
  }

  ngOnDestroy(){
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  populateSalonServices(){
    this.billingService.getSalonServices(this.shopId).pipe(takeUntil(this.unsubscribe)).subscribe(
      res => {
        this.salonServices = res;
      }
    );
  }

  initForm() {
    this.billForm = this.formBuilder.group({
      particulars: this.formBuilder.array([]),
      discount: this.discount
    });
    this.billForm.valueChanges.subscribe(value => {
      this.formDataChange.emit(value);
      this.formGroupChange.emit(this.billForm);
      this.submitForm();
    });
  }


  // Add Particular to the bill.
  addParticular() {
    const particulars = this.getParticulars();
    particulars.push(this.createBillParticular());
  }

  // Remove Particular from the bill.
  removeParticular(index: number) {
    const particulars = this.getParticulars();
    particulars.removeAt(index);
    this.calculateTotal();
  }

  // Creates the template for the particulars.
  createBillParticular(initParticular: billFormTemplate = {
    particular: '',
    rate: 0,
    quantity: 1,
    amount: 0
  }) {
    return this.formBuilder.group({
      particular: [initParticular.particular, [Validators.required]],
      rate: [initParticular.rate, [Validators.required]],
      quantity: [initParticular.quantity, [Validators.required, Validators.min(1)]],
      amount: [initParticular.rate * initParticular.quantity, [Validators.min(0)]]
    });
  }


  // Change the rate of particular-field as per selected service item.
  changeRate(index: number, selected) {
    const particulars = <FormGroup>this.getParticulars().controls[index];
    const service = this.salonServices.find(service => service.idSalonService === selected.value);
    (<FormControl>particulars.controls['rate']).setValue(service.price);
    this.calculateAmount(index);
  }


  changeQuantity(index, value) {
    this.calculateAmount(index);
  }

  calculateAmount(index) {
    const particulars = <FormGroup>this.getParticulars().controls[index];
    const rate = (<FormControl>particulars.controls['rate']).value;
    const quantity = (<FormControl>particulars.controls['quantity']).value;
    (<FormControl>particulars.controls['amount']).setValue(rate * quantity);
    this.calculateTotal();
  }


  calculateTotal() {
    this.total = 0;
    const particulars = <FormArray>this.getParticulars();
    const particluarsList = <billFormTemplate[]>particulars.value;
    particluarsList.forEach(particular => {
      this.total += particular.amount
    });
    this.totalChange.emit(this.total);
    this.calculateDiscount();
  }

  calculateDiscount() {
    const type = this.discountType.value;
    this.discount=0;
    if (type !== undefined) {
      let discountVal = 0;
      if (type === 'percent') {
        discountVal = (this.discountValue.nativeElement.value/100) * this.total;
      }
      else {
        discountVal = this.discountValue.nativeElement.value;
      }
      this.discount = discountVal;
    }
    if(this.discountValue.nativeElement.value <0){
      this.discount=0;
    }
    this.discountChange.emit(this.discount);
    this.emitCalculations();
  }

  emitCalculations(){
    this.billCalulation.total=this.total;
    this.billCalulation.discount=this.discount;
    this.billCalculationsChange.emit(this.billCalulation);
  }

  createFormSubmitValues(): Array<any> {
    const particulars = this.getParticulars().controls;
    const particularsMap = particulars.map((particular, index) => {
      const part = {};
      const baseKey = 'billHasService[' + index + ']';
      part[baseKey + '.serviceId'] = (<FormGroup>particular).controls['particular'].value;
      part[baseKey + '.amount'] = (<FormGroup>particular).controls['amount'].value;
      part[baseKey + '.quant'] = (<FormGroup>particular).controls['quantity'].value;
      part[baseKey + '.rate'] = (<FormGroup>particular).controls['rate'].value;
      return part;
    });
    return particularsMap;
  }

  submitForm() {
    let formData = {};
    this.createFormSubmitValues().forEach(value => {
      formData = Object.assign(formData, value);
    });
    formData = Object.assign(formData, { discount: this.discount });
    this.formSubmitEvent.emit(formData);
  }

  /**
   *
   * Returns particular's list from the bill form.
   * @returns {FormArray}
   * @memberof BillFormComponent
   */
  getParticulars(): FormArray {
    return <FormArray>this.billForm.controls['particulars'];
  }

  getControls(formGroup: FormGroup, key: string) {
    return (<FormArray>formGroup.controls[key]).controls;

  }


}
