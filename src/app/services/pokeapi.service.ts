import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PokeapiService {

  constructor(private http: HttpClient) { }

  getPokemonDetails(pokemonNumber: number) {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonNumber}`;

    return this.http.get(url);
  }

}
