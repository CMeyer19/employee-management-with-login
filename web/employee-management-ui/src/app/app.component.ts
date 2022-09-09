import { OidcSecurityService } from 'angular-auth-oidc-client';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ReplaySubject, take, takeUntil } from 'rxjs';
import { PersonApiService } from "./services/person-api.service";
import { SignalRService } from "./services/signal-r.service";

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

  public routeTrackByFn = (index: number, navigationItem: RouteInterface): string => navigationItem.route;

  constructor(
    private _cd: ChangeDetectorRef,
    private _oidcSecurityService: OidcSecurityService,
    private _signalRService: SignalRService,
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

      this._signalRService.startConnection();
      this._signalRService.addTransferChartDataListener();
      this.isAuthenticated = true;
      this._cd.markForCheck();
    });
  }

  public ngOnDestroy(): void {
    this._signalRService.stopConnection();

    this._destroyed$.next(true);
    this._destroyed$.complete();
  }
}
