import { MathResultBase } from "./mathResult-Base";
import { MathResultConfigurationModel } from "../../../../models/mathResultProcessing/mathResultConfiguration-model";
import { MathResultModel } from "../../../../models/mathResultProcessing/mathResult-model";
import * as _ from 'lodash';
import { Gamelevel } from "../../../../enums/gameLevel.enum";
import { leave } from "@angular/core/src/profile/wtf_impl";

export class GenereateResultAnswers extends MathResultBase {
    runMathResult(configuration : MathResultConfigurationModel, mathResults : Array<MathResultModel>) : void {
        
        let oprationRandomNumber1:number = this.getRandomNumberToMath(configuration.gameLevel);
        let operationRandomNumber2:number = this.getRandomNumberToMath(configuration.gameLevel);
        
        let mathOperation: string = oprationRandomNumber1.toString().concat(" ", configuration.gameMathSignn," ", operationRandomNumber2.toString());
        let correctResult: number;

        correctResult = eval(mathOperation);

        let answers: Array<number> = this.getDifferences(correctResult, 5);

        this.prepareAnswers(answers, mathResults, correctResult, mathOperation);
        this.getAnswerPosition(mathResults);
    }

    private prepareAnswers(answers: number[], mathResults: MathResultModel[], correctResult: number, mathOperation: string) {
        _.forEach(answers, answer => {
            mathResults.push(this.mapToMathResultModel(answer, correctResult === answer, mathOperation));
        });
    }

    private mapToMathResultModel(answer:number, isCorrectResult:boolean, mathOperation:string):MathResultModel{
        let mathResultModel = new MathResultModel();

        mathResultModel.result = answer;
        mathResultModel.isCorrectNumber = isCorrectResult;
        mathResultModel.position = "0";
        
        if (isCorrectResult){
            mathResultModel.mathOperationAsString = mathOperation;
        }

        return mathResultModel;
    }

    private getDifferences(correctResult:number, diff:number):Array<number>{
        let answers:Array<number> = [correctResult];

        while(answers.length < 3){
            let r:number = _.random(correctResult - diff, correctResult + diff);

            if (!_.find(answers, a => a == r)){
                answers.push(r);
            }
        }

        return answers;
    }

    private getAnswerPosition(mathResults:Array<MathResultModel>){
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
