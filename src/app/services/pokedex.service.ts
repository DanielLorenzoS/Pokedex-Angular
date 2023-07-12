import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PokedexService {

  constructor(private http: HttpClient) { }

  isAuthenticated(email: string, password: string) {
    let url = 'http://localhost:8080/auth';
    let credentials = btoa(`${email}:${password}`);

    const headers = new HttpHeaders({
      'Authorization': `Basic ${credentials}`
    });

    return this.http.get(url, { headers })

  }

  /* isAuthenticated(email: string, password: string): boolean {
    let bln;
    let url = 'http://localhost:8080/auth';
    let credentials = btoa(`${email}:${password}`);

    const headers = new HttpHeaders({
      'Authorization': `Basic ${credentials}`
    });

    if (this.http.get(url, { headers })) {
      bln = true;
    } else {
      bln = false;
    }

    return bln;

  } */

  getAccess(email: string, password: string) {
    let url = 'http://localhost:8080/';
    let credentials = btoa(`${email}:${password}`);

    const headers = new HttpHeaders({
      'Authorization': `Basic ${credentials}`
    });

    return this.http.get(url, { headers });
  }

  getPokemons() {
    let url = 'http://localhost:8080/';

    let credentials = sessionStorage.getItem('credentials');

    const headers = new HttpHeaders({
      'Authorization': `Basic ${credentials}`
    });

    return this.http.get(url, { headers });
  }

  addPokemon(id: number) {
    let url = 'http://localhost:8080/';

    let credentials = sessionStorage.getItem('credentials');

    const pokemon = { "pokemon": id };

    const headers = new HttpHeaders({
      'Authorization': `Basic ${credentials}`
    });

    return this.http.post(url, pokemon, { headers });
  }

  deletePokemon(id: number) {
    let url = `http://localhost:8080/${id}`;

    let credentials = sessionStorage.getItem('credentials');

    const headers = new HttpHeaders({
      'Authorization': `Basic ${credentials}`
    });

    return this.http.delete(url, { headers });
  }


}
