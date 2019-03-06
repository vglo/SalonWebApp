import { ActivatedRoute, Router } from '@angular/router';
import { State, getShopId } from './../../reducers/index';
import { BillCalculations } from './../bill-form/bill-form.component';
import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ISalonService } from '../interfaces/salon-service.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, from, Subject } from 'rxjs';
import { startWith, map, takeUntil } from 'rxjs/operators';
import { billFormTemplate } from '../bill-form/bill-form.component';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Constants } from 'src/app/shared/constants';
import { HttpParamMapperServiceService } from 'src/app/shared/services/http-param-mapper-service/http-param-mapper-service.service';
import { Store } from '@ngrx/store';
import { AddShopInfoAction } from 'src/app/actions/shop-info.action';
import { SnackBarMessage } from 'src/app/shared/snackbar-message';
import { CustomerInfoResponse } from 'src/app/customer/interfaces/response/customer-registration-response.model';
import { IBillHasService, IBillRequest } from '../interfaces/requests/bill-request.model';
import { PaymentTypeResponse } from '../interfaces/response/payment-type-response.model';
import { BillingServiceService } from '../services/billing-service/billing-service.service';


export interface custInfo {
  name: String;
  id: number;
}

@Component({
  selector: 'app-create-bill',
  templateUrl: './create-bill.component.html',
  styleUrls: ['./create-bill.component.scss']
})
export class CreateBillComponent implements OnInit, OnDestroy {



  billParticulars: billFormTemplate[] = [];

  billForm: FormGroup = new FormGroup({});

  newUserBillForm: FormGroup = new FormGroup({});

  billFormData;

  paymentTypeExistingCustomer: FormGroup = new FormGroup({});
  paymentTypeNewCustomer: FormGroup = new FormGroup({});

  customerSelectForm: FormGroup;

  filteredOptions: Observable<custInfo[]>;

  paymentTypesOptions: PaymentTypeResponse[];

  billTotal: number = 0;

  grandTotal: number = 0;

  gstPer: number = 0.1;
  discountPer: number = 0.1;

  sgstVal: number = 0;
  cgstVal: number = 0;
  discountVal: number = 0;

  shopId;

  customerInfo: custInfo = {
    id: 0,
    name: ''
  };

  unsubscribe = new Subject<void>();

  customerFormValid: boolean = false;
  customerFormSubmitted: boolean = false;

  customerSearchValid: boolean = false;

  customerSearchForm: FormGroup = new FormGroup({});

  paymentTypeId;

  constructor(private formBuilder: FormBuilder,
    private billingService: BillingServiceService,
    private store: Store<State>,
    private snackbar: SnackBarMessage,
    private route:Router,
    private router: ActivatedRoute) { }

  ngOnInit() {
    this.store.select(getShopId)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(id => this.shopId = id);

    this.initCustomerSelectForm();
    this.intiPaymentTypeForm();
    this.populatePaymentTypes();

  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  populatePaymentTypes() {
    this.billingService.getPaymentTypes(this.shopId).pipe(takeUntil(this.unsubscribe)).subscribe(types => {
      this.paymentTypesOptions = types;
    });
  }


  intiPaymentTypeForm() {
    this.paymentTypeExistingCustomer = this.paymentTypeNewCustomer = this.formBuilder.group({
      type: ['', [Validators.required]]
    });
  }

  initCustomerSelectForm() {
    this.customerSelectForm = this.formBuilder.group({
      customer: ['', [Validators.required]]
    });
  }

  custSelectDisplay(customer: custInfo) {
    return customer ? customer.name : undefined;
  }


  calculateGrandTotal(total: BillCalculations) {
    this.sgstVal = this.cgstVal = 0;
    this.sgstVal = total.total * this.gstPer;
    this.cgstVal = total.total * this.gstPer;
    this.discountVal = total.discount;
    this.grandTotal = total.total + this.cgstVal + this.sgstVal - this.discountVal;
  }


  billFormSubmit(value) {
    this.billFormData = value;
  }

  /**
  *Submit the form.
  *
  * @memberof CreateBillComponent
  */
  submitForm() {

    const customerInfo: custInfo = this.customerInfo;
    const billHasService: IBillHasService[] = [];
    if (this.billParticulars['particulars'] === undefined) {
      this.snackbar.openSnackBar('Please create proper bill.', 'Done');
      return;
    }
    (<billFormTemplate[]>this.billParticulars['particulars']).forEach(particular => {
      billHasService.push({ serviceId: Number.parseInt(particular.particular), quant: particular.quantity });
    });

    // Create the bill request as per the service format.
    const billRequest: IBillRequest = {
      customerId: this.customerInfo.id,// Add customer id
      shopId: this.shopId, // Add shop id
      serviceStaffId: 12, // Add staff id
      type: this.paymentTypeId, // Payment Type
      discountVal: this.discountVal, // Discount Value
      // descountPer: this.discountPer , // Discount Percentage
      sgstPer: this.gstPer * 100, // sgstPercentage
      cgstPer: this.gstPer * 100, // cgstPercentage
    };

    Object.assign(this.billFormData, billRequest);
    

    this.billingService.saveBill(this.billFormData).pipe(takeUntil(this.unsubscribe)).subscribe(
      res => {
        this.snackbar.openSnackBar('Bill saved. Bill No: ' + res.billNo);
        this.resetForms();
        setTimeout('',5000);
        this.route.navigate(['../view-bill',res.idBill],{relativeTo:this.router});
        
      }
    );

  }

  customerFormSubmit(formValue: CustomerInfoResponse) {
    this.customerFormSubmitted = true;
    this.snackbar.openSnackBar('User saved successfully.');
    this.setCustInfo(formValue);
  }

  customerSearchFormSubmit(formValue) {
    this.setCustInfo(formValue);
    this.customerSearchValid = true;
  }


  resetForms() {
    this.billTotal = this.grandTotal = this.cgstVal = this.sgstVal = this.discountVal = 0;
    this.billForm.reset();
    this.newUserBillForm.reset();
    this.customerSearchForm.reset();
  }


  setCustInfo(customerInfo: CustomerInfoResponse) {
    this.customerInfo = { id: customerInfo.idCustomerInfo, name: customerInfo.firstName + ' ' + customerInfo.lastName };
  }

  setPaymentType(value) {
    this.paymentTypeId = value;
  }

}
