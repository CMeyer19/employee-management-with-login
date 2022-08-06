import { Component, OnInit } from '@angular/core';
import { KeyValue } from "@angular/common";
import { PersonInterface } from "../../abstractions/models/person.model";
import { MatDialog } from "@angular/material/dialog";
import { AddPersonComponent } from "./dialogs/add-person/add-person.component";
import { PersonApiService } from "../../services/person-api.service";
import { map, of, switchMap } from "rxjs";

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
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
    private _personApiService: PersonApiService
  ) {
  }

  public addPerson(): void {
    const dialogRef = this._dialog.open(
      AddPersonComponent,
      { width: '250px' }
    );

    dialogRef.afterClosed().pipe(
      switchMap((newPerson: Omit<PersonInterface, 'id'>) => this._personApiService.add(newPerson).pipe(switchMap(newPersonId => of({
        ...newPerson,
        id: newPersonId
      }))))
    ).subscribe(newPerson => this.dataSource = this.dataSource.concat(newPerson));
  }

  public editPerson(person: PersonInterface): void {
    const dialogRef = this._dialog.open(
      AddPersonComponent,
      {
        width: '250px',
        data: person
      },
    );

    dialogRef.afterClosed().pipe(
      switchMap((updatedPerson: PersonInterface) => this._personApiService.update(person.id, updatedPerson).pipe(map(() => updatedPerson)))
    ).subscribe(updatedPerson => {
      const array: Array<PersonInterface> = [...this.dataSource];
      const index: number = array.findIndex(x => x.id === person.id);
      if (index === -1) return;

      array.splice(index, 1, updatedPerson);
      this.dataSource = array;
    });
  }

  public deletePerson(id: string): void {
    this._personApiService.delete(id).subscribe(() => {
      this.dataSource = this.dataSource.filter(x => x.id !== id);
    });
  }

  public ngOnInit(): void {
    this._personApiService.getAll().subscribe(result => {
      this.dataSource = result;
    });
  }
}
