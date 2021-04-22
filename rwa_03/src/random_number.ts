import { Observable, Subject } from "rxjs";
import {takeUntil} from "rxjs/operators";

export class RandomNumber{

    private number: number;
    private lowLimit: number;
    private highLimit: number;
    public controlSubject: Subject<any>;

    constructor(lowLimt: number, highLimit: number){
        this.lowLimit = lowLimt;
        this.highLimit = highLimit;
    }

    generateRandomNumber(){

        this.number = Math.round(Math.random()*this.highLimit);
        if(this.number < this.lowLimit)
            this.number += this.lowLimit;
        return this.number;
    }
    rndObserver(controlObserver: Subject<any>){
        const myObserver = new Observable((generator) => {
            setInterval(() => {
                generator.next(this.generateRandomNumber());
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