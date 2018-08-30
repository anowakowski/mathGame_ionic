import { MathResultConfigurationModel } from "../../models/mathResultProcessing/mathResultConfiguration-model";
import { MathResultModel } from "../../models/mathResultProcessing/mathResult-model";
import * as _ from 'lodash';
import { Gamelevel } from "../../enums/gameLevel.enum";

export class MathResultAnswers {
    generateAnswers(configuration : MathResultConfigurationModel, ) : Array<MathResultModel> {
        let mathResults : Array<MathResultModel> = new Array<MathResultModel>();
        let oprationRandomNumber1:number = this.getRandomNumberToMath(configuration.gameLevel);
        let operationRandomNumber2:number = this.getRandomNumberToMath(configuration.gameLevel);
        
        let mathOperation: string = oprationRandomNumber1.toString().concat(" ", configuration.gameMathSignn," ", operationRandomNumber2.toString());
        let correctResult: number;

        correctResult = eval(mathOperation);

        let answers: Array<number> = this.getDifferences(correctResult, 5);

        this.prepareAnswers(answers, mathResults, correctResult, mathOperation);
        this.getAnswerPosition(mathResults);

        return mathResults;
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

    private getRandomNumber(range:number):number{
        return Math.floor(Math.random() * range) + 1;
    }
    
    private getRandomNumberToMath(level: Gamelevel): number {
        if (level == Gamelevel.Level1){
            return this.getRandomNumber(30);    
        } else if (level == Gamelevel.Level2){
            return this.getRandomNumber(50);
        } else {
            return this.getRandomNumber(100);
        }
    }    
}
