import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr"
import { environment } from "@env";

interface ChartInterface {

}

@Injectable({ providedIn: 'root' })
export class SignalRService {
  private readonly _signalRApiUrl: string = environment.routes.signalR;
  private readonly _hubConnection: HubConnection = new HubConnectionBuilder()
    .withUrl(`${this._signalRApiUrl}/chatHub`)
    .build();

  public data: ChartInterface[] = [];

  public startConnection = () => {
    this._hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err))
  }

  public addTransferChartDataListener = () => {
    this._hubConnection.on('ReceiveMessage', (data) => {
      this.data = data;
      debugger;
      console.log(data);
    });
  }
}
