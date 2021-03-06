import { Gamelevel } from "../enums/gameLevel.enum";
import { GameType } from "../enums/gameType.enum";

export class MathResultConfigurationModel {
    public gameLevel:Gamelevel;
    public gameType:GameType;
    public gameMathSignn: string;
    public range:number;
}
