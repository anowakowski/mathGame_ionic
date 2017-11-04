import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpClientModule } from '@angular/common/http';

import { TimerPage, DashboardPage, GameTimerComponent, StartGamePage, GameTypePage, GameLevelPage, GameInfoPage } from '../pages/pages';
import {RoundProgressModule} from 'angular-svg-round-progressbar';
import { GameService } from '../shared/shared';

@NgModule({
  declarations: [
    MyApp,
    TimerPage,
    DashboardPage,
    StartGamePage,
    GameTypePage,
    GameLevelPage,
    GameInfoPage,

    GameTimerComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    RoundProgressModule,
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TimerPage,
    DashboardPage,
    StartGamePage,
    GameTypePage,
    GameLevelPage,
    GameInfoPage      
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GameService
  ]
})
export class AppModule {}
