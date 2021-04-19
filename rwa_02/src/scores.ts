import { Game } from "./game";

export class Scores{

    public games: Game[];

    constructor(games: Game[]){
        
        this.games = games;
    }

    addGame(game: Game){

        this.games.push(game);
    }
}