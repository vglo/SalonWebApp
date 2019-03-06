import { HttpErrorResponse } from '@angular/common/http';
import { SnackBarMessage } from 'src/app/shared/snackbar-message';
import { ActivatedRoute } from '@angular/router';
import { BillHasService } from './../interfaces/response/bill-response.model';
import { State, getShopId } from './../../reducers/index';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { BillResponse } from '../interfaces/response/bill-response.model';
import { Store } from '@ngrx/store';
import { BillingServiceService } from '../services/billing-service/billing-service.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BillEmailRequest } from '../interfaces/requests/bill-email-request.model';

@Component({
  selector: 'app-view-bill',
  templateUrl: './view-bill.component.html',
  styleUrls: ['./view-bill.component.scss']
})
export class ViewBillComponent implements OnInit, OnDestroy {

  _billInfo: BillResponse;

  @Input('billInfo')
  set billInfo(billInfo: BillResponse) {
    this._billInfo = billInfo;
    if (billInfo !== undefined)
      this.tableDataSource = billInfo.billhasservices;
  }

  tableDataSource: BillHasService[];

  displayedColumns: string[] = ['position', 'name', 'rate', 'quantity', 'amount'];

  shopId: number;

  unsubscribe: Subject<void> = new Subject();

  constructor(private store: Store<State>,
    private billingService: BillingServiceService,
    private router: ActivatedRoute,
    private snackbar: SnackBarMessage
  ) { }

  ngOnInit() {
    this.store.select(getShopId).pipe(takeUntil(this.unsubscribe)).subscribe(id => this.shopId = id);
    const billId = this.router.snapshot.params['id'];
    if (billId !== undefined) {
      this.billingService.getBillById(billId, this.shopId).pipe(takeUntil(this.unsubscribe))
        .subscribe(bill => {
          this._billInfo = bill;
          this.tableDataSource = bill.billhasservices;
        });
    }
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  getTotal() {
    return this._billInfo.total;
  }

  sendMail() {
    if (this._billInfo !== undefined) {
      if (this._billInfo.customerinfo.email === undefined || this._billInfo.customerinfo.email === null) {
        this.snackbar.openSnackBar('Email not registered. Cannot send email.');
        return;
      }
      const emailForm: BillEmailRequest = {
        billId: this._billInfo.idBill,
        custId: this._billInfo.customerinfo.idCustomerInfo,
        shopId: this.shopId,
        toEmailId: this._billInfo.customerinfo.email
      }
      this.billingService.sendBillEmail(emailForm).pipe(takeUntil(this.unsubscribe))
        .subscribe(success => {
          this.snackbar.openSnackBar('Email Sent Successfully.');
        }, (err: HttpErrorResponse) => {
          this.snackbar.openSnackBar('Unable to send email');
        })
    }
  }

}
