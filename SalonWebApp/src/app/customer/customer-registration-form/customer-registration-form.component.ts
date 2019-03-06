import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CustomerInfoResponse } from '../interfaces/response/customer-registration-response.model';
import { CustomerService } from '../services/customer-service/customer-service.service';
import { CustomerRegistrationRequest } from '../interfaces/requests/customer-registration-request.model';
import { tassign } from 'tassign';
import { DatePipe } from '@angular/common';
import { SnackBarMessage } from 'src/app/shared/snackbar-message';

@Component({
  selector: 'app-customer-registration-form',
  templateUrl: './customer-registration-form.component.html',
  styleUrls: ['./customer-registration-form.component.scss']
})
export class CustomerRegistrationFormComponent implements OnInit, OnDestroy {


  @Input('valid')
  valid: boolean;

  @Output('validChange')
  validChange: EventEmitter<boolean> = new EventEmitter();

  @Input('formGroup')
  customerRegistrationForm: FormGroup;

  @Output('formGroupChange')
  customerRegistrationFormChange: EventEmitter<FormGroup> = new EventEmitter();


  @Output('formReady')
  formReady: EventEmitter<FormGroup> = new EventEmitter();

  @Output('formSubmitResponse')
  formSubmitResponse: EventEmitter<CustomerInfoResponse> = new EventEmitter();

  unsubscribe: Subject<void> = new Subject();

  constructor(private formBuilder: FormBuilder, private customerService: CustomerService,
    private datePipe: DatePipe, private snackbar: SnackBarMessage) { }

  ngOnInit() {
    this.initForm();
    this.customerRegistrationForm.valueChanges.pipe(takeUntil(this.unsubscribe)).subscribe(() => {
      this.valid = this.customerRegistrationForm.valid;
      if (this.valid) {
        this.formReady.emit(this.customerRegistrationForm);
      }
      this.customerRegistrationFormChange.emit(this.customerRegistrationForm);
      this.validChange.emit(this.valid);
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  initForm() {
    this.customerRegistrationForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: [''],
      mobile: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/), Validators.maxLength(10)]],
      email: ['', Validators.email],
      address: [''],
      dob: ['']
    });
  }


  submitForm() {
    let regForm: CustomerRegistrationRequest = this.customerRegistrationForm.value;
    const dob = this.datePipe.transform(this.customerRegistrationForm.controls['dob'].value, 'dd-MM-yyyy');
    regForm = Object.assign(regForm, { idShopInfo: 1, dob: dob });
    this.customerService.saveCustomer(regForm).subscribe(res => {this.formSubmitResponse.emit(res);
      this.snackbar.openSnackBar('Customer Registered');
    },
      (err: HttpErrorResponse) => {
        if(err.status === 400){
          this.snackbar.openSnackBar('Customer with mobile: '+ regForm.mobile + ' already Registered.')
        }
        else{
          this.snackbar.openSnackBar('Unable to register.');
        }
      });
  }

}
