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

}




