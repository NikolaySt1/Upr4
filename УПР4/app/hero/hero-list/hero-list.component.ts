import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero.model';
import { HeroService } from '../services/hero.service';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.scss'],
})
export class HeroListComponent implements OnInit {
  public heroes: any;
  public heroDialog: boolean = false;
  public hero: Hero = {} as Hero;

  constructor(private heroService: HeroService) {}

  ngOnInit() {
    this.refreshInfo();
  }

  refreshInfo() {
    this.heroService.getAllHeroes().subscribe({
      next: (heroes:any) => {
        let parseHeroes = heroes.map((h:any) => {
          return { ...h, powers: h.powers.map((s:any)=> s.name)};
        });

        this.heroes = parseHeroes;
      },
      error: (_err) => {},
    });
  }

  showDialog() {
    this.heroDialog = true;
  }

  createHero() {
    this.heroService.createHero(this.hero).subscribe({
      next:(hero)=> {
        this.heroDialog = false;
        this.hero.name = "";
        this.refreshInfo();
      },
      error:(err)=>{
        console.error(err);
      }
    })
  }

  deleteHero(hero:any) {
    this.heroService.deleteHero(hero.id).subscribe({
      next: (data) => {                
              this.refreshInfo();     
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
