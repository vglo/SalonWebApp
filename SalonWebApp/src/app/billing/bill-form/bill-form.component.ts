import { Component, OnInit, Output, EventEmitter, Input, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { ISalonService } from '../interfaces/salon-service.model'
import { HttpClient } from '@angular/common/http';



export interface billFormTemplate {
  particular: String;
  rate: number;
  quantity?: number;
  amount?: number;
}


@Component({
  selector: 'app-bill-form',
  templateUrl: './bill-form.component.html',
  styleUrls: ['./bill-form.component.scss']
})
export class BillFormComponent implements OnInit {


  @Input('formGroup')
  billForm: FormGroup;

  @Output('formGroupChange')
  formGroupChange: EventEmitter<FormGroup> = new EventEmitter();

  @Output('onFormSubmit') formSubmitEvent: EventEmitter<any> =new EventEmitter();

  @Output('formDataChange') formDataChange: EventEmitter<ISalonService[]> =new EventEmitter();

  @Input('formData')
  formData : ISalonService[] =[];

  @Input('total')
  total: number;

  @Output('totalChange')
  totalChange: EventEmitter<number> = new EventEmitter();


  salonServices: ISalonService[] = [{ id: 1, name: 'HairCut-1', price: 150 }, { id: 2, name: 'HairCut-2', price: 250 }, { id: 3, name: 'Shaving', price: 100 }];

  constructor(private formBuilder: FormBuilder, private http: HttpClient) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.billForm = this.formBuilder.group({
      particulars: this.formBuilder.array([this.createBillParticular()])
    });
    this.billForm.valueChanges.subscribe(value =>{
      this.formDataChange.emit(value);
      this.formGroupChange.emit(this.billForm);
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
  changeRate(index: number,selected) {
    const particulars = <FormGroup>this.getParticulars().controls[index];
    const service=this.salonServices.find(service => service.id === selected.value);
    (<FormControl>particulars.controls['rate']).setValue(service.price);
    this.calculateAmount(index);
  }


  changeQuantity(index,value){
    this.calculateAmount(index);
  }

  calculateAmount(index){
    const particulars = <FormGroup>this.getParticulars().controls[index];
    const rate = (<FormControl>particulars.controls['rate']).value;
    const quantity = (<FormControl>particulars.controls['quantity']).value;
    (<FormControl>particulars.controls['amount']).setValue(rate*quantity);
    this.calculateTotal();
  }


  calculateTotal(){
    this.total=0;
    const particulars = <FormArray>this.getParticulars();
    const particluarsList = <billFormTemplate[]>particulars.value;
    particluarsList.forEach(particular => {
      this.total += particular.amount
    });
    this.totalChange.emit(this.total);
  }

  submitForm(){
    this.formSubmitEvent.emit(this.billForm.value);
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
