import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { State, getShopId } from './../../reducers/index';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { SnackBarMessage } from 'src/app/shared/snackbar-message';
import { takeUntil } from 'rxjs/operators';
import { ShopAdminService } from '../services/shop-admin.service';
import { SalonServiceRequest } from '../interfaces/requests/salon-service-request.model';
@Component({
  selector: 'app-service-registration',
  templateUrl: './service-registration.component.html',
  styleUrls: ['./service-registration.component.scss']
})
export class ServiceRegistrationComponent implements OnInit, OnDestroy {


  serviceRegistration: FormGroup;

  unsubscribe: Subject<void> = new Subject();

  shopId;

  constructor(private store: Store<State>,
    private formBuilder: FormBuilder,
    private snackbar: SnackBarMessage,
    private shopAdminService: ShopAdminService
  ) { }

  ngOnInit() {
    this.store.select(getShopId).pipe(takeUntil(this.unsubscribe)).subscribe(id => this.shopId = id);
    this.initServiceRegistrationForm();
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  initServiceRegistrationForm() {
    this.serviceRegistration = this.formBuilder.group({
      name: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]]
    });
  }

  submitForm() {
    let formData: SalonServiceRequest = this.serviceRegistration.value;
    formData = Object.assign(formData, { shopId: this.shopId });
    this.shopAdminService.saveSalonService(formData).pipe(takeUntil(this.unsubscribe))
      .subscribe(success =>{
        this.snackbar.openSnackBar('Service saved successfully.');
      },(err: HttpErrorResponse)=>{
        if(err.status === 302){
          this.snackbar.openSnackBar('Service already registered.');
        }
        if(err.status === 400){
          this.snackbar.openSnackBar('Invalid requuest.');
        }
      });
    this.serviceRegistration.reset();
  }

}
