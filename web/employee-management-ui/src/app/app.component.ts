import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, ReplaySubject, take, takeUntil } from 'rxjs';
import { PersonApiService } from "./services/person-api.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  private readonly _destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  public readonly userData$: Observable<any> = this._oidcSecurityService.userData$;

  public isAuthenticated = false;

  constructor(
    private _oidcSecurityService: OidcSecurityService,
    private _personApiService: PersonApiService
  ) {
  }

  public login(): void {
    this._oidcSecurityService.authorize();
  }

  public logoffAndRevokeTokens(): void {
    this._oidcSecurityService.logoffAndRevokeTokens().pipe(take(1)).subscribe();
  }

  public ngOnInit(): void {
    this._oidcSecurityService.checkAuth().pipe(takeUntil(this._destroyed$)).subscribe(({ isAuthenticated }) => {
      this.isAuthenticated = isAuthenticated;
    });

    this._personApiService.getPeople().subscribe(x => {
      console.log(x);
      debugger;
    });
  }

  public ngOnDestroy(): void {
    this._destroyed$.next(true);
    this._destroyed$.complete();
  }
}
