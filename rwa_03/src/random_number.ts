export class RandomNumber{

    private number: number;
    private lowLimit: number;
    private highLimit: number;

    constructor(lowLimt: number, highLimit: number){
        this.lowLimit = lowLimt;
        this.highLimit = highLimit;
    }

    generateRandomNumber(){

        this.number = Math.round(Math.random()*this.highLimit) + this.lowLimit;
        return this.number;
    }
}