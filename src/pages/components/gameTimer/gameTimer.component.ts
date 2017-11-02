import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { IntervalObservable } from 'rxjs/observable/IntervalObservable';
import {Observable, Subscription } from 'rxjs/Rx';

import {RoundProgressModule, RoundProgressConfig} from 'angular-svg-round-progressbar';

@Component({
  selector: 'app-gameTimer',
  templateUrl: './gameTimer.component.html'
  
})
export class GameTimerComponent{

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
