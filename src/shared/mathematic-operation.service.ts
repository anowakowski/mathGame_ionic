import { Injectable } from '@angular/core';

@Injectable()
export class MathematicOperationService {

    constructor() { }

    public getRandomNumberToMath():number{
        return this.getRandomNumber(100);
    }

    public getRandomPosition():number{
        return this.getRandomNumber(4);
    }

    public getRandomNumber(range:number):number{
        return Math.floor(Math.random() * range) + 1;
    }

    public prepareMoreDetailFakeResult(currentResult: number){
        if (currentResult > 10){
          return currentResult - 3;
        } else if(currentResult > 25){
          return currentResult + 5;
        } else if(currentResult > 50){
          return currentResult - 7;
        } else if(currentResult > 50 && currentResult < 90){
          return currentResult - 9;
        } else {
          currentResult - 4;
        }
    }

  public checkFakeResult(correctResult:number, fakeResult:number):number{
    const me = this;
    if (correctResult === fakeResult){
      let newFakeFalue = me.getRandomNumberToMath();
      return me.checkFakeResult(correctResult, newFakeFalue);
    }
    return fakeResult;
  }
}