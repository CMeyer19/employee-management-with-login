import { Injectable } from '@angular/core';
import { environment } from "@env";

@Injectable({ providedIn: 'root' })
export class LoggerService {
  public logToConsole(message: string): void {
    if (environment.production) return;

    console.log(message);
  }
}

