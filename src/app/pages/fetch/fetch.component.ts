import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fetch',
  templateUrl: './fetch.component.html',
  styleUrls: ['./fetch.component.css']
})
export class FetchComponent implements OnInit{

  ngOnInit(): void {
    if (!localStorage.getItem('isLoggedIn')) {
      console.log('no hay token o es inválido')
    } else {
      console.log('logeado')
    }
  }

  delete() {
    sessionStorage.removeItem('isLoggedIn');
  }

}
