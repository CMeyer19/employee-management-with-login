import { ChangeDetectionStrategy, Component } from '@angular/core';
import { KeyValue } from "@angular/common";
import { IPerson } from "../../abstractions/models/person.model";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { UpsertPersonComponent } from "./dialogs/upsert-person/upsert-person.component";
import { Observable, take } from "rxjs";
import { ConfirmationDialogComponent } from "../../dialogs/confirmation-dialog/confirmation-dialog.component";
import { PeopleService } from "./people.service";

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PeopleComponent {
  private readonly _modalConfig: MatDialogConfig = {
    width: '250px',
    height: '350px'
  };

  public readonly columnKeys: Array<keyof IPerson | 'controls'> = ['firstName', 'lastName', 'controls'];
  public readonly columns: Array<KeyValue<keyof IPerson, string>> = [
    {
      key: 'firstName',
      value: 'First Name'
    },
    {
      key: 'lastName',
      value: 'Last Name'
    }
  ];

  public allPeople$: Observable<Array<IPerson>> = this._peopleService.allPeople$;

  constructor(
    private _dialog: MatDialog,
    private _peopleService: PeopleService
  ) {
  }

  public addPerson(): void {
    const dialogRef = this._dialog.open(
      UpsertPersonComponent,
      this._modalConfig
    );

    dialogRef.afterClosed().pipe(take(1)).subscribe(person => {
      if (!person) return;

      this._peopleService.addPerson(person);
    });
  }

  public editPerson(event: any, person: IPerson): void {
    const dialogRef = this._dialog.open(
      UpsertPersonComponent,
      {
        ...this._modalConfig,
        data: person
      },
    );

    dialogRef.afterClosed().pipe(take(1)).subscribe(updatedPerson => {
      if (!updatedPerson) return;

      this._peopleService.updatePerson(person);
    });
  }

  public deletePerson(id: string): void {
    const dialogRef = this._dialog.open(
      ConfirmationDialogComponent,
      {
        width: '250px',
        data: {
          title: 'Delete user',
          message: 'Are you sure you want to delete this user',
          resolveText: 'Confirm',
          rejectText: 'Cancel'
        }
      },
    );

    dialogRef.afterClosed().pipe(take(1)).subscribe(confirmed => {
      if (!confirmed) return;

      this._peopleService.deletePerson(id);
    });
  }
}
