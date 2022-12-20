import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Hero } from '../hero.model';

@Injectable()
export class HeroService {
  constructor(private http: HttpClient) {}

  getAllHeroes() {
    return this.http.get(`${environment.backendUrl}/hero`);
  }

  createHero(heroDto:Hero) {
    return this.http.post(`${environment.backendUrl}/hero`, heroDto);
  }

  deleteHero(id: number){
    return this.http.delete(`${environment.backendUrl}/hero/${id}`);
  }
}
