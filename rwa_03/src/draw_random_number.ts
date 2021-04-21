import { Observable, Subject } from "rxjs";
import {takeUntil} from "rxjs/operators";
import {RandomNumber} from "./random_number";

export class DrawRandomNumber{

    private randomNumber: RandomNumber;
    private box: HTMLElement;
    private randNumValue: number;
    private controlSubject: Subject<any>;

    constructor(box: HTMLElement){
        this.box = box;
        this.randNumValue = -1;
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
            
            this.controlSubject = new Subject();
            this.randomNumber = new RandomNumber(Number.parseInt(inputLowLimit.value),Number.parseInt(inputHighLimit.value));
            this.rndObserver(this.controlSubject).subscribe(x => {
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
            this.stopEmiting(this.controlSubject);
            btnStop.disabled = true;
            btnStart.disabled = false;
        }
    }
    rndObserver(controlObserver: Subject<any>){
        const myObserver = new Observable((generator) => {
            setInterval(() => {
                generator.next(this.randomNumber.generateRandomNumber());
            },5)
        }).pipe(
            takeUntil(controlObserver)
        )
        return myObserver;
    }
    stopEmiting(sub: Subject<any>){
        
        sub.next();
        sub.complete();
    }
}