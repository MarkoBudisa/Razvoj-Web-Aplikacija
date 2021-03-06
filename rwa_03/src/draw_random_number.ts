import {RandomNumber} from "./random_number";
import { Subject } from "rxjs";

export class DrawRandomNumber{

    private randomNumber: RandomNumber;
    private box: HTMLElement;

    constructor(box: HTMLElement){
        this.box = box;
    }

    draw(){

        const title = document.createElement("label");
        title.innerHTML = "Random number generator";
        title.className = "title";
        this.box.appendChild(title);

        const inputLowLimit = document.createElement("input");
        inputLowLimit.type = "number";
        inputLowLimit.placeholder = "Input low limit (0 or more)";
        inputLowLimit.className = "input-limit";
        this.box.appendChild(inputLowLimit);

        const inputHighLimit = document.createElement("input");
        inputHighLimit.type = "number";
        inputHighLimit.placeholder = "Input high limit";
        inputHighLimit.className = "input-limit"
        this.box.appendChild(inputHighLimit);

        let numberLabel: HTMLElement = document.createElement("label");
        numberLabel.className = "number-label";
        numberLabel.innerHTML = "0";

        const btnStart = document.createElement("button");
        btnStart.innerHTML = "Generate number";
        btnStart.className = "btn";
        this.box.appendChild(btnStart);
        btnStart.onclick = () => {
            
            this.randomNumber = new RandomNumber(Number.parseInt(inputLowLimit.value),Number.parseInt(inputHighLimit.value));
            this.randomNumber.controlSubject = new Subject();
            this.randomNumber.rndObserver(this.randomNumber.controlSubject).subscribe(x => {
                numberLabel.innerHTML = x.toString();
            })
            btnStart.disabled = true;
            btnStop.disabled = false;

        }

        this.box.appendChild(numberLabel);
        
        const btnStop = document.createElement("button");
        btnStop.disabled = true;
        btnStop.innerHTML = "Stop";
        btnStop.className = "btn";
        this.box.appendChild(btnStop);
        btnStop.onclick = () => {
            this.randomNumber.stopEmiting(this.randomNumber.controlSubject);
            btnStop.disabled = true;
            btnStart.disabled = false;
        }
    }
    
}