import * as _ from 'lodash';
import { MathResultBase } from './mathResult-Base';
import { AnswerValueRule } from './answerValue-rule';
import { MathResultConfigurationModel } from '../../../models/mathResultProcessing/mathResultConfiguration-model';
import { MathResultModel } from '../../../models/mathResultProcessing/mathResult-model';

export class ProcessingMathResult {
    
    
    public execResultMath(){
        let rules = this.setUpMathResultRules();
        let mathResults:Array<MathResultModel>
        _.forEach(rules, rule => {
            mathResults = rule.execResultMath(new MathResultConfigurationModel());
        });
    }

    private setUpMathResultRules(): Array<MathResultBase>{
        let rules: Array<MathResultBase> = new Array<MathResultBase>();

        rules.push(new AnswerValueRule());

        return rules;
    }

}
