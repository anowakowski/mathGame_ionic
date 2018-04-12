import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GameFinishPage } from './game-finish';

@NgModule({
  declarations: [
    GameFinishPage,
  ],
  imports: [
    IonicPageModule.forChild(GameFinishPage),
  ],
})
export class GameFinishPageModule {}
