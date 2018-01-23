export class RunGameModel {
    constructor(
        public gameType:string, 
        public gameLevel:string, 
        public gameCount:number, 
        public result:number, 
        public isSuccessResult:boolean){
    }
}
