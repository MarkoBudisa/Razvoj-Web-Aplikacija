
export class Game{

    public teamOne: string;
    public teamTwo: string;
    public pointsTeamOne: number;
    public pointsTeamTwo: number;
    public location: string;

    constructor(team1: string, team2: string, location: string){

        this.teamOne = team1;
        this.teamTwo = team2;
        this.location = location;
    }

    returnWinner(){

        return this.pointsTeamOne >= this.pointsTeamTwo ? this.teamOne: this.teamTwo;
    }

    returnSumPoints(){

        return this.pointsTeamOne + this.pointsTeamTwo;
    }

    playGame(){

        return new Promise<Game>((resolve,reject) =>{
            
            setTimeout(() =>{

                this.pointsTeamOne = Math.round(Math.random()*5);
                this.pointsTeamTwo = Math.round(Math.random()*5);

                resolve(this);
            }, Math.round(Math.random()*5000))
        })
    }
}