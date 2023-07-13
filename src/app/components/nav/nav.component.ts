import { Component } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  buttonClicked: boolean = false;

  handleButtonClick() {
    this.buttonClicked = !this.buttonClicked;
    console.log(this.buttonClicked)
  }

  delete() {
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('credentials');
    sessionStorage.removeItem('id');
  }

}
