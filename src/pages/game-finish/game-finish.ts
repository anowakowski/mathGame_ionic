import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RunGameModel } from '../../models/runGameModel';
import { GameService, MathematicOperationService } from '../../shared/shared';


@IonicPage()
@Component({
  selector: 'page-game-finish',
  templateUrl: 'game-finish.html',
})
export class GameFinishPage {
  runGameModel: RunGameModel;
  percentage: string

  constructor(public navCtrl: NavController, public navParams: NavParams, public gameService: GameService, public mathOperation: MathematicOperationService) {
    this.runGameModel = navParams.data as RunGameModel;
  }

  ionViewDidLoad() {
    const me = this;
    let result: number;
    
    result = me.gameService.prepareGemeResultPercentage(this.runGameModel.gameCount, this.runGameModel.gameScore);
    me.percentage = me.mathOperation.CastToPercenageString(result);
  }
}
