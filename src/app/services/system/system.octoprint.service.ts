/* eslint-disable camelcase */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { ConfigService } from '../../config/config.service';
import { SocketAuth } from '../../model';
import { ConnectCommand, OctoprintLogin } from '../../model/octoprint';
import { NotificationService } from '../../notification/notification.service';
import { SystemService } from './system.service';

@Injectable()
export class SystemOctoprintService implements SystemService {
  constructor(
    private configService: ConfigService,
    private notificationService: NotificationService,
    private http: HttpClient,
  ) {}

  public getSessionKey(): Observable<SocketAuth> {
    return this.http
      .post<OctoprintLogin>(
        this.configService.getApiURL('login'),
        { passive: true },
        this.configService.getHTTPHeaders(),
      )
      .pipe(
        map(octoprintLogin => {
          return {
            user: octoprintLogin.name,
            session: octoprintLogin.session,
          } as SocketAuth;
        }),
      );
  }

  public sendCommand(command: string): void {
    this.http
      .post(this.configService.getApiURL(`system/commands/core/${command}`), null, this.configService.getHTTPHeaders())
      .pipe(
        catchError(error =>
          this.notificationService.setError(
            $localize`:@@error-execute:Can't execute ${command} command!`,
            error.message,
          ),
        ),
      )
      .subscribe();
  }

  public connectPrinter(profileID: string): void {
    var payload: ConnectCommand = {
      command: 'connect',
      save: false,
    };
    if (profileID != null){
      payload.printerProfile = profileID;
    }
    this.http
      .post(this.configService.getApiURL('connection'), payload, this.configService.getHTTPHeaders())
      .pipe(
        catchError(error =>
          this.notificationService.setError($localize`:@@error-connect:Can't connect to printer!`, error.message),
        ),
      )
      .subscribe();
  }

  public disconnetPrinter(): void{
    var payload: ConnectCommand = {
      command: 'disconnect'
    };
    this.http
      .post(this.configService.getApiURL('connection'), payload, this.configService.getHTTPHeaders())
      .pipe(
        catchError(error =>
          this.notificationService.setError($localize`:@@error-connect:Can't connect to printer!`, error.message),
        ),
      )
      .subscribe();
  }
}
