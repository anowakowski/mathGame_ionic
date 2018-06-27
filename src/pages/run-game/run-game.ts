import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { GameTypePage } from '../pages';
import { retry } from 'rxjs/operator/retry';
import { MathematicOperationService, GameService } from '../../shared/shared';
import { AnswerModel } from './answerModel';

import * as _ from 'lodash';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { RunGameModel } from '../../models/runGameModel';
import { GameResultModel } from '../../models/gameResultModel';
import { GameFinishPage } from '../game-finish/game-finish';

@Component({
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
  selected :any;
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
    public alertCtrl: AlertController) {
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

  tappedAnswerButton(item) {
    this.selected = (this.selected === item ? null : item); 
    this.chosedNumber = item;
  };
 
  isActiveButton(item) {
    return this.selected === item;
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
    let alert = me.alertCtrl.create({
      title: "Info choise",
      message: me.isCorrectNumber ? " :-) Great!, Your choose is correct!!!" : " :-( Sorry, but your choice is incorrect",
      buttons: [{
        text: "go next page",
        handler: data => {
          me.nextPageProcessing();
        }
      }]
    });
    alert.present();
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
