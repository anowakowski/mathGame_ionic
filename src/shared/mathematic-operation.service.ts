import { Injectable } from '@angular/core';
import { GameTypeModel } from '../models/gameTypeModel';

@Injectable()
export class MathematicOperationService {

    constructor() { }

    public getRandomNumberToMath():number{
        return this.getRandomNumber(100);
    }

    public getRandomPosition():number{
        return this.getRandomNumber(3);
    }

    public preparMathOperationAsString(gameTypeModel: GameTypeModel,oprationRandomNumber1:number,  operationRandomNumber2:number): string{
        return oprationRandomNumber1.toString().concat(" ", gameTypeModel.mathSign," ", operationRandomNumber2.toString());
    }

    public prepareCorrectResult(mathOperatoin:string){
        return eval(mathOperatoin);
    }

    public prepareMoreCloserFakeResult(currentResult: number, fakeResult1:number = null): number{
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
                return me.prepareRandomNumber(correctResultToCheck, range, fakeResult1);
            }
        } else if (correctResultToCheck === randomNumber){
            return me.prepareRandomNumber(correctResultToCheck, range);
        }
        return randomNumber;
    }
    
    public CastToPercenageString(value: number):string{
        return (value * 100).toString() + '%';
    }

    private getRandomNumber(range:number):number{
        return Math.floor(Math.random() * range) + 1;
    }
}