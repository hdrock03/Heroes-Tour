import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  // hero : Hero ={ // isko delete kr diye qki av yeh value array se le rhe h
  //   id:1,
  //   name: 'windstorm'
  // }

  // heroes= Heroes // services aane ke baad isko use nh krenge

  heroes: Hero[] = [] // hero ek empty array h jiska type Hero h

  // selectedHero ?: Hero;  // iska matlab h selectedHero ko Hero type assign kr rhe h either uska value null hga ya Hero
  // link lagne ke baad is code ka jarurat nh h

  // selectedHero : Hero= { // upar wala use kro ya yeh dono chalega
  //   id: 0, // id me agr '' daal diye to wo string ho jayega jo error fek dega qki id ko number define kiye h isilye 0 default value de rhe h
  //   name: ''
  // }
  constructor(private heroservice: HeroService) { } // yaha pe heroservice ko call krenge

  ngOnInit(): void {
    this.getHeroes();
  }

  // onSelect(hero:any){ // link lagne ke baad is code ka jarurat nh h
  //   // console.log(hero);
  //   this.selectedHero=hero
  // }

  getHeroes(): void { // yaha getHeroes ek method banaye jo ki kuch return nh kr rha h isilye void use kiye h
    // this.heroes = this.heroservice.getHeroes() // yeh observable lagane ke baad kaam nh krega, subscribe use krena hga

    this.heroservice.getHeroes()
      .subscribe(x => this.heroes = x)
  }

  // to add new Hero
  add(name: string): void{
    name = name.trim();
    if(!name) {return;}
    this.heroservice.addHero({ name } as Hero)
    .subscribe(hero => {
      this.heroes.push(hero);
    });
  }

  //delete the Hero
  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroservice.deleteHero(hero.id).subscribe();
  }

}
