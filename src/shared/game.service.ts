import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class GameService {
    constructor(public http: HttpClient) { }

    getGameType(){
        const me = this;
        return me.http.get('assets/data/games.json').toPromise().then(response => response as any[]);
    }
}


