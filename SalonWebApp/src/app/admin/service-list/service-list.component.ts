import { SalonServiesResponse } from './../../billing/interfaces/response/salon-servies-response.model';
import { MatTableDataSource, MatBottomSheet } from '@angular/material';
import { Subject } from 'rxjs';
import { SnackBarMessage } from './../../shared/snackbar-message';
import { State, getShopId } from './../../reducers/index';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { BillingServiceService } from 'src/app/billing/services/billing-service/billing-service.service';
import { ShopAdminService } from '../services/shop-admin.service';
import { takeUntil } from 'rxjs/operators';
import { UpdateSalonServiceDialogComponent } from '../update-salon-service-dialog/update-salon-service-dialog.component';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.scss']
})
export class ServiceListComponent implements OnInit, OnDestroy {


  unsubscribe: Subject<void> = new Subject();

  shopId;


  tableDatasource: MatTableDataSource<SalonServiesResponse> = new MatTableDataSource();


  displayedColumns = ['position', 'name', 'price', 'action'];

  constructor(
    private store: Store<State>,
    private snackbar: SnackBarMessage,
    private billingService: BillingServiceService,
    private adminService: ShopAdminService,
    private bottomSheet: MatBottomSheet
  ) { }

  ngOnInit() {
    this.store.select(getShopId).pipe(takeUntil(this.unsubscribe)).subscribe(id => this.shopId = id);
    this.populateTableData();
  }

  populateTableData() {
    this.billingService.getSalonServices(this.shopId).pipe(takeUntil(this.unsubscribe)).subscribe(data => {
      this.tableDatasource.data = data;
    });
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  editService(data: SalonServiesResponse) {
    const editBottomSheetRef = this.bottomSheet.open(UpdateSalonServiceDialogComponent, { data: data });
    editBottomSheetRef.afterDismissed().pipe(takeUntil(this.unsubscribe)).subscribe(()=>{
      this.populateTableData();
    });
  }

}
