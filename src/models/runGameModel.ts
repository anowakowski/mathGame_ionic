import { GameResultModel } from "./gameResultModel";
import { GameTypeModel } from "./gameTypeModel";

export class RunGameModel {
    constructor(){
    }

    public gameType:GameTypeModel; 
    public gameLevel:string; 
    public gameCount:number; 
    public gameResults:GameResultModel[]
}
