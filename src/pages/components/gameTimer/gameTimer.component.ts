import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { IntervalObservable } from 'rxjs/observable/IntervalObservable';
import {Observable, Subscription } from 'rxjs';

import {RoundProgressModule, RoundProgressConfig} from 'angular-svg-round-progressbar';

@Component({
  selector: 'app-gameTimer',
  templateUrl: './gameTimer.component.html'
  
})
export class GameTimerComponent{
  @Input('isStaticTimer')isStaticTimer: boolean = false;
  @Input('currentNumber')currentNumberForStaticTimer: number;

  private subscription: Subscription;
  private counter: Observable<number>;
  current:number = 0;
  maxProgressNumber:number = 10;
  semicircle: boolean = false;
  radius: number = 125;
  constructor() { }

  doSomethingWithCurrentValue(progressBarValue){
    const me = this;
    if (progressBarValue === me.maxProgressNumber){
      me.ngOnDestroy();
    }
  }

  ngOnInit(){
    const me = this;
    if (me.isStaticTimer){
      me.onStartStaticCounter();
    }else{
      me.onStartCountdownCounter();
    }
  }

  onStartStaticCounter(){
    const me = this;
    me.maxProgressNumber = 3;
    me.current = me.currentNumberForStaticTimer;
  }

  onStartCountdownCounter(){
    const me = this;
    me.setCounter();
    me.subscription = me.counter.subscribe(sec => {
      me.current++
    })
  }

  setCounter(){
    const me = this;
    me.counter = Observable.interval(1000);
  }

  ngOnDestroy(){
    const me = this;
    if (!me.isStaticTimer){
      me.subscription.unsubscribe();
    }
  }

  getOverlayStyle() {
    let isSemi = this.semicircle;
    let transform = (isSemi ? '' : 'translateY(-50%) ') + 'translateX(-50%)';

    return {
      'top': isSemi ? 'auto' : '50%',
      'bottom': isSemi ? '3%' : 'auto',
      'left': '50%',
      'transform': transform,
      '-moz-transform': transform,
      '-webkit-transform': transform,
      'font-size': this.radius / 5 + 'px'
    };
  }  
}
