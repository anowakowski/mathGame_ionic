import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class GameService {
    constructor(public http: HttpClient) { }

    getGameType(){
        const me = this;
        return me.http.get('assets/data/gameTypes.json').toPromise().then(response => response as any[]);
    }

    getGameLevel(){
        const me = this;
        return me.http.get('assets/data/gameLevels.json').toPromise().then(response => response as any[]);
    }
}


