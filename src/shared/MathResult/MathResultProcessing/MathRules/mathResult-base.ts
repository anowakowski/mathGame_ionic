import { MathResultModel } from "../../../../models/mathResultProcessing/mathResult-model";
import { MathResultConfigurationModel } from "../../../../models/mathResultProcessing/mathResultConfiguration-model";
import { Gamelevel } from "../../../../enums/gameLevel.enum";


export class MathResultBase {
    runMathResult(configuration : MathResultConfigurationModel, mathResults : Array<MathResultModel>)   : void {
        throw new Error("Method not implemented.");
    }
       
    getRandomNumber(range:number):number{
        return Math.floor(Math.random() * range) + 1;
    }
    
    getRandomNumberToMath(level: Gamelevel): number {
        if (level == Gamelevel.Level1){
            return this.getRandomNumber(30);    
        } else if (level == Gamelevel.Level2){
            return this.getRandomNumber(50);
        } else {
            return this.getRandomNumber(100);
        }
    }

    prepareRandomNumber(correctResultToCheck:number, level:Gamelevel, fakeResult1:number = null): number{
        const me = this;
        let randomNumber = me.getRandomNumberToMath(level);
        if (fakeResult1 !== null){
            if (correctResultToCheck === randomNumber || fakeResult1 === randomNumber){
                return me.prepareRandomNumber(correctResultToCheck, level, fakeResult1);
            }
        } else if (correctResultToCheck === randomNumber || randomNumber === fakeResult1){
            return me.prepareRandomNumber(correctResultToCheck, level);
        }
        return randomNumber;
    }



}




