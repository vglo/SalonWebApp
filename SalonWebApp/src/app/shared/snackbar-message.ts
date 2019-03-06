import {Injectable} from '@angular/core';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material';

@Injectable(
  {providedIn:'root'}
)
export class SnackBarMessage {
  constructor(private snackbar: MatSnackBar) {}

  public openSnackBar(
      message, action = 'Got it.', options: MatSnackBarConfig = {
        duration: 5000,
        panelClass: [],
        verticalPosition: 'bottom',
      }) {
    this.snackbar.open(message, action, options);
  }
}
