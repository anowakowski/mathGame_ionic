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

    public prepareMoreDetailFakeResult(currentResult: number, fakeResult1:number = null): number{
        const me = this;
        let result: number = 0;
        if (currentResult > 10 && currentResult < 25){
          result = currentResult - this.prepareRandomNumber(currentResult, 3, fakeResult1);
        } else if(currentResult > 25 && currentResult < 50){
          result = currentResult + this.prepareRandomNumber(currentResult, 7, fakeResult1);
        } else if(currentResult > 50 && currentResult < 70){
          result = currentResult - this.prepareRandomNumber(currentResult, 11, fakeResult1);
        } else if(currentResult > 70 && currentResult < 90){
            result = currentResult - this.prepareRandomNumber(currentResult, 15, fakeResult1);          
        } else {
          result = currentResult - this.prepareRandomNumber(currentResult, 25, fakeResult1);
        }

        return result;
    }

    public prepareRandomNumber(correctResultToCheck:number, range:number, fakeResult1:number = null): number{
        const me = this;
        let randomNumber = me.getRandomNumber(range);
        if (fakeResult1 !== null){
            if (correctResultToCheck === randomNumber || fakeResult1 === randomNumber){
                let newFakeFaluer = me.getRandomNumber(range);
                return me.prepareRandomNumber(correctResultToCheck, range, fakeResult1);
            }
        } else if (correctResultToCheck === randomNumber){
            let newFakeFaluer = me.getRandomNumber(range);
            return me.prepareRandomNumber(correctResultToCheck, range);
        }
        return randomNumber;
    }

    public PrepareResultByChosedTypeOfMathOperation(gameTypeName: string, oprationRandomNumber1: number, operationRandomNumber2:number):number{
        if (gameTypeName === "Addition"){
        return oprationRandomNumber1 + operationRandomNumber2;
        } else if(gameTypeName === "Subtraction"){
        return oprationRandomNumber1 - operationRandomNumber2;
        } else if(gameTypeName === "Multiplication"){
        return oprationRandomNumber1 * operationRandomNumber2;
        } else if(gameTypeName === "Division"){
        return oprationRandomNumber1 / operationRandomNumber2;
        }
    }
    
    public CastToPercenageString(value: number):string{
        return (value * 100).toString() + '%';
    }

    private getRandomNumber(range:number):number{
        return Math.floor(Math.random() * range) + 1;
    }
  
}