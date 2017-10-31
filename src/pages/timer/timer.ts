import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { IntervalObservable } from 'rxjs/observable/IntervalObservable';
import {Observable, Subscription } from 'rxjs/Rx';

import {RoundProgressModule, RoundProgressConfig} from 'angular-svg-round-progressbar';

@Component({
  selector: 'page-timer',
  templateUrl: 'timer.html',
})
export class TimerPage {

  private subscription: Subscription;
  private counter: Observable<number>;
  current:number = 0;
  maxProgressNumber:number = 10;

  constructor(public navCtrl: NavController, public navParams: NavParams, private _config: RoundProgressConfig) {
    _config.setDefaults({
      color: '#f00',
      background: '#0f0',
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TimerPage');
  }

  doSomethingWithCurrentValue(progressBarValue){
    const me = this;
    if (progressBarValue === me.maxProgressNumber){
      me.ngOnDestroy();
    }
  }

  ngOnInit(){
    const me = this;
    me.setCounter();
    me.subscription = me.counter.subscribe(sec => {
      console.log(me.current++);  
      console.log(me.maxProgressNumber);  
    })
  }

  setCounter(){
    const me = this;
    me.counter = Observable.interval(1000);
  }

  ngOnDestroy(){
    const me = this;
    me.subscription.unsubscribe();
  }
}
