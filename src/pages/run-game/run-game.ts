import { Component, Renderer } from '@angular/core';
import {NavController, NavParams, AlertController, ToastController, Toast } from 'ionic-angular';

import { MathematicOperationService, GameService } from '../../shared/shared';
import { AnswerModel } from '../../models/answerModel';

import * as _ from 'lodash';
import { RunGameModel } from '../../models/runGameModel';
import { GameFinishPage } from '../game-finish/game-finish';

@Component({
  selector: 'page-run-game',
  templateUrl: 'run-game.html',
})
export class RunGamePage {

  private readonly maxGameCount: number = 5;

  mathOperationAsString: string;
  correctResult: number = 0;
  correctResultPosition: number = 1;
  fakeResult1:number = 0;
  fakeResult2:number = 0;
  fakeResult1Position:number;
  fakeResult2Position:number;
  runGameModel:RunGameModel;
  mathSignToDisplay:string;
  chosedNumber:number;
  selectedAnswerButton :any;
  answerButtons: Array<AnswerModel>;
  isCorrectNumber: boolean;
  mathType: string;
  gameCountToDisplay: number;
  gameScoreToDisplay:number;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private mathOperationService: MathematicOperationService,
    private gameService: GameService,
    public alertCtrl: AlertController,
    public render: Renderer,
    public toastCtrl: ToastController) {
    this.runGameModel = navParams.data as RunGameModel;
  }

  ionViewDidLoad() {
    const me = this;
    me.setUpMathOperation();
    me.gameService.prepareFirstGameData(me.runGameModel);
    me.gameCountToDisplay = me.gameService.setGameCountForDisplay(me.runGameModel.gameCount);
    me.gameScoreToDisplay = me.gameService.setDefaultValueForGameScoreIfUndefine(me.runGameModel.gameScore);
  }

  setUpMathOperation(){
    const me = this;

    me.mathOperationAsString = me.mathOperationService.preparMathOperationAsString(
      me.runGameModel.gameType, 
      me.mathOperationService.getRandomNumberToMath(), 
      me.mathOperationService.getRandomNumberToMath());

    me.correctResult = me.mathOperationService.prepareCorrectResult(me.mathOperationAsString);

    me.prepareButtonsPosition();
    me.prepareAnswerButtons();

    me.mathType = me.runGameModel.gameType.name;
  }

  tapConfirmAndGoToNext(){
    const me = this;
    me.verifyChosedNumber();
    me.prepareChoosenNumberAlert();
  }

  tappedAnswerButton(answerValue) {
    const me = this;
    me.selectedAnswerButton = (me.selectedAnswerButton === answerValue ? null : answerValue); 
    me.chosedNumber = answerValue;
  };
 
  isActiveAnswereButton(button) {
    return this.selectedAnswerButton === button;
  };

  private prepareButtonsPosition() {
    const me = this;
    me.correctResultPosition = me.mathOperationService.getRandomPosition();
    me.fakeResult1Position = me.mathOperationService.prepareRandomNumber(me.correctResultPosition, 3);
    me.fakeResult2Position = me.mathOperationService.prepareRandomNumber(me.correctResultPosition, 3, me.fakeResult1Position);
    me.fakeResult1 = me.mathOperationService.prepareMoreCloserFakeResult(me.correctResult);
    me.fakeResult2 = me.mathOperationService.prepareMoreCloserFakeResult(me.correctResult, me.fakeResult1);
  }

  private nextPageProcessing(): void {
    const me = this;

    if (me.runGameModel.gameCount === me.maxGameCount){
      me.setRunGameModel();
      me.navCtrl.push(GameFinishPage, me.runGameModel);
    } else {
      me.gameService.prepareRunGameModelForGameProcessing(me.runGameModel);
      this.setRunGameModel();
      me.runGameModel.gameScore = me.isCorrectNumber ? me.runGameModel.gameScore + 1 : me.runGameModel.gameScore;
      me.navCtrl.push(RunGamePage, me.runGameModel);  
    }
  }

  private setRunGameModel() {
    const me = this;
    me.runGameModel.gameResults.push(me.gameService.prepareNewResultModel(me.isCorrectNumber, me.correctResult, me.chosedNumber, me.mathOperationAsString, me.gameCountToDisplay));
  }

  private verifyChosedNumber(): void {
    const me = this;
    me.isCorrectNumber = me.chosedNumber === me.correctResult;
  }

  private prepareChoosenNumberAlert() {
    const me = this;

    let toast = me.toastCtrl.create({
      message: me.isCorrectNumber ? " :-) Great!, Your choose is correct!!!" : " :-( Sorry, but your choice is incorrect",
      duration: 3000,
      position: 'bottom',
    });

    toast.onWillDismiss(() => {
      me.nextPageProcessing();
    })
  
    toast.present();
  }

  private prepareAnswerButtons() {
    const me = this;
    let answers: Array<AnswerModel> = new Array<AnswerModel>() ;
    answers.push(new AnswerModel("correctResult", me.correctResult, me.correctResultPosition));
    answers.push(new AnswerModel("fakeResult1", me.fakeResult1, me.fakeResult1Position));
    answers.push(new AnswerModel("fakeResult2", me.fakeResult2, me.fakeResult2Position));
    me.answerButtons = _.sortBy(answers, a => a.position);
  }
}
