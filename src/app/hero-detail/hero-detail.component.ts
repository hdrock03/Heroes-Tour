import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  // @Input() hero ?: Hero // hero naam diye jiska type Hero h 
  // Property 'hero' has no initializer and is not definitely assigned in the constructor. jb bhi yeh error aaye to : ke phle ? lga do
  
  hero: Hero | undefined

  // isko constuctor ke under dalna hga taki id pakar sake
  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getHero()
  }

  // yaha se id ka pata chalega jb hero pe click krnege
  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero)
  }

  // isse back location pe chale jaynge
  goBack(): void {
    this.location.back();
  }

  //isse jb bhi koi heroDetail save button pe click krenge ko wo update ho jayega server me put method ke karan aur fr se wapis se pevios view pe aa jayega 
  save() : void {
    if(this.hero) {
      this.heroService.updateHero(this.hero)
        .subscribe(() => this.goBack())
    }
  }
}
