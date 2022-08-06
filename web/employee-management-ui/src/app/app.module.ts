import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { routing } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './pages/home/home.component';
import { AuthModule, LogLevel } from 'angular-auth-oidc-client';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatMenuModule } from "@angular/material/menu";
import { MatListModule } from "@angular/material/list";
import { MatChipsModule } from "@angular/material/chips";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    routing,
    HttpClientModule,
    AuthModule.forRoot({
      config: {
        authority: 'https://localhost:44395',
        redirectUrl: window.location.origin,
        postLogoutRedirectUri: window.location.origin,
        clientId: 'angularclient',
        scope: 'openid profile email people offline_access',
        responseType: 'code',
        silentRenew: true,
        renewTimeBeforeTokenExpiresInSeconds: 10,
        useRefreshToken: true,
        logLevel: LogLevel.Debug,
      },
    }),
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatMenuModule,
    MatListModule,
    MatChipsModule,
  ],
  declarations: [
    AppComponent,
    HomeComponent
  ],
  bootstrap: [AppComponent],
})

export class AppModule {
  constructor() {
    console.log('APP STARTING');
  }
}
