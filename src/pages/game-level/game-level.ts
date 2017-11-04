import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StartGamePage, GameInfoPage } from '../pages';

@Component({
  selector: 'page-game-level',
  templateUrl: 'game-level.html',
})
export class GameLevelPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GameLevelPage');
  }

  tappedGameLevel(gameLevel){
    const me = this;
        me.navCtrl.push(GameInfoPage, {gameLevel: gameLevel});
  }

}
