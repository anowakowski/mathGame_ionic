import { GameResultModel } from "./gameResult-model";
import { GameTypeModel } from "./gameType-model";
import { GameLevelModel } from "./gameLevel-model";

export class RunGameModel {
    constructor(){
    }

    public gameType:GameTypeModel; 
    public gameLevel:GameLevelModel;
    public range:number; 
    public gameCount:number; 
    public gameResults:GameResultModel[]
    public gameScore:number;
}
