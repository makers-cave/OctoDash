import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatRippleModule } from '@angular/material/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { RoundProgressModule } from 'angular-svg-round-progressbar';
import player, { LottiePlayer } from 'lottie-web';
import { NgxElectronModule } from 'ngx-electron';
import { LottieModule } from 'ngx-lottie';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { AppService } from './app.service';
import { BottomBarComponent } from './bottom-bar/bottom-bar.component';
import { ConfigService } from './config/config.service';
import { ConfigInvalidComponent } from './config/invalid/invalid.component';
import { DiscoverOctoprintComponent } from './config/setup/discover-octoprint/discover-octoprint.component';
import { ExtruderInformationComponent } from './config/setup/extruder-information/extruder-information.component';
import { OctoprintAuthenticationComponent } from './config/setup/octoprint-authentication/octoprint-authentication.component';
import { PersonalizationComponent } from './config/setup/personalization/personalization.component';
import { PluginsComponent } from './config/setup/plugins/plugins.component';
import { ConfigSetupComponent } from './config/setup/setup.component';
import { WelcomeComponent } from './config/setup/welcome/welcome.component';
import { ControlComponent } from './control/control.component';
import { CustomActionsComponent } from './control/custom-actions/custom-actions.component';
import { ConversionService } from './conversion.service';
import { EventService } from './event.service';
import { ChangeFilamentComponent } from './filament/change-filament/change-filament.component';
import { ChooseFilamentComponent } from './filament/choose-filament/choose-filament.component';
import { FilamentComponent } from './filament/filament.component';
import { HeatNozzleComponent } from './filament/heat-nozzle/heat-nozzle.component';
import { MoveFilamentComponent } from './filament/move-filament/move-filament.component';
import { PurgeFilamentComponent } from './filament/purge-filament/purge-filament.component';
import { FilesComponent } from './files/files.component';
import { HeightProgressComponent } from './height-progress/height-progress.component';
import { JobStatusComponent } from './job-status/job-status.component';
import { LongPress } from './long-press.directive';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { MainScreenComponent } from './main-screen/main-screen.component';
import { MainScreenNoTouchComponent } from './main-screen/no-touch/main-screen-no-touch.component';
import { NotificationComponent } from './notification/notification.component';
import { NotificationService } from './notification/notification.service';
import { PrintControlComponent } from './print-control/print-control.component';
import { PrinterStatusComponent } from './printer-status/printer-status.component';
import { EnclosureOctoprintService } from './services/enclosure/enclosure.octoprint.service';
import { EnclosureService } from './services/enclosure/enclosure.service';
import { FilamentManagerOctoprintService } from './services/filament/filament-manager.octoprint.service';
import { FilamentPluginService } from './services/filament/filament-plugin.service';
import { FilesOctoprintService } from './services/files/files.octoprint.service';
import { FilesService } from './services/files/files.service';
import { JobOctoprintService } from './services/job/job.octoprint.service';
import { JobService } from './services/job/job.service';
import { PrinterOctoprintService } from './services/printer/printer.octoprint.service';
import { PrinterService } from './services/printer/printer.service';
import { OctoPrintSocketService } from './services/socket/socket.octoprint.service';
import { SocketService } from './services/socket/socket.service';
import { SystemOctoprintService } from './services/system/system.octoprint.service';
import { SystemService } from './services/system/system.service';
import { SettingsComponent } from './settings/settings.component';
import { ToggleSwitchComponent } from './shared/toggle-switch/toggle-switch.component';
import { StandbyComponent } from './standby/standby.component';
import { UpdateComponent } from './update/update.component';
import { URLSafePipe } from './url.pipe';
import { ProfilesComponent } from './profiles/profiles.component';
import { ProfileService } from './services/profiles/profiles.service';
import { ProfileOctoprintService } from './services/profiles/profiles.octoprint.service';
import { BedLevelingComponent } from './bed-leveling/bed-leveling.component';
import { ConfirmComponent } from './confirm/confirm.component';

export function playerFactory(): LottiePlayer {
  return player;
}
@NgModule({
  declarations: [
    AppComponent,
    BottomBarComponent,
    ChooseFilamentComponent,
    ConfigInvalidComponent,
    ConfigSetupComponent,
    ControlComponent,
    DiscoverOctoprintComponent,
    ExtruderInformationComponent,
    FilamentComponent,
    FilesComponent,
    JobStatusComponent,
    HeightProgressComponent,
    LongPress,
    MainMenuComponent,
    MainScreenComponent,
    MainScreenNoTouchComponent,
    NotificationComponent,
    OctoprintAuthenticationComponent,
    PersonalizationComponent,
    PluginsComponent,
    PrintControlComponent,
    PrinterStatusComponent,
    SettingsComponent,
    StandbyComponent,
    UpdateComponent,
    URLSafePipe,
    WelcomeComponent,
    HeatNozzleComponent,
    MoveFilamentComponent,
    ChangeFilamentComponent,
    PurgeFilamentComponent,
    CustomActionsComponent,
    ToggleSwitchComponent,
    ProfilesComponent,
    BedLevelingComponent,
    ConfirmComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule,
    MatRippleModule,
    NgxElectronModule,
    RoundProgressModule,
    [LottieModule.forRoot({ player: playerFactory, useCache: true })],
  ],
  providers: [
    AppService,
    ConfigService,
    ConversionService,
    EventService,
    NotificationService,
    [
      {
        provide: ProfileService,
        deps: [ConfigService, NotificationService, HttpClient],
        useFactory: (
          configService: ConfigService,
          notificationService: NotificationService,
          httpClient: HttpClient,
        ) => {
          return new ProfileOctoprintService(configService, notificationService, httpClient);
        },
      },
      {
        provide: SystemService,
        deps: [ConfigService, NotificationService, HttpClient],
        useFactory: (
          configService: ConfigService,
          notificationService: NotificationService,
          httpClient: HttpClient,
        ) => {
          return new SystemOctoprintService(configService, notificationService, httpClient);
        },
      },
    ],
    [
      {
        provide: SocketService,
        deps: [ConfigService, SystemService, ConversionService, HttpClient],
        useFactory: (
          configService: ConfigService,
          systemService: SystemService,
          conversionService: ConversionService,
          httpClient: HttpClient,
        ) => {
          return new OctoPrintSocketService(configService, systemService, conversionService, httpClient);
        },
      },
    ],
    [
      {
        provide: PrinterService,
        deps: [ConfigService, NotificationService, HttpClient],
        useFactory: (
          configService: ConfigService,
          notificationService: NotificationService,
          httpClient: HttpClient,
        ) => {
          return new PrinterOctoprintService(configService, notificationService, httpClient);
        },
      },
    ],
    [
      {
        provide: JobService,
        deps: [ConfigService, NotificationService, HttpClient],
        useFactory: (
          configService: ConfigService,
          notificationService: NotificationService,
          httpClient: HttpClient,
        ) => {
          return new JobOctoprintService(configService, notificationService, httpClient);
        },
      },
    ],
    [
      {
        provide: FilesService,
        deps: [ConfigService, NotificationService, HttpClient, ConversionService],
        useFactory: (
          configService: ConfigService,
          notificationService: NotificationService,
          httpClient: HttpClient,
          conversionService: ConversionService,
        ) => {
          return new FilesOctoprintService(configService, notificationService, httpClient, conversionService);
        },
      },
    ],
    [
      {
        provide: FilamentPluginService,
        deps: [ConfigService, HttpClient],
        useFactory: (configService: ConfigService, httpClient: HttpClient) => {
          return new FilamentManagerOctoprintService(configService, httpClient);
        },
      },
    ],
    [
      {
        provide: EnclosureService,
        deps: [ConfigService, NotificationService, HttpClient],
        useFactory: (
          configService: ConfigService,
          notificationService: NotificationService,
          httpClient: HttpClient,
        ) => {
          return new EnclosureOctoprintService(configService, notificationService, httpClient);
        },
      },
    ],
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {
  public constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
  }
}
