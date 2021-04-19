import { DrawGame } from "./draw_game";
import { DrawScores } from "./draw_scores";
import { Game } from "./game";
import { Scores } from "./scores";

let games: Game[] = [];
games[0] = new Game("Liverpul","Real Madrid","London");
games[1] = new Game("Bajern Minhen","Celsi","Beograd");
games[3] = new Game("PSG","Manchester City","Bec");

let scores = new Scores(games);

let boxForGames = document.createElement("div");
boxForGames.className = "box-for-games";

let btn = document.createElement("button");
btn.innerHTML = "Play games!";
btn.onclick = ev => {
    const drawScores = new DrawScores(scores);
    drawScores.drawScores(boxForGames);
}
document.body.appendChild(btn);
document.body.appendChild(boxForGames);
