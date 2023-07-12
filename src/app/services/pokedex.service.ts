import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PokedexService {

  url: string = 'https://pokedex-auth-production.up.railway.app';

  constructor(private http: HttpClient) { }

  isAuthenticated(email: string, password: string) {
    let credentials = btoa(`${email}:${password}`);

    const headers = new HttpHeaders({
      'Authorization': `Basic ${credentials}`
    });

    return this.http.get(`${this.url}/auth`, { headers })

  }

  getAccess(email: string, password: string) {
    let credentials = btoa(`${email}:${password}`);

    const headers = new HttpHeaders({
      'Authorization': `Basic ${credentials}`
    });

    return this.http.get(`${this.url}`, { headers });
  }

  getPokemons() {
    let credentials = sessionStorage.getItem('credentials');

    const headers = new HttpHeaders({
      'Authorization': `Basic ${credentials}`
    });

    return this.http.get(`${this.url}`, { headers });
  }

  addPokemon(id: number) {
    let credentials = sessionStorage.getItem('credentials');

    const pokemon = { "pokemon": id };

    const headers = new HttpHeaders({
      'Authorization': `Basic ${credentials}`
    });

    return this.http.post(`${this.url}`, pokemon, { headers });
  }

  deletePokemon(id: number) {
    let credentials = sessionStorage.getItem('credentials');

    const headers = new HttpHeaders({
      'Authorization': `Basic ${credentials}`
    });

    return this.http.delete(`${this.url}/${id}`, { headers });
  }


}
