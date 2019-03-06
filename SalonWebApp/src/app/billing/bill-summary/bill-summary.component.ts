import { DatePipe } from '@angular/common';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, from, Observable } from 'rxjs';
import { State, getShopId } from './../../reducers/index';
import { Component, OnInit, AfterViewInit, ViewChild, OnDestroy, ElementRef } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { GoogleChartInterface, GoogleChartComponentInterface } from 'ng2-google-charts/google-charts-interfaces';
import { GoogleChartComponent, ChartSelectEvent } from 'ng2-google-charts';
import { Store } from '@ngrx/store';
import { BillingServiceService } from '../services/billing-service/billing-service.service';
import { takeUntil, groupBy, mergeMap, toArray } from 'rxjs/operators';
import { getMatScrollStrategyAlreadyAttachedError } from '@angular/cdk/overlay/typings/scroll/scroll-strategy';
import { BillResponse } from '../interfaces/response/bill-response.model';
import { MatTableDataSource, MatDialog, MatPaginator } from '@angular/material';
import { ViewBillComponent } from '../view-bill/view-bill.component';
import { ViewBillDialogComponent } from '../view-bill-dialog/view-bill-dialog.component';

declare const google: any;


@Component({
  selector: 'app-bill-summary',
  templateUrl: './bill-summary.component.html',
  styleUrls: ['./bill-summary.component.scss']
})
export class BillSummaryComponent implements OnInit, OnDestroy {
  private static googleLoaded: any;

  @ViewChild('startDate')
  startDate: ElementRef;
  @ViewChild('endDate')
  endDate: ElementRef;

  showLoading: boolean = false;

  shopId;

  bills: BillResponse[];

  unsubscribe: Subject<void> = new Subject();

  @ViewChild('billChart')
  chart: GoogleChartComponent;

  billSummaryData: GoogleChartInterface = {
    chartType: 'LineChart',
    dataTable: [],
    options: { title: 'Bill Summary' }
  };

  @ViewChild(MatPaginator) paginator: MatPaginator;


  billTableColumns = ['position', 'date', 'billNo', 'customer', 'amount'];

  billTableDataSource: MatTableDataSource<BillResponse> = new MatTableDataSource();

  dateRange: FormGroup;

  constructor(private route: ActivatedRoute,
    private store: Store<State>,
    private billingService: BillingServiceService,
    private datePipe: DatePipe,
    private formBuilder: FormBuilder,
    private router: Router,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.shopId = this.route.snapshot.params['id'];
    if (this.shopId === undefined) {
      this.store.select(getShopId).pipe(takeUntil(this.unsubscribe)).subscribe(id => this.shopId = id);
    }
    this.initDateForm();
  }

  initDateForm() {
    this.dateRange = this.formBuilder.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  loadBillChart(data: Observable<BillResponse[]>) {
    if (data !== undefined) {
      this.billSummaryData.dataTable = [['Date', 'Total (INR)']];
      data.pipe(takeUntil(this.unsubscribe)).subscribe(billGroup => {
        let total = 0;
        billGroup.forEach(bill => {
          total += bill.grandTotal;
        });
        this.billSummaryData.dataTable.push([this.datePipe.transform(billGroup[0].date, 'dd-MM-yyyy'), total]);
      });
      this.chart.wrapper.setDataTable(this.billSummaryData.dataTable);
      this.billSummaryData.component.wrapper.draw();
    }

  }


  chartSelected(event: ChartSelectEvent) {
    const selectedDate = event.selectedRowValues[0];
    this.billingService.getAllBillsByDateRange(selectedDate, selectedDate, this.shopId).subscribe(data => {
      this.billTableDataSource.data = data;
      this.billTableDataSource.paginator=this.paginator;
    });
  }

  getFilteredData(): Observable<BillResponse[]> {
    const data = from(this.bills);
    const groupedData = data.pipe(takeUntil(this.unsubscribe), groupBy(bill => bill.date), mergeMap(group => group.pipe(toArray())));
    return groupedData;
  }

  tableRowSelected(data: BillResponse){
    // this.router.navigate(['../view-bill',data.idBill],{relativeTo: this.route});
    this.dialog.open(ViewBillDialogComponent,{
      data: data,
      width:'inherit',
      maxWidth:'80%'
    });
  }

  onRangeChange() {
    const startDate = this.datePipe.transform(this.dateRange.controls['startDate'].value, "dd-MM-yyyy");
    const endDate = this.datePipe.transform(this.dateRange.controls['endDate'].value, "dd-MM-yyyy");
    if (startDate !== null && endDate !== null) {
      this.billingService.getAllBillsByDateRange(startDate, endDate, this.shopId)
        .pipe(takeUntil(this.unsubscribe))
        .subscribe(bills => {
          this.bills = bills;
          this.loadBillChart(this.getFilteredData());
        });
    }
  }

}