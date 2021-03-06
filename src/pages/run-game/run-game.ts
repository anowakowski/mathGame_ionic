import { Component, Renderer, ViewChild, ElementRef } from '@angular/core';
import {NavController, NavParams, AlertController, ToastController, Toast } from 'ionic-angular/';

import { MathematicOperationService, GameService } from '../../shared/shared';

import * as _ from 'lodash';
import { RunGameModel } from '../../models/runGame-model';
import { GameFinishPage } from '../game-finish/game-finish';
import { MathResultAnswers } from '../../shared/MathResultServices/mathResultAnswers';
import { MathResultModel } from '../../models/mathResult-model';

@Component({
  selector: 'page-run-game',
  templateUrl: 'run-game.html',
})
export class RunGamePage {

  @ViewChild('confiramtionButton', {read: ElementRef}) confiramtionButton;
  @ViewChild('downSection', {read: ElementRef}) downSection;

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
 
  answerButtonsFirstSection:Array<MathResultModel>;
  answerButtonsSecondSection:Array<MathResultModel>;
  isCorrectNumber: boolean;
  mathType: string;
  gameCountToDisplay: number;
  gameScoreToDisplay:number;

  isConfiramtedAnswer:boolean = false;

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

    let mathResultAnswers:Array<MathResultModel> = me.gameService.getResultAnswers(me.runGameModel);
    let correctResult:MathResultModel = _.find(mathResultAnswers, m => m.isCorrectNumber);
    let answerButtons: Array<MathResultModel>;

    me.mathOperationAsString = correctResult.mathOperationAsString
    me.correctResult = correctResult.result
    me.mathType = me.runGameModel.gameType.name;
    answerButtons = _.sortBy(mathResultAnswers, m => m.position);

    me.answerButtonsFirstSection = _.filter(answerButtons, ab => ab.position <= 1);
    me.answerButtonsSecondSection = _.filter(answerButtons, ab => ab.position >= 2);
 }

  tapConfirmAndGoToNext(){
    const me = this;

    if (me.chosedNumber === undefined){
      return;
    }
    me.isConfiramtedAnswer = true;
    me.verifyChosedNumber();
    me.prepareChoosenNumberAlert();
  }

  tappedAnswerButton(mathResultModel:MathResultModel) {
    const me = this;
    let answerValue = mathResultModel.result

    me.selectedAnswerButton = (me.selectedAnswerButton === answerValue ? null : answerValue); 
    me.chosedNumber = answerValue;

    me.render.setElementStyle(me.downSection.nativeElement, 'margin-bottom', '4em');

    //me.render.setElementStyle(me.confiramtionButton.nativeElement, 'padding', '30px');
    me.render.setElementStyle(me.confiramtionButton.nativeElement, 'height', '4.5em');
    me.render.setElementStyle(me.confiramtionButton.nativeElement, 'width', '4.5em');

    me.render.setElementStyle(me.confiramtionButton.nativeElement, 'opacity', '1');
    me.render.setElementStyle(me.confiramtionButton.nativeElement, 'background-color', 'rgb(156, 153, 51)');
  };
 
  isActiveAnswereButton(button) {
    return this.selectedAnswerButton === button;
  };

  isConfirmed():boolean{
    return this.isConfiramtedAnswer;
  }

  private nextPageProcessing(): void {
    const me = this;

    if (me.runGameModel.gameCount === me.maxGameCount){
      me.setRunGameModel();
      me.navCtrl.push(GameFinishPage, me.runGameModel);
    } else {
      me.gameService.prepareRunGameModelForGameProcessing(me.runGameModel);
      me.setRunGameModel();
      me.runGameModel.gameScore = me.gameService.prepareGameScore(me.isCorrectNumber, me.runGameModel.gameScore);
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
      duration: 1700,
      position: 'bottom',
    });

    toast.onWillDismiss(() => {
      me.nextPageProcessing();
    })
  
    toast.present();
  }
}
