import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { PersonInterface } from "../../../../abstractions/models/person.model";

@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddPersonComponent {
  public newPerson: Omit<PersonInterface, 'id'> = {
    firstName: '',
    lastName: ''
  };

  constructor(
    private _dialogRef: MatDialogRef<AddPersonComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: PersonInterface,
  ) {
    if (data) {
      this.newPerson = { ...data };
    }
  }

  public cancel(): void {
    this._dialogRef.close();
  }
}
