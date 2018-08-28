import * as _ from 'lodash';
import { MathResultBase } from './mathResult-Base';
import { CorrectResult } from './correctResult-rule';
import { MathResultConfigurationModel } from '../../../../models/mathResultProcessing/mathResultConfiguration-model';
import { MathResultModel } from '../../../../models/mathResultProcessing/mathResult-model';
import { FakeResultRule } from './fakeResult-rule';
import { ResultsPostionRule } from './resultsPostion-rule';

export class ProcessingMathResult {

    public execResultMath(){
        let rules = this.setUpMathResultRules();
        let mathResults:Array<MathResultModel>
        
        _.forEach(rules, rule => {
            mathResults = rule.execResultMath(new MathResultConfigurationModel(), mathResults);
        });
    }

    private setUpMathResultRules(): Array<MathResultBase>{
        let rules: Array<MathResultBase> = new Array<MathResultBase>();

        rules.push(new CorrectResult());
        rules.push(new FakeResultRule());
        rules.push(new ResultsPostionRule());
        rules.push(new CorrectResult());

        return rules;
    }

}
