import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GameService } from '../../shared/shared';
import { GameLevelPage } from '../pages';
import { RunGameModel } from '../models/runGameModel';

@Component({
  selector: 'page-game-type',
  templateUrl: 'game-type.html',
})
export class GameTypePage {

  gamesTypes: any[];

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
      me.gamesTypes = response;
    });    
  }

  tappedGameTypeItem(event, gameType){
    const me = this;



    let runGameModel = new RunGameModel();
    runGameModel.gameType = gameType;
    me.navCtrl.push(GameLevelPage, runGameModel);
  }
}
