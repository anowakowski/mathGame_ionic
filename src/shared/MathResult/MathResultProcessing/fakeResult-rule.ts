import { MathResultBase } from "./mathResult-Base";
import { MathResultConfigurationModel } from "../../../models/mathResultProcessing/mathResultConfiguration-model";
import { MathResultModel } from "../../../models/mathResultProcessing/mathResult-model";
import * as _ from 'lodash';
export class FakeResultRule extends MathResultBase {
    runMathResult(configuration : MathResultConfigurationModel, mathResults : Array<MathResultModel>)   : void {
        let correctResult:MathResultModel = _.filter(mathResults, mr => !mr.isFakeResult);
        let mathResultModelForFakeRundom1:MathResultModel = new MathResultModel();
        let mathResultModelForFakeRundom2:MathResultModel = new MathResultModel();

        let fakeRandomNumber1:number = this.prepareRandomNumber(correctResult.result, configuration.gameLevel);
        let fakeRandomNumber2:number = this.prepareRandomNumber(correctResult.result, fakeRandomNumber1);

        mathResultModelForFakeRundom1.isFakeResult = true;
        mathResultModelForFakeRundom1.result = fakeRandomNumber1;
        mathResultModelForFakeRundom2.isFakeResult = true;
        mathResultModelForFakeRundom2.result = fakeRandomNumber2;

        mathResults.push(mathResultModelForFakeRundom1);
        mathResults.push(mathResultModelForFakeRundom2);
    }
}
