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

    return this.http.get(url, { headers })

  }
}
