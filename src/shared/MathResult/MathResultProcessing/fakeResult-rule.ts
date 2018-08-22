import { MathResultBase } from "./mathResult-Base";
import { MathResultConfigurationModel } from "../../../models/mathResultProcessing/mathResultConfiguration-model";
import { MathResultModel } from "../../../models/mathResultProcessing/mathResult-model";
import * as _ from 'lodash';
export class FakeResultRule extends MathResultBase {
    runMathResult(configuration : MathResultConfigurationModel, mathResults : Array<MathResultModel>)   : void {
        let correctResult:MathResultModel = _.filter(mathResults, mr => !mr.isFakeResult);

        let fakeRandomNumber1 = this.prepareRandomNumber(correctResult.result, configuration.gameLevel)
   
    }
}
