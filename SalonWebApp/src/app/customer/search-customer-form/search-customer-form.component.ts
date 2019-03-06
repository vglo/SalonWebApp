import { FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { State, getShopId } from './../../reducers/index';
import { Observable, Subject, from } from 'rxjs';
import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { CustomerInfoResponse } from '../interfaces/response/customer-registration-response.model';
import { Store } from '@ngrx/store';
import { CustomerService } from '../services/customer-service/customer-service.service';
import { takeUntil, startWith, map, take } from 'rxjs/operators';

@Component({
  selector: 'app-search-customer-form',
  templateUrl: './search-customer-form.component.html',
  styleUrls: ['./search-customer-form.component.scss']
})
export class SearchCustomerFormComponent implements OnInit, OnDestroy {

  filteredOptions: Observable<CustomerInfoResponse[]>;

  unsubscribe: Subject<void> = new Subject();

  @Input('formGroup')
  customerInfo: FormGroup = new FormGroup({});

  @Output('formGroupChange')
  customerInfoChange: EventEmitter<FormGroup> = new EventEmitter();

  customerList: CustomerInfoResponse[] = [];

  @Input('customerInfo')
  customerInfoData: CustomerInfoResponse;

  @Output('customerInfoChange')
  customerInfoDataChange: EventEmitter<CustomerInfoResponse> = new EventEmitter();

  shopId;

  constructor(private store: Store<State>, private customerService: CustomerService,
    private formBuilder: FormBuilder) { }


  ngOnInit() {
    this.customerInfo = this.formBuilder.group({
      customer: ['', [Validators.required]]
    });
    this.store.select(getShopId).pipe(takeUntil(this.unsubscribe)).subscribe(id => this.shopId = id);

    this.customerInfo.valueChanges.subscribe(() => this.customerInfoChange.emit(this.customerInfo));

    this.customerService.getAllCustomers(this.shopId).pipe(takeUntil(this.unsubscribe)).subscribe(customers => {
      this.customerList = customers;
      this.setupFilter();
    });

  }

  setupFilter() {
    this.filteredOptions = this.customerInfo.valueChanges.pipe(startWith(''), map(value => {
      return this.customerList.filter(opt => opt.firstName.includes(value.customer) ||
        opt.lastName.includes(value.customer) ||
        opt.mobile.toString().startsWith(value.customer));
    }));
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  custSelectDisplay(customer: CustomerInfoResponse) {
    return customer ? customer.firstName + ' ' + customer.lastName : undefined;
  }


  setCustInfo() {
    this.customerInfoDataChange.emit(this.customerInfo.controls['customer'].value);
  }

}
