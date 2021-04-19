import {Scores} from "./scores"
import {DrawGame} from "./draw_game"

export class DrawScores{

    public scores: Scores;

    constructor(scores: Scores){

        this.scores = scores;
    }

    drawScores(box: HTMLElement){

        this.scores.games.forEach(game => {

            game.playGame()
            .then(n => {
                let drawGame = new DrawGame(n);
                drawGame.drawGame(box);
            })
        })
    }
}