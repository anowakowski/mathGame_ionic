import { MathResultBase } from "./mathResult-Base";
import { MathResultConfigurationModel } from "../../../models/mathResultProcessing/mathResultConfiguration-model";
import { MathResultModel } from "../../../models/mathResultProcessing/mathResult-model";
import * as _ from 'lodash';
import { Gamelevel } from "../../../enums/gameLevel.enum";
export class FakeResultRule extends MathResultBase {
    runMathResult(configuration : MathResultConfigurationModel, mathResults : Array<MathResultModel>)   : void {
        let correctResult:MathResultModel = _.filter(mathResults, mr => !mr.isFakeResult);
        let mathResultModelForFakeRundom1:MathResultModel = new MathResultModel();
        let mathResultModelForFakeRundom2:MathResultModel = new MathResultModel();

        let fakeRandomNumber1:number = this.prepareMoreCloserFakeResult(correctResult.result, configuration.gameLevel);
        let fakeRandomNumber2:number = this.prepareMoreCloserFakeResult(correctResult.result, configuration.gameLevel, fakeRandomNumber1);

        mathResultModelForFakeRundom1.isFakeResult = true;
        mathResultModelForFakeRundom1.result = fakeRandomNumber1;
        mathResultModelForFakeRundom2.isFakeResult = true;
        mathResultModelForFakeRundom2.result = fakeRandomNumber2;

        mathResults.push(mathResultModelForFakeRundom1);
        mathResults.push(mathResultModelForFakeRundom2);
    }


    private prepareMoreCloserFakeResult(currentResult: number, level:Gamelevel, fakeResult1:number = null): number{
        const me = this;
        let result: number = 0;
        if (currentResult > 10 && currentResult < 25){
          result = currentResult - this.prepareRandomNumber(currentResult, level, fakeResult1);
        } else if(currentResult > 25 && currentResult < 50){
          result = currentResult + this.prepareRandomNumber(currentResult, level, fakeResult1);
        } else if(currentResult > 50 && currentResult < 70){
          result = currentResult - this.prepareRandomNumber(currentResult, level, fakeResult1);
        } else if(currentResult > 70 && currentResult < 90){
            result = currentResult - this.prepareRandomNumber(currentResult, level, fakeResult1);          
        } else {
          result = currentResult - this.prepareRandomNumber(currentResult, level, fakeResult1);
        }

        return result;
    }
}
