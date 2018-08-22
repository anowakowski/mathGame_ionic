import { MathResultBase } from "./mathResult-Base";
import { MathResultConfigurationModel } from "../../../models/mathResultProcessing/mathResultConfiguration-model";
import { MathResultModel } from "../../../models/mathResultProcessing/mathResult-model";

export class CorrectResult extends MathResultBase {
    runMathResult(configuration : MathResultConfigurationModel, mathResults : Array<MathResultModel>)   : void {
        
        let oprationRandomNumber1:number = this.getRandomNumberToMath(configuration.gameLevel);
        let operationRandomNumber2:number = this.getRandomNumberToMath(configuration.gameLevel);
        let mathResultModel = new MathResultModel();
        let mathOperation: string = oprationRandomNumber1.toString().concat(" ", configuration.gameMathSignn," ", operationRandomNumber2.toString());
        let result: number;

        result = eval(mathOperation);

        mathResultModel.resultAsString = mathOperation;
        mathResultModel.isFakeResult = true;
        mathResultModel.result = result;

        mathResults.push(mathResultModel);
    }
}
