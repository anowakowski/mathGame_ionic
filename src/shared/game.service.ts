import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RunGameModel } from '../models/runGameModel';
import { GameTypeModel } from '../models/gameTypeModel';

import { GameResultModel } from '../models/gameResultModel';

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


}


