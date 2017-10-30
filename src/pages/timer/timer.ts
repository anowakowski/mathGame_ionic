import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {RoundProgressModule} from 'angular-svg-round-progressbar';

@Component({
  selector: 'page-timer',
  templateUrl: 'timer.html',
})
export class TimerPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TimerPage');
  }

  doSomethingWithCurrentValue(progressBar){
    console.log(progressBar);
  }

}
