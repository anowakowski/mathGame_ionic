import { Injectable } from '@angular/core';

@Injectable()
export class MathematicOperationService {

    constructor() { }

    public getRandomNumberToMath():number{
        return this.getRandomNumber(100);
    }

    public getRandomPosition():number{
        return this.getRandomNumber(4);
    }

    public getRandomNumber(range:number):number{
        return Math.floor(Math.random() * range) + 1;
    }

}