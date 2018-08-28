import { MathResultBase } from "./mathResult-Base";
import { MathResultConfigurationModel } from "../../../../models/mathResultProcessing/mathResultConfiguration-model";
import { MathResultModel } from "../../../../models/mathResultProcessing/mathResult-model";
import * as _ from 'lodash';

export class ResultsPostionRule extends MathResultBase {
    runMathResult(configuration : MathResultConfigurationModel, mathResults : Array<MathResultModel>)   : void {
        let answerPositions:number[] = [1,2,3];
        let shuffledPositons:number[] = _.shuffle(answerPositions);

        _.forEach(shuffledPositons, shufflePos => {
            _.forEach(mathResults, mathResult => {
                if (mathResult.position !== null || mathResult.position !== undefined){
                    mathResult.position = shufflePos;
                    return;
                }
            })
        });
    }
}


