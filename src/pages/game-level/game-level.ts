import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StartGamePage, GameInfoPage } from '../pages';
import { GameService } from '../../shared/shared';

@Component({
  selector: 'page-game-level',
  templateUrl: 'game-level.html',
})
export class GameLevelPage {
  private gameType: any;
  gameLevels: any[];
  constructor(public navCtrl: NavController, public navParams: NavParams, private gameService: GameService) {
    this.gameType=navParams.data;
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
    me.navCtrl.push(GameInfoPage, {gameLevel: gameLevel, gameType: me.gameType});
  }
}
