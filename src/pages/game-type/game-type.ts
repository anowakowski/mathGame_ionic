import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GameService } from '../../shared/shared';

@Component({
  selector: 'page-game-type',
  templateUrl: 'game-type.html',
})
export class GameTypePage {

  gameType: any[];

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
      me.gameType = response;
    });    
  }

  tappedLevelItem(event, game){
  }
}
