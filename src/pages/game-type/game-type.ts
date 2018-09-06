import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GameService } from '../../shared/shared';
import { GameLevelPage } from '../pages';
import { RunGameModel } from '../../models/runGame-model';
import { GameTypeModel } from '../../models/gameType-model';

import * as _ from 'lodash';

@Component({
  selector: 'page-game-type',
  templateUrl: 'game-type.html',
})
export class GameTypePage {

  gamesTypesSectionOne: GameTypeModel[];
  gamesTypesSectionTwo: GameTypeModel[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private gameService: GameService) {
  }

  ionViewDidLoad() {
    this.getGameType();
  }

  gotToGameLevel(){
  }

  getGameType(){
    const me = this;
    me.gameService.getGameType().then(response => {
      let gameType:Array<GameTypeModel> = response;

      me.gamesTypesSectionOne = _.filter(gameType, gt => gt.displaySection == 1);
      me.gamesTypesSectionTwo = _.filter(gameType, gt => gt.displaySection == 2);

    });    
  }

  isShouldBeDisabled(gameType:GameTypeModel):boolean{
    if (gameType.name != "Addition"){
      return true;
    } else{
      return false;
    }

  }

  tappedGameTypeItem(event, gameType){
    const me = this;

    let runGameModel = new RunGameModel();
    runGameModel.gameType = gameType;
    me.navCtrl.push(GameLevelPage, runGameModel);
  }
}
