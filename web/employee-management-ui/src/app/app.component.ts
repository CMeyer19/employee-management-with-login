import { OidcSecurityService } from 'angular-auth-oidc-client';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, take, takeUntil } from 'rxjs';
import { PersonApiService } from "@apis/person/person-api.service";
import { SignalRService } from "@services/signal-r.service";

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
  private readonly _destroy$: Subject<void> = new Subject<void>();

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
    this._oidcSecurityService.checkAuth().pipe(takeUntil(this._destroy$)).subscribe(({ isAuthenticated }) => {
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

    this._destroy$.next();
    this._destroy$.complete();
  }
}
