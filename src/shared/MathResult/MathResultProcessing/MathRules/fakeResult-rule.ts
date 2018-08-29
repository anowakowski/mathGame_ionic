import { MathResultBase } from "./mathResult-Base";
import { MathResultConfigurationModel } from "../../../../models/mathResultProcessing/mathResultConfiguration-model";
import { MathResultModel } from "../../../../models/mathResultProcessing/mathResult-model";
import * as _ from 'lodash';
import { Gamelevel } from "../../../../enums/gameLevel.enum";

export class FakeResultRule extends MathResultBase {
    runMathResult(configuration : MathResultConfigurationModel, mathResults : Array<MathResultModel>)   : void {
        let correctResult:MathResultModel = _.find(mathResults, mr => !mr.isFakeResult);
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
        let { differenceResult, randomNumber }: { differenceResult: number; randomNumber: number; } = this.getDifferenceNumber(currentResult, level, fakeResult1);

        if (me.isCorrectNumber(differenceResult)){
            return randomNumber;
        } else {
            return me.prepareMoreCloserFakeResult(currentResult, level, range, fakeResult1);
        }
    }

    private getDifferenceNumber(currentResult: number, level: Gamelevel, fakeResult1: number) {
        let me = this;
        let randomNumber: number = me.prepareRandomNumber(currentResult, level, fakeResult1);
        let differenceResult: number = currentResult - randomNumber;
        return { differenceResult, randomNumber };
    }

    private isCorrectNumber(differenceResult: number): boolean {
        if (differenceResult !== 0 && differenceResult > 0 && differenceResult < 10) {
            return true;
        } 
        return false;
    }
}
