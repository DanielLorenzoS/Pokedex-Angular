import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  /* url: string = 'http://localhost:8080'; */
  url: string = 'https://pokedex-auth-production.up.railway.app';

  constructor(private http: HttpClient) { }

  getUserByUsername(username: string) {
    let credentials = sessionStorage.getItem('credentials');

    const headers = new HttpHeaders({
      'Authorization': `Basic ${credentials}`
    });

    return this.http.get(`${this.url}/username/${username}`, { headers });
  }
}
