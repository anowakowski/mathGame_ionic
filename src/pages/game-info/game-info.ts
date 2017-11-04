import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GameTypePage, StartGamePage } from '../pages';

@Component({
  selector: 'page-game-info',
  templateUrl: 'game-info.html',
})
export class GameInfoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GameInfoPage');
  }

  goToGameInfo(){
    const me = this;
    me.navCtrl.push(GameTypePage);
  }

  goToStartGame(){
    const me = this;
    me.navCtrl.push(StartGamePage);
  }
}
