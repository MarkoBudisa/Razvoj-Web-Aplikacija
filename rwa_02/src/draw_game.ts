import {Game} from "./game"

export class DrawGame{

    public game: Game;

    constructor(game: Game){

        this.game = game;
    }

    drawGame(box: HTMLElement){

        const gameBox = document.createElement("label");
        box.appendChild(gameBox);
        gameBox.className = "game-box";

        gameBox.innerHTML = `${this.game.teamOne} ${this.game.pointsTeamOne} - ${this.game.pointsTeamTwo} ${this.game.teamTwo}`;

    }
}