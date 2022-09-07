import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { IPerson } from "../../../../abstractions/models/person.model";
import { FormControl, FormGroup, ValidatorFn, Validators } from "@angular/forms";

@Component({
  selector: 'app-upsert-person',
  templateUrl: './upsert-person.component.html',
  styleUrls: ['./upsert-person.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpsertPersonComponent {
  public readonly minCharacterLength: number = 5;
  public readonly maxCharacterLength: number = 50;
  private readonly _baseValidators: ValidatorFn[] = [
    Validators.required,
    Validators.minLength(this.minCharacterLength),
    Validators.maxLength(this.maxCharacterLength)
  ];

  public person: IPerson = {
    id: '',
    firstName: '',
    lastName: ''
  };
  public isEdit: boolean = false;
  public personForm = new FormGroup({
    firstName: new FormControl<string>('', {
      nonNullable: true,
      validators: this._baseValidators
    }),
    lastName: new FormControl<string>('', {
      nonNullable: true,
      validators: this._baseValidators
    }),
  });

  constructor(
    private _dialogRef: MatDialogRef<UpsertPersonComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: IPerson,
  ) {
    if (!data) return;

    this.isEdit = true;
    this.person = { ...data };
    this.personForm.patchValue(this.person);
  }

  public cancel(): void {
    this._dialogRef.close();
  }

  public submit(): void {
    const finalValue: IPerson = {
      ...this.person,
      ...this.personForm.value
    };

    this._dialogRef.close(finalValue);
  }
}
