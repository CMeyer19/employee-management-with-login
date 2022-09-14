import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

export interface IConfirmationDialogData {
  title: string;
  message: string;
  resolveText: string;
  rejectText: string;
}

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmationDialogComponent {
  public title: string = '';
  public message: string = '';
  public resolveText: string = '';
  public rejectText: string = '';

  constructor(
    private _dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: IConfirmationDialogData,
  ) {
    if (!data) return;

    this.title = data.title;
    this.message = data.message;
    this.resolveText = data.resolveText;
    this.rejectText = data.rejectText;
  }
}
