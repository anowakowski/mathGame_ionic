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
  fakeResult1:number = 0;
  fakeResult2:number = 0;
  fakeResult1Position:number;
  fakeResult2Position:number;
  paramsData:any;
  mathSign:string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private mathOperationService: MathematicOperationService) {
    this.paramsData = navParams.data;
  }

  ionViewDidLoad() {
    const me = this;
    me.setUpMathOperation();
  }

  setUpMathOperation(){
    const me = this;

    this.setRandomNumberToCalculations(me);

    me.correctResult = me.prepareClculations();
    me.correctResultPosition = me.mathOperationService.getRandomPosition();

    me.fakeResult1Position = me.mathOperationService.prepareRandomNumber(me.correctResultPosition, 3);
    me.fakeResult2Position = me.mathOperationService.prepareRandomNumber(me.correctResultPosition, 3, me.fakeResult1Position);

    me.fakeResult1 = me.mathOperationService.prepareMoreDetailFakeResult(me.correctResult);
    me.fakeResult2 = me.mathOperationService.prepareMoreDetailFakeResult(me.correctResult, me.fakeResult1);
  }

  private setRandomNumberToCalculations(me: this) {
    me.oprationRandomNumber1 = me.mathOperationService.getRandomNumberToMath();
    me.operationRandomNumber2 = me.mathOperationService.getRandomNumberToMath();
  }

  private prepareClculations():number{
    const me = this;
    let gameType: any = me.paramsData.gameType;
    if (gameType === "Addition"){
      me.mathSign="+";
      return me.oprationRandomNumber1 + me.operationRandomNumber2;
    } else if(gameType === "Subtraction"){
      me.mathSign="-";
      return me.oprationRandomNumber1 - me.operationRandomNumber2;
    } else if(gameType === "Multiplication"){
      me.mathSign="*";
      return me.oprationRandomNumber1 * me.operationRandomNumber2;
    } else if(gameType === "Division"){
      me.mathSign=":";
      return me.oprationRandomNumber1 / me.operationRandomNumber2;
    }
  }
}
