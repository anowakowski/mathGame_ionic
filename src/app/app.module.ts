import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpClientModule } from '@angular/common/http';

import { TimerPage, DashboardPage, GameTimerComponent, RunGamePage, GameTypePage, GameLevelPage, GameInfoPage } from '../pages/pages';
import {RoundProgressModule} from 'angular-svg-round-progressbar';
import { GameService, MathematicOperationService, MathResultService } from '../shared/shared';
import { GameFinishPage } from '../pages/game-finish/game-finish';

@NgModule({
  declarations: [
    MyApp,
    TimerPage,
    DashboardPage,
    RunGamePage,
    GameTypePage,
    GameLevelPage,
    GameInfoPage,
    GameFinishPage,
    
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
    RunGamePage,
    GameTypePage,
    GameLevelPage,
    GameInfoPage,
    GameFinishPage        
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GameService,
    MathematicOperationService,
    MathResultService
  ]
})
export class AppModule {}
