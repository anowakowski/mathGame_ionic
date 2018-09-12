import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { RunGamePage, GameInfoPage } from '../pages';
import { GameService } from '../../shared/shared';
import { RunGameModel } from '../../models/runGame-model';
import { GameLevelModel } from '../../models/gameLevel-model';

import * as _ from 'lodash';

@Component({
  selector: 'page-game-level',
  templateUrl: 'game-level.html',
})
export class GameLevelPage {
  private runGameModel: RunGameModel;
  selectedLevel: number = 1;
  brightness: number = 20;

  gameLevels: GameLevelModel[];
  constructor(public navCtrl: NavController, public navParams: NavParams, private gameService: GameService, public alertCtrl: AlertController) {
    this.runGameModel = navParams.data as RunGameModel;
  }

  ionViewDidLoad() {
    this.getGameLevel();
  }

  getGameLevel(){
    const me = this;
    me.gameService.getGameLevel().then(response => {
      me.gameLevels = response;
    })
  }

  tappedGameLevel(){
    const me = this;

    if (me.validateChosenLevel()){
      let selectedGameLevel: GameLevelModel = _.find(me.gameLevels, gl => gl.id == me.selectedLevel);

      me.runGameModel.gameLevel = selectedGameLevel;
      me.navCtrl.push(GameInfoPage, me.runGameModel);
    } else{
      me.showLevelAlert();
    }
  }

  private validateChosenLevel():boolean {
    const me = this;

    if (me.selectedLevel == 0) {
      return false
    } else{
      return true;
    }
  }

  private showLevelAlert(){

    const alert = this.alertCtrl.create({
      title: 'wrong Level',
      subTitle: 'You must choose level greater than 0',
      buttons: ['OK']
    });
    alert.present();
  }
}
