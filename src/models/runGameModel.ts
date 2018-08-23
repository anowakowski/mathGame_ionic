import { GameResultModel } from "./gameResultModel";
import { GameTypeModel } from "./gameTypeModel";

export class RunGameModel {
    constructor(){
    }

    public gameType:GameTypeModel; 
    public gameLevel:string;
    public range:number; 
    public gameCount:number; 
    public gameResults:GameResultModel[]
    public gameScore:number;
}
