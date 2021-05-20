
export interface Movie{//Govori kako nesto izgleda, nije kao interface u ostalim programskim jezicima
    id: number;
    title: string;
    year: number;
    score: number;
}

//Pretraga po neko property-u:(npr) http://localhost:3000/movies/?title=Batman