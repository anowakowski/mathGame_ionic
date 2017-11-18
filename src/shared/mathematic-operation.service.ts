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
        const me = this;
        if (currentResult > 10){
          return currentResult - this.getRandomNumber(3);
        } else if(currentResult > 25){
          return currentResult + this.getRandomNumber(5);
        } else if(currentResult > 50){
          return currentResult - this.getRandomNumber(7);
        } else if(currentResult > 50 && currentResult < 90){
          return currentResult - this.getRandomNumber(9);
        } else {
          return currentResult - this.getRandomNumber(5);
        }
    }

  public prepareRandomNumber(correctResultToCheck:number, range:number, fakeDetailResultToCheck:number = null): number{
    const me = this;
    let randomNumber = me.getRandomNumber(range);
    if (fakeDetailResultToCheck !== null){
        if (correctResultToCheck === randomNumber || fakeDetailResultToCheck === randomNumber){
            let newFakeFaluer = me.getRandomNumber(range);
            return me.prepareRandomNumber(correctResultToCheck, range, fakeDetailResultToCheck);
        }
    } else if (correctResultToCheck === randomNumber){
        let newFakeFaluer = me.getRandomNumber(range);
        return me.prepareRandomNumber(correctResultToCheck, range);
    }
    return randomNumber;
  }
}