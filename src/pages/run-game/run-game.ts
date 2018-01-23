import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { GameTypePage } from '../pages';
import { retry } from 'rxjs/operator/retry';
import { MathematicOperationService } from '../../shared/shared';
import { AnswerModel } from './answerModel';

import * as _ from 'lodash';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  templateUrl: 'run-game.html',
})
export class RunGamePage {
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
    private mathOperationService: MathematicOperationService,
    public alertCtrl: AlertController) {
    this.paramsData = navParams.data;
  }

  ionViewDidLoad() {
    const me = this;
    me.setUpMathOperation();
  }

  setUpMathOperation(){
    const me = this;

    me.oprationRandomNumber1 = me.mathOperationService.getRandomNumberToMath();
    me.operationRandomNumber2 = me.mathOperationService.getRandomNumberToMath();

    me.correctResult = me.prepareClculations();
    me.correctResultPosition = me.mathOperationService.getRandomPosition();
    
    me.fakeResult1Position = me.mathOperationService.prepareRandomNumber(me.correctResultPosition, 3);
    me.fakeResult2Position = me.mathOperationService.prepareRandomNumber(me.correctResultPosition, 3, me.fakeResult1Position);
   
    me.fakeResult1 = me.mathOperationService.prepareMoreDetailFakeResult(me.correctResult);
    me.fakeResult2 = me.mathOperationService.prepareMoreDetailFakeResult(me.correctResult, me.fakeResult1);

    me.prepareAnswerButtons();
  }

  tapConfirmAndGoToNext(){
    const me = this;
    me.verifyChosedNumber();
  }

  tappedAnswerButton(item) {
    this.selected = (this.selected === item ? null : item); 
    this.chosedNumber = item;
  };
 
  isActiveButton(item) {
      return this.selected === item;
  };

  private goToNextPage(): void {
    const me = this;
    let choosenNumber: number = me.chosedNumber;

    
    
  }
  
  private verifyChosedNumber(): void {
    const me = this;
    let isCorrectChoose: boolean = me.chosedNumber === me.correctResult;

    let alert = me.alertCtrl.create({
      title: "Info choise",
      message: isCorrectChoose ? " :-) Great!, Your choose is correct!!!" : " :-( Sorry, but your choice is incorrect",
      buttons:[{
        text: "go next page",
        handler: data => {
          me.setPageIteration();
          me.goToNextPage();
        }
      }]
    });

    alert.present();
  }

  private setPageIteration(): void{

  }

  private prepareAnswerButtons() {
    const me = this;
    let answers: Array<AnswerModel> = new Array<AnswerModel>() ;
    answers.push(new AnswerModel("correctResult", me.correctResult, me.correctResultPosition));
    answers.push(new AnswerModel("fakeResult1", me.fakeResult1, me.fakeResult1Position));
    answers.push(new AnswerModel("fakeResult2", me.fakeResult2, me.fakeResult2Position));
    me.answerButtons = _.sortBy(answers, a => a.position);
  }

  private prepareClculations():number{
    const me = this;
    let gameTypeName: any = me.paramsData.params.gameType.name;
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
