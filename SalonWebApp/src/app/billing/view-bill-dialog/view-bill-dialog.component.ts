import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { BillResponse } from '../interfaces/response/bill-response.model';

@Component({
  selector: 'app-view-bill-dialog',
  templateUrl: './view-bill-dialog.component.html',
  styleUrls: ['./view-bill-dialog.component.scss']
})
export class ViewBillDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: BillResponse) { }

  ngOnInit() {
  }

}
