import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RunGamePage, GameInfoPage } from '../pages';
import { GameService } from '../../shared/shared';
import { RunGameModel } from '../../models/runGameModel';

@Component({
  selector: 'page-game-level',
  templateUrl: 'game-level.html',
})
export class GameLevelPage {
  private runGameModel: RunGameModel;
  gameLevels: any[];
  constructor(public navCtrl: NavController, public navParams: NavParams, private gameService: GameService) {
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

  tappedGameLevel(gameLevel){
    const me = this;
    me.runGameModel.gameLevel = gameLevel;
    me.navCtrl.push(GameInfoPage, me.runGameModel);
  }
}
