import { Injectable } from '@angular/core';
import { MathResultAnswers } from './mathResultAnswers';
import { MathResultConfigurationModel } from '../../models/mathResultProcessing/mathResultConfiguration-model';
import { RunGameModel } from '../../models/runGameModel';
import { Gamelevel } from '../../enums/gameLevel.enum';
import { GameType } from '../../enums/gameType.enum';

@Injectable()
export class MathResultService {

    constructor() { }

    public RunAllMathRules(runGameModel: RunGameModel) : void{
        let mathResultAnswers: MathResultAnswers = new MathResultAnswers();
        let configuration = this.mapToConfiguration(runGameModel);
        let result = mathResultAnswers.generateAnswers(configuration);
    } 

    private mapToConfiguration(runGameModel: RunGameModel) {
        let configuration: MathResultConfigurationModel = new MathResultConfigurationModel();
        
        configuration.gameLevel = Gamelevel[runGameModel.gameLevel];
        configuration.gameMathSignn = runGameModel.gameType.mathSign;
        configuration.gameType = GameType[runGameModel.gameType.name];
        configuration.range = runGameModel.range;

        return configuration;
    }
}

    

