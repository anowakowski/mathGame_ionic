import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RunGameModel } from '../models/runGameModel';
import { GameTypeModel } from '../models/gameTypeModel';

import * as _ from 'lodash';
import { GameResultModel } from '../models/gameResultModel';
import { AnswerModel } from '../models/answerModel';
import { MathResultService } from './MathResult/math-result.service';

@Injectable()
export class GameService {
    constructor(public http: HttpClient, public mathResultService: MathResultService) { }

    testingMathResultServices(){
        this.mathResultService.RunAllMathRules();
    }

    getGameType(){
        const me = this;
        return me.http.get<GameTypeModel[]> ('assets/data/gameTypes.json').toPromise().then(response => response as GameTypeModel[]);
    }

    getGameLevel(){
        const me = this;
        return me.http.get('assets/data/gameLevels.json').toPromise().then(response => response as RunGameModel[]);
    }

    prepareNewResultModel(isCorrectNumber: boolean, correctNumber:number, chosedNumber: number, mathOperation:string, gameNumber:number) : GameResultModel {
        let gameResultModel = new GameResultModel();
        gameResultModel.isSuccessResult = isCorrectNumber;
        gameResultModel.chosenNumber = chosedNumber;
        gameResultModel.MathOperation = mathOperation
        gameResultModel.correctNumber = correctNumber;
        gameResultModel.GameNumber = gameNumber;
        
        return gameResultModel 
    }

    prepareFirstGameData(runGameModel: RunGameModel){
        if (runGameModel.gameCount === undefined || runGameModel.gameCount === 0){
            runGameModel.gameCount = 1;
            runGameModel.gameResults = [];
            runGameModel.gameScore = 0;
          }
    }

    prepareRunGameModelForGameProcessing(runGameModel: RunGameModel): void{
        runGameModel.gameCount++;
    }

    setGameCountForDisplay(currentGameCount: number) : number {
        if (currentGameCount !== undefined) {
          return currentGameCount;
        } 

        return 1;
    }

    setDefaultValueForGameScoreIfUndefine(value:number):number{
        if (value === undefined){
            return 0;
        }
        return value;
    }

    prepareGemeResultPercentage(gameCount: number, countOfPassGames: number): number{
        return countOfPassGames / gameCount;
    }

    prepareGameScore(isCorrectNumber:boolean, gameScore:number):number{
        return isCorrectNumber ? gameScore + 1 : gameScore;
    }

}


