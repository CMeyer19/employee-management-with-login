import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { KeyValue } from "@angular/common";
import { PersonInterface } from "../../abstractions/models/person.model";
import { MatDialog } from "@angular/material/dialog";
import { AddPersonComponent } from "./dialogs/add-person/add-person.component";
import { PersonApiService } from "../../services/person-api.service";
import { EMPTY, map, of, switchMap, take } from "rxjs";
import { ConfirmationDialogComponent } from "../../dialogs/confirmation-dialog/confirmation-dialog.component";
import { SignalRService } from "../../services/signal-r.service";
import { PeopleFacade } from "./state/people.facade";

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PeopleComponent implements OnInit {
  public readonly columnKeys: Array<keyof PersonInterface | 'controls'> = ['firstName', 'lastName', 'controls'];
  public readonly columns: Array<KeyValue<keyof PersonInterface, string>> = [
    {
      key: 'firstName',
      value: 'First Name'
    },
    {
      key: 'lastName',
      value: 'Last Name'
    }
  ];

  public dataSource: Array<PersonInterface> = [];

  constructor(
    private _dialog: MatDialog,
    private _personApiService: PersonApiService,
    private _peopleFacade: PeopleFacade,
    private _signalRService: SignalRService
  ) {
  }

  public addPerson(): void {
    const dialogRef = this._dialog.open(
      AddPersonComponent,
      { width: '250px' }
    );

    dialogRef.afterClosed().pipe(
      switchMap((newPerson: Omit<PersonInterface, 'id'>) => !!newPerson
        ? this._personApiService.add(newPerson).pipe(
          switchMap(newPersonId => of({
            ...newPerson,
            id: newPersonId
          }))
        )
        : EMPTY
      )
    ).subscribe(newPerson => this.dataSource = this.dataSource.concat(newPerson));
  }

  public editPerson(event: any, person: PersonInterface): void {
    const dialogRef = this._dialog.open(
      AddPersonComponent,
      {
        width: '250px',
        data: person
      },
    );

    dialogRef.afterClosed().pipe(
      switchMap((updatedPerson: PersonInterface) => !!updatedPerson
        ? this._personApiService.update(person.id, updatedPerson).pipe(map(() => updatedPerson))
        : EMPTY
      )
    ).subscribe(updatedPerson => {
      const array: Array<PersonInterface> = [...this.dataSource];
      const index: number = array.findIndex(x => x.id === person.id);
      if (index === -1) return;

      array.splice(index, 1, updatedPerson);
      this.dataSource = array;
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

      this._personApiService.delete(id).subscribe(() => {
        this.dataSource = this.dataSource.filter(x => x.id !== id);
      });
    });
  }

  public ngOnInit(): void {
    this._signalRService.startConnection();
    this._signalRService.addTransferChartDataListener();

    this._peopleFacade.allPeople$.subscribe(x => this.dataSource = x);
  }
}
