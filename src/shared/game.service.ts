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

    prepareNewResultModel(isCorrectNumber: boolean, chosedNumber: number) : GameResultModel {
        let gameResultModel = new GameResultModel();
        gameResultModel.isSuccessResult = isCorrectNumber;
        gameResultModel.result = chosedNumber;
        
        return gameResultModel 
    }

    prepareRunGameModelForGameProcessing(runGameModel: RunGameModel): void{
        if (runGameModel.gameCount === undefined){
            runGameModel.gameCount = 1;
            runGameModel.gameResults = [];
            runGameModel.gameScore = 0;
          } else {
            runGameModel.gameCount++;
        }
    }

    setGameCountForDisplay(currentGameCount: number) : number {
        if (currentGameCount !== undefined) {
          return currentGameCount + 1;
        } 

        return 1;
    }

    setDefaultValueForGameScoreIfUndefine(value:number):number{
        if (value === undefined){
            return 0;
        }
        return value;
    }
}


