import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RunGameModel } from '../../models/runGameModel';
import { GameService, MathematicOperationService } from '../../shared/shared';
import { GameResultModel } from '../../models/gameResultModel';
import { DashboardPage } from '../pages';
import { GameTypePage } from '../game-type/game-type';


@IonicPage()
@Component({
  selector: 'page-game-finish',
  templateUrl: 'game-finish.html',
  
})
export class GameFinishPage {
  runGameModel: RunGameModel;
  percentage: string;
  actualGameScore: number;
  totalPosibilityScore: number;
  gameResults: GameResultModel[]

  constructor(public navCtrl: NavController, public navParams: NavParams, public gameService: GameService, public mathOperation: MathematicOperationService) {
    this.runGameModel = navParams.data as RunGameModel;
  }

  ionViewDidLoad() {
    this.prepareSummary();
  }

  backToGameType(){
    this.navCtrl.push(GameTypePage);
  }

  private prepareSummary(){
    const me = this;
    me.percentage = me.mathOperation.CastToPercenageString(me.gameService.prepareGemeResultPercentage(me.runGameModel.gameCount, me.runGameModel.gameScore));
    me.actualGameScore = me.runGameModel.gameScore;
    me.totalPosibilityScore = me.runGameModel.gameCount;
    me.gameResults = me.runGameModel.gameResults;
  }
}
