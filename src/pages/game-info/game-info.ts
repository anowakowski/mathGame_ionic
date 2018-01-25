import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GameTypePage, RunGamePage } from '../pages';
import { RunGameModel } from '../models/runGameModel';

@Component({
  selector: 'page-game-info',
  templateUrl: 'game-info.html',
})
export class GameInfoPage {
  runGameModel: RunGameModel;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.runGameModel = navParams.data as RunGameModel;
  }

  ionViewDidLoad() {
    console.log(this.runGameModel);
  }

  goToGameInfo(){
    const me = this;
    me.navCtrl.push(GameTypePage);
  }

  goToStartGame(){
    const me = this;
    me.navCtrl.push(RunGamePage, RunGameModel);
  }
}
