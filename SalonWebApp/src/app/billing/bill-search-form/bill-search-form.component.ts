import { Observable, Subject } from 'rxjs';
import { BillResponse } from './../interfaces/response/bill-response.model';
import { State, getShopId } from './../../reducers/index';
import { Store } from '@ngrx/store';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { takeUntil, startWith, map } from 'rxjs/operators';
import { BillingServiceService } from '../services/billing-service/billing-service.service';

@Component({
  selector: 'app-bill-search-form',
  templateUrl: './bill-search-form.component.html',
  styleUrls: ['./bill-search-form.component.scss']
})
export class BillSearchFormComponent implements OnInit, OnDestroy {

  filteredOptions: Observable<BillResponse[]>;

  unsubscribe: Subject<void> = new Subject();

  @Input('formGroup')
  billInfo: FormGroup = new FormGroup({});

  @Output('formGroupChange')
  billInfoChange: EventEmitter<FormGroup> = new EventEmitter();

  billList: BillResponse[] = [];

  @Input('billInfo')
  billInfoData: BillResponse;

  @Output('billInfoChange')
  billInfoDataChange: EventEmitter<BillResponse> = new EventEmitter();

  shopId;

  constructor(private store: Store<State>,
    private formBuilder: FormBuilder,
    private billingService: BillingServiceService) { }


  ngOnInit() {
    this.billInfo = this.formBuilder.group({
      bill: ['', Validators.required]
    });
    this.store.select(getShopId).pipe(takeUntil(this.unsubscribe)).subscribe(id => this.shopId = id);

    this.billInfo.valueChanges.pipe(takeUntil(this.unsubscribe)).subscribe(() => this.billInfoChange.emit(this.billInfo));

    this.billingService.getAllBills(this.shopId).pipe(takeUntil(this.unsubscribe)).subscribe(bills => {
      this.billList = bills;
      this.setupFilter();
    });
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  setupFilter() {
    this.filteredOptions = this.billInfo.valueChanges.pipe(startWith(''), map(value => {
      return this.billList.filter(opt => opt.billNo.toString().startsWith(value.bill)
        || opt.customerinfo.firstName.includes(value.bill) || opt.customerinfo.lastName.includes(value.billng)
      );
    }));
  }

  setBillInfo() {
    this.billInfoDataChange.emit(this.billInfo.controls['bill'].value);
  }

  billSelectDisplay(billInfo: BillResponse) {
    return billInfo ? billInfo.billNo : undefined;
  }

}