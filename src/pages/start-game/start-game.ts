import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GameTypePage } from '../pages';

@Component({
  selector: 'page-start-game',
  templateUrl: 'start-game.html',
})
export class StartGamePage {
  randomNumber1: number = 0;
  randomNumber2: number = 0;
  correctResult: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log(navParams.data.parameterData);
  }

  ionViewDidLoad() {
    const me = this;
    me.setUpMathOperation();
  }

  setUpMathOperation(){
    const me = this;
    me.setRandomNumber();

    me.correctResult = me.randomNumber1 + me.randomNumber2;
  }

  private setRandomNumber():void {
    const me = this;
    me.randomNumber1 = me.getRandomNumber();
    me.randomNumber2 = me.getRandomNumber();
  }

  private getRandomNumber():number{
    return Math.floor(Math.random() * 100) + 1;
  }
}
