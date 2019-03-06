import { SnackBarMessage } from './../../shared/snackbar-message';
import { HttpErrorResponse } from '@angular/common/http';
import { State, getShopId } from './../../reducers/index';
import { Subject } from 'rxjs';
import { SalonServiesResponse } from './../../billing/interfaces/response/salon-servies-response.model';
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ShopAdminService } from '../services/shop-admin.service';
import { SalonServiceRequest } from '../interfaces/requests/salon-service-request.model';
import { Store } from '@ngrx/store';
import { takeUntil, take } from 'rxjs/operators';

@Component({
  selector: 'app-update-salon-service-dialog',
  templateUrl: './update-salon-service-dialog.component.html',
  styleUrls: ['./update-salon-service-dialog.component.scss']
})
export class UpdateSalonServiceDialogComponent implements OnInit, OnDestroy {

  serviceUpdate: FormGroup;

  unsubscribe: Subject<void> = new Subject();

  shopId;

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: SalonServiesResponse,
    private formBuilder: FormBuilder,
    private adminService: ShopAdminService,
    private bottomSheetRef: MatBottomSheetRef<UpdateSalonServiceDialogComponent>,
    private store: Store<State>,
    private snackbar: SnackBarMessage
    ) { }

  ngOnInit() {

    this.store.select(getShopId).pipe(takeUntil(this.unsubscribe)).subscribe(id => this.shopId = id);

    this.serviceUpdate = this.formBuilder.group({
      name:[this.data.name,Validators.required],
      price:[this.data.price,[Validators.required,Validators.min(0)]]
    });
  }

  ngOnDestroy(){
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }


  submitForm(){
    let formData: SalonServiceRequest = this.serviceUpdate.value;
    formData.serviceId = this.data.idSalonService;
    formData.shopId = this.shopId;
    console.log(formData);
    this.adminService.updateSalonService(formData).pipe(takeUntil(this.unsubscribe))
    .subscribe(success => {
      this.snackbar.openSnackBar('Updated.');
      this.bottomSheetRef.dismiss();
    },(err: HttpErrorResponse)=>{
        this.snackbar.openSnackBar('Unable to update.');
        this.bottomSheetRef.dismiss();
    });
  }

}
