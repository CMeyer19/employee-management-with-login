import { OidcSecurityService } from 'angular-auth-oidc-client';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, ReplaySubject, take, takeUntil } from 'rxjs';
import { PersonApiService } from "./services/person-api.service";

interface RouteInterface {
  route: string;
  icon: string;
  displayValue: string;
  exact: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, OnDestroy {
  private readonly _destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  public readonly userData$: Observable<any> = this._oidcSecurityService.userData$;
  public readonly routes: Array<RouteInterface> = [
    {
      route: '',
      displayValue: 'Home',
      icon: 'home',
      exact: true
    },
    {
      route: 'people',
      displayValue: 'People',
      icon: 'group',
      exact: false
    }
  ];

  public isAuthenticated = false;

  constructor(
    private _oidcSecurityService: OidcSecurityService,
    private _personApiService: PersonApiService
  ) {
  }

  public login(): void {
    this._oidcSecurityService.authorize();
  }

  public logout(): void {
    this._oidcSecurityService.logoffAndRevokeTokens().pipe(take(1)).subscribe();
  }

  public ngOnInit(): void {
    this._oidcSecurityService.checkAuth().pipe(takeUntil(this._destroyed$)).subscribe(({ isAuthenticated }) => {
      if (!isAuthenticated) {
        this.login();
        return;
      }

      this.isAuthenticated = true;
    });
  }

  public ngOnDestroy(): void {
    this._destroyed$.next(true);
    this._destroyed$.complete();
  }
}
