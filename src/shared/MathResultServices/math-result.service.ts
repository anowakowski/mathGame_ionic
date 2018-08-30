import { Injectable } from '@angular/core';
import { MathResultAnswers } from './mathResultAnswers';
import { MathResultConfigurationModel } from '../../models/mathResultConfiguration-model';
import { RunGameModel } from '../../models/runGame-model';
import { Gamelevel } from '../../enums/gameLevel.enum';
import { GameType } from '../../enums/gameType.enum';
import { MathResultModel } from '../../models/mathResult-model';

@Injectable()
export class MathResultService {

    constructor() { }

    public getResultAnswers(runGameModel: RunGameModel) :Array<MathResultModel>{
        let mathResultAnswers: MathResultAnswers = new MathResultAnswers();
        let configuration = this.mapToConfiguration(runGameModel);
        return mathResultAnswers.generateAnswers(configuration);
    } 

    private mapToConfiguration(runGameModel: RunGameModel) {
        let configuration: MathResultConfigurationModel = new MathResultConfigurationModel();
        
        configuration.gameLevel = Gamelevel[runGameModel.gameLevel.name];
        configuration.gameMathSignn = runGameModel.gameType.mathSign;
        configuration.gameType = GameType[runGameModel.gameType.name];
        configuration.range = runGameModel.range;

        return configuration;
    }
}

    

