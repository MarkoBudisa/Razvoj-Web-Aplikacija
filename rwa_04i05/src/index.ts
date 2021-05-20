import {
  combineLatest,
  forkJoin,
  from,
  fromEvent,
  interval,
  merge,
  Observable,
  zip,
} from "rxjs";
import {
  debounceTime,
  distinct,
  filter,
  map,
  pairwise,
  reduce,
  repeat,
  retry,
  sampleTime,
  scan,
  switchMap,
  take,
} from "rxjs/operators";
import { Movie } from "./movie";
function logMouse() {
  fromEvent(document, "mousemove")
    .pipe(
      //Prvi parametar je target (Odakle uzimamo event)
      //Drugi parametar je koji je to event(String)
      map((ev: MouseEvent) => {
        return {
          //Vracamo object
          x: ev.screenX, //X koordinata misa
          y: ev.screenY, //Y koordinata misa
        };
      }),
      sampleTime(1000) //Na svaku sekundu uzima poslednju emitovanu vrednost
    )
    .subscribe((cords) => {
      console.log(`X: ${cords.x} & Y: ${cords.y}`); //Stampamo koordinate
    });
}

// function createMovieSearch(){

//     const input = document.createElement("input");
//     document.body.appendChild(input);
//     fromEvent(input,"input").pipe(//Reaguje na svako pretisnuto dugme, tj na svaki unet karakter u INPUT BOX i prikazuje sta se trenutn nalazi, tj mi mu uzimamo value

//         debounceTime(700),//Kada unesemo karakter, i nakon odredjenog vremena ne unesemo nista, tek onda se okida event (Vreme je parametar u zagradi)
//         map((ev: InputEvent) => (<HTMLInputElement>ev.target).value),//Ovo za target je cast, prvo <> pa sve u zagradi; Prvo pomocu eventa dobijamo inout box odakle cemo da vadimo value
//         filter(text => text.length>=3)//Samo ako ima 3 ili vise slova u box-u
//     ).subscribe((movie: string) => console.log(movie));
// }

// createMovieSearch();
//logMouse();
//I nacin
// return{
//     x: ev.screenX,
//     y: ev.screenY

// }
//Moze da se napise drugacije kad nemamo telo funkcije, vec samo return
//II nacin
// ({
//     x: ev.screenX,
//     y: ev.screenY
// })

const API_URL = "http://localhost:3000";

function getMoviesObservableByTitle(title: string): Observable<Movie[]> {
  //Ova funkcija vraca Fetch a to je Promise, ali ako stavimo sve u form vraca Observable

  return from(
    fetch(API_URL + "/movies/?title=" + title)
      .then((resnose) => {
        if (resnose.ok) {
          return resnose.json();
        } else {
          throw new Error("Movie not found");
        }
      })
      .catch((err) => console.log(err))
  );
}
function createMovieSearch() {
  const input = document.createElement("input");
  document.body.appendChild(input);
  fromEvent(input, "input")
    .pipe(
      //Reaguje na svako pretisnuto dugme, tj na svaki unet karakter u INPUT BOX i prikazuje sta se trenutn nalazi, tj mi mu uzimamo value

      debounceTime(700), //Kada unesemo karakter, i nakon odredjenog vremena ne unesemo nista, tek onda se okida event (Vreme je parametar u zagradi)
      map((ev: InputEvent) => (<HTMLInputElement>ev.target).value), //Ovo za target je cast, prvo <> pa sve u zagradi; Prvo pomocu eventa dobijamo inout box odakle cemo da vadimo value
      filter((text) => text.length >= 3), //Samo ako ima 3 ili vise slova u box-u
      switchMap((title) => getMoviesObservableByTitle(title)), //Prebacujemo se sa jednog toka na drugi; Ovo title je izlaz iz provog toka i ulaz u drugi
      repeat(5), //Ili retry(); Ponavlja sve onoliko putakoliko u zagradi, on ponavlja njegov resorce (Partent) Observer, samo bez error-a, koristi se da se vise puta pozove server
      map((movies) => movies[0]) //Posle switchMap, menja se objekat sa kojim radimo pa je sad objekat movie umesto title(Sadrzaj input box-a)
    )
    .subscribe((movie: Movie) => showMovie(movie));
}

function showMovie(movie: Movie) {
  if (!movie) {
    //Da li je pronasao film provera
    return;
  }
  const movieLabel = document.createElement("label");
  document.body.appendChild(movieLabel);
  movieLabel.innerHTML = `Title: ${movie.title} Score: ${movie.score} Year: ${movie.year}`;
}

createMovieSearch();
//CAS 5 (Transformacioni i kombinacioni)

//Transformacioni

// const number$ = from([1, 5, -4, 0, 8, 3, 2, 7, -6, 8, 8, 8, -3, -2]); //Dolar na kraju oznacava tok podataka
// number$
//   .pipe(
//     filter((x) => x > 0),
//     //scan((acc, broj) => acc + broj, 0)//Radi kao filter f-ja, mozemo da koristimo vrenost iz predhodne iteracije
//     //pairwise()//Uparuje dve susedne iteracije i vraca par (Niz od 2 elementa)
//     distinct() //Izbacuje duplikate vrednosti
//   )
//   .subscribe((broj) => console.log(broj));

//Kombinacioni

const stream1 = interval(1000).pipe(
  map((x) => `prvi stream: ${x}`),
  take(5)
);

const stream2 = interval(500).pipe(
  map((x) => `drugi stream: ${x}`),
  take(7)
);

// forkJoin([stream1, stream2])//Ceka dok se oba stream-a ne izvre i onda posalje poslednje emitovane vrednosti iz svakog stream-a kao niz
//   .pipe()
//   .subscribe((x) => console.log(x));

//zip(stream1, stream2).subscribe((x) => console.log(x)); //Ceka da se pojavi par (Jedan iz prvog i jedan iz drugog stream-a i tek onda emituje); isto vazi i kad ima vise tokova, ceka da se pojavi iz SVAKOG po jedan

//combineLatest([stream1, stream2]).subscribe((x) => console.log(x)); //CIm se emituje vrednost iz jednog od stream-ova, on uzima poslednju dostupnu (emitovanu) iz ostalih i tako emituje; pocinje da emituje kada svaki tok ima barem jednu emitovanu vrednost

merge(stream1, stream2).subscribe((x) => console.log(x)); //Spaja vise stream-a u jedan stream
