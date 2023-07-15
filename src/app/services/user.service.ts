import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  /* url: string = 'http://localhost:8080'; */
  url: string = 'https://pokedex-auth-production-4eaa.up.railway.app';

  constructor(private http: HttpClient) { }

  getUserByUsername(email: string, password: string, username: string) {
    let credentials = btoa(`${email}:${password}`);
    console.log(credentials)
    const headers = new HttpHeaders({
      'Authorization': `Basic ${credentials}`
    });

    return this.http.get(`${this.url}/username/${username}`, { headers });
  }

  isAuthenticated(id: number, email: string, password: string) {
    let credentials = btoa(`${email}:${password}`);

    const headers = new HttpHeaders({
      'Authorization': `Basic ${credentials}`
    });

    return this.http.get(`${this.url}/auth/${id}`, { headers })

  }

  registerUser(email: string, username: string, password: string) {
    let credentials = btoa(`usuario1:password1`);

    const user = {
      "username": username,
      "password": password,
      "email": email,
      "authorities": [{ "name": 'READ' }]
    };

    const headers = new HttpHeaders({
      'Authorization': `Basic ${credentials}`
    });

    return this.http.post(`${this.url}/user`, user, { headers });
  }

  getUserByUsernameToken(username: string) {
    let credentials = btoa(`usuario1:password1`);
    console.log(credentials)
    const headers = new HttpHeaders({
      'Authorization': `Basic ${credentials}`
    });

    return this.http.get(`${this.url}/username/${username}`, { headers });
  }

  validateTokenEmail(id: number, token: string) {
    let credentials = btoa(`usuario1:password1`);

    const headers = new HttpHeaders({
      'Authorization': `Basic ${credentials}`
    });

    return this.http.post(`${this.url}/tokenEmail/${id}/${token}`, { headers })

  }


}
