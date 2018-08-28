import { Injectable } from '@angular/core';
import { ProcessingMathResult } from './MathResultProcessing/MathRules/processingMathResult';

@Injectable()
export class MathResultService {

    constructor() { }

    public RunAllMathRules() : void{
        let proccesingMathRules: ProcessingMathResult = new ProcessingMathResult();

        proccesingMathRules.execResultMath();
    } 

}

    

