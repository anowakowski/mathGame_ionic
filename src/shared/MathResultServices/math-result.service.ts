import { Injectable } from '@angular/core';
import { MathResultAnswers } from './mathResultAnswers';
import { MathResultConfigurationModel } from '../../models/mathResultProcessing/mathResultConfiguration-model';

@Injectable()
export class MathResultService {

    constructor() { }

    public RunAllMathRules() : void{
        let mathResultAnswers: MathResultAnswers = new MathResultAnswers();

        let result = mathResultAnswers.generateAnswers(new MathResultConfigurationModel());

    } 

}

    

