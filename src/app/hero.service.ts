import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { Heroes } from './heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class HeroService {

  constructor(private messageService: MessageService,
    private http: HttpClient) { }

    private heroesUrl = 'api/heroes' // url to web api

  // YAHA PE EK FUNCTION BANAYE H JISKA TYPE HERO H AUR JO HEROES ARRAY RETURN KR RHA HO DONO KO IMPORT BHI KR LIYE
    // jb http call krenge to iska koi jrurat nh h
  // getHeroes(): Observable<Hero[]> { // observable lagaye h jo ki emit krta h single value, an array of heroes
  //   const heroes = of(Heroes) // of se uska ek value lega 
  //   // this.messageService.add('HeroService: fetched heroes');// yaha pe message service add kr diye jisme add call kiye h taki jb bhi data fetch ho to yeh msg aaye
  //   return heroes;
  // }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl) // <Hero[]> yaha hero array ka data le rhe h
    .pipe( // error handling
      tap(_ => this.log('fetched heroes')),
      catchError(this.handleError<Hero[]>('getHeroes', []))
    );
  }

  // id dhudhne ke liye use kiye h isko
  // getHero(id: number): Observable<Hero> {
  //   const hero = Heroes.find(h => h.id === id)!; // yeh samjh nh aaya "!"" q diye h
  //   // this.messageService.add(`HeroService: fetched hero id=${id}`);
  //   return of(hero);
  // }

  getHero(id: number) : Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe( // yaha sirf array ka ek element le rhe h matlav ek object
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
  );
  }

  // since yeh bht baar use hga isi liye isko wrap kr do private log() me
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  //handle error function

 /**
 * Handle Http operation that failed.
 * Let the app continue.
 *
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}

// PUT: update the hero on the server

updateHero(hero: Hero): Observable<any>{
  return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
    tap(_ => this.log(`updated hero id=${hero.id}`)),
    catchError(this.handleError<any>('updateHero'))
  );
}

// iska jrurat hota h jb bhi put/post method use krte h
httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

/** POST: add a new hero to the server */

addHero(hero: Hero): Observable<Hero> {
  return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
    tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
    catchError(this.handleError<Hero>('addHero'))
  );
}

/** DELETE: delete the hero from the server */
deleteHero(id: number): Observable<Hero> {
  const url = `${this.heroesUrl}/${id}`;

  return this.http.delete<Hero>(url, this.httpOptions).pipe(
    tap(_ => this.log(`deleted hero id=${id}`)),
    catchError(this.handleError<Hero>('deleteHero'))
  );
}
}
