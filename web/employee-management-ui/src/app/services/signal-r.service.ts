import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr"
import { environment } from "@env";
import { Observable, Subject } from "rxjs";
import { LoggerService } from "./logger.service";

@Injectable({ providedIn: 'root' })
export class SignalRService {
  private readonly _receivedMessages$: Subject<any> = new Subject<any>();
  private readonly _signalRApiUrl: string = environment.routes.signalR;
  private readonly _hubConnection: HubConnection = new HubConnectionBuilder()
    .withUrl(`${this._signalRApiUrl}/chatHub`)
    .build();

  public readonly receivedMessages$: Observable<any> = this._receivedMessages$.asObservable();

  constructor(private _logger: LoggerService) {
  }

  public startConnection = () => {
    this._hubConnection
      .start()
      .then(() => this._logger.logToConsole('Connection started'))
      .catch(err => this._logger.logToConsole(`Error while starting connection: ${err}`));
  }

  public stopConnection = () => {
    this._hubConnection
      .stop()
      .then(() => this._logger.logToConsole('Connection stopped'))
      .catch(err => this._logger.logToConsole(`Error while stopping connection: ${err}`));
  }

  public addTransferChartDataListener = () => {
    this._hubConnection.on('ReceiveMessage', (data) => this._receivedMessages$.next(data));
  }
}
