import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {RoundProgressModule, RoundProgressConfig} from 'angular-svg-round-progressbar';

@Component({
  selector: 'page-timer',
  templateUrl: 'timer.html',
})
export class TimerPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private _config: RoundProgressConfig) {
    _config.setDefaults({
      color: '#f00',
      background: '#0f0',
      
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TimerPage');
  }

  doSomethingWithCurrentValue(progressBar){
    console.log(progressBar);
  }

}
