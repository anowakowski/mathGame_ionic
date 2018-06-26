import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RunGameModel } from '../models/runGameModel';
import { GameTypeModel } from '../models/gameTypeModel';

import * as _ from 'lodash';
import { GameResultModel } from '../models/gameResultModel';
import { AnswerModel } from '../pages/run-game/answerModel';

@Injectable()
export class GameService {
    constructor(public http: HttpClient) { }

    getGameType(){
        const me = this;
        return me.http.get<GameTypeModel[]> ('assets/data/gameTypes.json').toPromise().then(response => response as GameTypeModel[]);
    }

    getGameLevel(){
        const me = this;
        return me.http.get('assets/data/gameLevels.json').toPromise().then(response => response as RunGameModel[]);
    }

    prepareNewResultModel(isCorrectNumber: boolean, chosedNumber: number, mathOperation:string) : GameResultModel {
        let gameResultModel = new GameResultModel();
        gameResultModel.isSuccessResult = isCorrectNumber;
        gameResultModel.result = chosedNumber;
        gameResultModel.MathOperation = mathOperation
        
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
}


