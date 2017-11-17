import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GameTypePage, StartGamePage } from '../pages';

@Component({
  selector: 'page-game-info',
  templateUrl: 'game-info.html',
})
export class GameInfoPage {
  paramData: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.paramData = navParams.data;
  }

  ionViewDidLoad() {
    
    console.log(this.paramData);
  }

  goToGameInfo(){
    const me = this;
    me.navCtrl.push(GameTypePage);
  }

  goToStartGame(){
    const me = this;
    me.navCtrl.push(StartGamePage, me.paramData);
  }
}
