import { MathResultBase } from "./mathResult-Base";
import { MathResultConfigurationModel } from "../../../../models/mathResultProcessing/mathResultConfiguration-model";
import { MathResultModel } from "../../../../models/mathResultProcessing/mathResult-model";
import * as _ from 'lodash';
import { Gamelevel } from "../../../../enums/gameLevel.enum";
export class FakeResultRule extends MathResultBase {
    runMathResult(configuration : MathResultConfigurationModel, mathResults : Array<MathResultModel>)   : void {
        let correctResult:MathResultModel = _.filter(mathResults, mr => !mr.isFakeResult);
        let mathResultModelForFakeRundom1:MathResultModel = new MathResultModel();
        let mathResultModelForFakeRundom2:MathResultModel = new MathResultModel();

        let fakeRandomNumber1:number = this.prepareMoreCloserFakeResult(correctResult.result, configuration.gameLevel, configuration.range);
        let fakeRandomNumber2:number = this.prepareMoreCloserFakeResult(correctResult.result, configuration.gameLevel,  configuration.range, fakeRandomNumber1);

        mathResultModelForFakeRundom1.isFakeResult = true;
        mathResultModelForFakeRundom1.result = fakeRandomNumber1;
        mathResultModelForFakeRundom2.isFakeResult = true;
        mathResultModelForFakeRundom2.result = fakeRandomNumber2;

        mathResults.push(mathResultModelForFakeRundom1);
        mathResults.push(mathResultModelForFakeRundom2);
    }


    private prepareMoreCloserFakeResult(currentResult: number, level:Gamelevel, range:number, fakeResult1:number = null): number{
        const me = this;
        let result: number = 0;

        let differenceResult = range - currentResult;

        if (result == 0){
            this.prepareMoreCloserFakeResult(currentResult, level, range, fakeResult1);
        }

        let moreCloser = currentResult - differenceResult;

        if (moreCloser > 0 && moreCloser < 10){
            result = moreCloser;
        }
        else{
            this.prepareMoreCloserFakeResult(currentResult, level, range, fakeResult1);
        }

        return result;
    }
}
