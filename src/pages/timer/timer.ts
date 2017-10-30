import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {RoundProgressModule, RoundProgressConfig} from 'angular-svg-round-progressbar';

import { IntervalObservable } from 'rxjs/observable/IntervalObservable';
import {Observable, Subscription } from 'rxjs/Rx';

@Component({
  selector: 'page-timer',
  templateUrl: 'timer.html',
})
export class TimerPage {

  private subscription: Subscription;
  private counter: Observable<number>;
  current:number = 0;

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
    if (progressBarValue === 10){
      this.ngOnDestroy();
    }
  }

  ngOnInit(){
    this.setCounter();
    this.subscription = this.counter.subscribe(sec=>{
      console.log(this.current++);  
    })
  }

  setCounter(){
    this.counter = Observable.interval(1000);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  
  

  

}
