import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GameService } from '../../shared/shared';
import { GameLevelPage } from '../pages';

@Component({
  selector: 'page-game-type',
  templateUrl: 'game-type.html',
})
export class GameTypePage {

  gamesType: any[];

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
      me.gamesType = response;
    });    
  }

  tappedLevelItem(event, game){
    const me = this;
    me.navCtrl.push(GameLevelPage, game);
  }
}
