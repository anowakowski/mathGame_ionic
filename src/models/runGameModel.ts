import { GameResultModel } from "./gameResultModel";
import { GameTypeModel } from "./gameTypeModel";
import { GameLevelModel } from "./GameLevelModel";

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
