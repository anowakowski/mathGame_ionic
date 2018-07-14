import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular/umd';

import { IntervalObservable } from 'rxjs/observable/IntervalObservable';
import {Observable, Subscription } from 'rxjs';

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
  semicircle: boolean = false;
  radius: number = 125;

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

  getOverlayStyle() {
    let isSemi = this.semicircle;
    let transform = (isSemi ? '' : 'translateY(-50%) ') + 'translateX(-50%)';

    return {
      'top': isSemi ? 'auto' : '50%',
      'bottom': isSemi ? '5%' : 'auto',
      'left': '50%',
      'transform': transform,
      '-moz-transform': transform,
      '-webkit-transform': transform,
      'font-size': this.radius / 3.5 + 'px'
    };
  }
}
