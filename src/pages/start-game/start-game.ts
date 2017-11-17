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
  oprationRandomNumber1: number = 0;
  operationRandomNumber2: number = 0;
  correctResult: number = 0;
  correctResultPosition: number = 1;
  fakeDetailsResult1:number = 0;
  fakeResult2:number = 0;
  
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

    me.correctResult = me.oprationRandomNumber1 + me.operationRandomNumber2;
    me.correctResultPosition = me.mathOperationService.getRandomPosition();
    me.fakeDetailsResult1 = me.mathOperationService.getRandomNumberToMath();
    me.fakeResult2 = me.mathOperationService.getRandomNumberToMath();

    me.fakeDetailsResult1 = me.mathOperationService.prepareMoreDetailFakeResult(me.correctResult);
    me.fakeResult2 = me.mathOperationService.checkFakeResult(me.correctResult, me.fakeResult2);
  }

  private setRandomNumber():void {
    const me = this;
    me.oprationRandomNumber1 = me.mathOperationService.getRandomNumberToMath();
    me.operationRandomNumber2 = me.mathOperationService.getRandomNumberToMath();
  }
}
