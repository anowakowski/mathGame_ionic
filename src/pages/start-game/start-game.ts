import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GameTypePage } from '../pages';
import { retry } from 'rxjs/operator/retry';
import { MathematicOperationService } from '../../shared/shared';
import { AnswerModel } from './answerModel';

import * as _ from 'lodash';

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
  chosedNumber:number;
  selected :any;
  answerButtons: Array<AnswerModel>;

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

    this.prepareAnswerButtons(me);
  }

  tappedAnswerButton(item) {
    this.selected = (this.selected === item ? null : item); 
  };
 
  isActiveButton(item) {
      return this.selected === item;
  };

  private setRandomNumberToCalculations(me: this) {
    me.oprationRandomNumber1 = me.mathOperationService.getRandomNumberToMath();
    me.operationRandomNumber2 = me.mathOperationService.getRandomNumberToMath();
  }

  private prepareAnswerButtons(me: this) {
    let answers: Array<AnswerModel> = new Array<AnswerModel>() ;
    answers.push(new AnswerModel("correctResult", me.correctResult, me.correctResultPosition));
    answers.push(new AnswerModel("fakeResult1", me.fakeResult1, me.fakeResult1Position));
    answers.push(new AnswerModel("fakeResult2", me.fakeResult2, me.fakeResult2Position));
    me.answerButtons = _.sortBy(answers, a => a.position);
  }

  private prepareClculations():number{
    const me = this;
    let gameTypeName: any = me.paramsData.gameType.name;
    if (gameTypeName === "Addition"){
      me.mathSign="+";
      return me.oprationRandomNumber1 + me.operationRandomNumber2;
    } else if(gameTypeName === "Subtraction"){
      me.mathSign="-";
      return me.oprationRandomNumber1 - me.operationRandomNumber2;
    } else if(gameTypeName === "Multiplication"){
      me.mathSign="*";
      return me.oprationRandomNumber1 * me.operationRandomNumber2;
    } else if(gameTypeName === "Division"){
      me.mathSign=":";
      return me.oprationRandomNumber1 / me.operationRandomNumber2;
    }
  }
}
