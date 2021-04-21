import {DrawRandomNumber} from "./draw_random_number"

const mainBox = document.createElement("div");
mainBox.className = "main-box";
document.body.appendChild(mainBox);

const drn = new DrawRandomNumber(mainBox);

drn.draw();