import * as _ from 'lodash';
import { MathResultBase } from './mathResult-Base';
import { CorrectResult } from './correctResult-rule';
import { MathResultConfigurationModel } from '../../../../models/mathResultProcessing/mathResultConfiguration-model';
import { MathResultModel } from '../../../../models/mathResultProcessing/mathResult-model';
import { FakeResultRule } from './fakeResult-rule';
import { ResultsPostionRule } from './resultsPostion-rule';
import { Gamelevel } from '../../../../enums/gameLevel.enum';
import { GameType } from '../../../../enums/gameType.enum';

export class ProcessingMathResult {

    public execResultMath(){
        let rules = this.setUpMathResultRules();
        let mathResults:Array<MathResultModel> = new Array<MathResultModel>();
        let configuration = new MathResultConfigurationModel();
        configuration.gameLevel = Gamelevel.Level1;
        configuration.gameMathSignn = "+";
        configuration.gameType = GameType.Addition;
        configuration.range = 50;
        
        _.forEach(rules, rule => {
            rule.runMathResult(configuration, mathResults);
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
