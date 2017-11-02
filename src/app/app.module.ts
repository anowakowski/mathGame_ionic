import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TimerPage, DashboardPage, GameTimerComponent, StartGamePage, GameTypePage, GameLevelPage } from '../pages/pages';

import {RoundProgressModule} from 'angular-svg-round-progressbar';

@NgModule({
  declarations: [
    MyApp,
    TimerPage,
    DashboardPage,
    StartGamePage,
    GameTypePage,
    GameLevelPage,

    GameTimerComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    RoundProgressModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TimerPage,
    DashboardPage,
    StartGamePage,
    GameTypePage,
    GameLevelPage      
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    
  ]
})
export class AppModule {}
