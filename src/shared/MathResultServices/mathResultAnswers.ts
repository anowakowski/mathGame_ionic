import { MathResultConfigurationModel } from "../../models/mathResultConfiguration-model";
import { MathResultModel } from "../../models/mathResult-model";
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
        this.getAnswerPositionWithClassName(mathResults);

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
        
        if (isCorrectResult){
            mathResultModel.mathOperationAsString = mathOperation;
        }

        return mathResultModel;
    }

    private getDifferences(correctResult:number, diff:number):Array<number>{
        let answers:Array<number> = [correctResult];

        while(answers.length < 4){
            let rundomNumber:number = _.random(correctResult - diff, correctResult + diff);

            if (!_.find(answers, a => a === rundomNumber)){
                answers.push(rundomNumber);
            }
        }

        return answers;
    }

    private getAnswerPositionWithClassName(mathResults:Array<MathResultModel>){
        let answerPositions:number[] = [0,1,2,3];
        let shuffledPositons:number[] = _.shuffle(answerPositions);
        let buttonColors:string[] = ['answerButtonColor1','answerButtonColor2', 'answerButtonColor3', 'answerButtonColor4'];
        let shuffledColors:string[] = _.shuffle(buttonColors);

        _.forEach(shuffledPositons, shufflePos => {
           _.forEach(mathResults, mathResult => {
                if (mathResult.position === null || mathResult.position === undefined || mathResult.position === shufflePos){
                    mathResult.className = shuffledColors[shufflePos];
                    mathResult.position = shufflePos;
                    return false;
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
