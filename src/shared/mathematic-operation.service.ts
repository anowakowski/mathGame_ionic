import { Injectable } from '@angular/core';

@Injectable()
export class MathematicOperationService {

    constructor() { }

    public getRandomNumberToMath():number{
        return this.getRandomNumber(100);
    }

    public getRandomPosition():number{
        return this.getRandomNumber(3);
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
          return currentResult - 4;
        }
    }

  public checkFakeResult(correctResultToCheck:number, range:number, fakeDetailResultToCheck:number = null): number{
    const me = this;
    let randomNumber = me.getRandomNumber(range);
    if (fakeDetailResultToCheck !== null){
        if (correctResultToCheck === randomNumber || fakeDetailResultToCheck === randomNumber){
            let newFakeFaluer = me.getRandomNumber(range);
            return me.checkFakeResult(correctResultToCheck, range, fakeDetailResultToCheck);
        }
    } else if (correctResultToCheck === randomNumber){
        let newFakeFaluer = me.getRandomNumber(range);
        return me.checkFakeResult(correctResultToCheck, range);
    }

    return randomNumber;
  }
}