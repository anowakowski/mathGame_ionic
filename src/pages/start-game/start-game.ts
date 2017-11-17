import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GameTypePage } from '../pages';
import { retry } from 'rxjs/operator/retry';
import { MathematicOperationService } from '../../shared/shared';

@Component({
  selector: 'page-start-game',
  templateUrl: 'start-game.html',
})
export class StartGamePage {
  randomNumber1: number = 0;
  randomNumber2: number = 0;
  correctResult: number = 0;
  correctResultPosition: number = 1;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private mathOperationService: MathematicOperationService) {
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
    me.correctResultPosition = me.mathOperationService.getRandomPosition();
  }

  private setRandomNumber():void {
    const me = this;
    me.randomNumber1 = me.mathOperationService.getRandomNumberToMath();
    me.randomNumber2 = me.mathOperationService.getRandomNumberToMath();
  }
}
