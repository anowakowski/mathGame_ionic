import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GameTypePage } from '../pages';

@Component({
  selector: 'page-start-game',
  templateUrl: 'start-game.html',
})
export class StartGamePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log(navParams.data.parameterData);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StartGamePage');
  }
}
