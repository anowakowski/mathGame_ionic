import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StartGamePage, GameInfoPage } from '../pages';

@Component({
  selector: 'page-game-level',
  templateUrl: 'game-level.html',
})
export class GameLevelPage {
  private gameType: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.gameType=navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GameLevelPage');
  }

  tappedGameLevel(gameLevel){
    const me = this;
    me.navCtrl.push(GameInfoPage, {gameLevel: gameLevel, gameType: me.gameType});
  }
}
