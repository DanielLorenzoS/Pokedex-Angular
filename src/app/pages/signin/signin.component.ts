import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PokeapiService } from 'src/app/services/pokeapi.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  emailFormControl = new FormControl('', [Validators.required, Validators.minLength(5), Validators.email]);
  usernameFormControl = new FormControl('', [Validators.required, Validators.minLength(5)]);
  passwordFormControl = new FormControl('', [Validators.required, Validators.minLength(5)]);

  constructor(private pokeapiService: PokeapiService,
    private userService: UserService,
    private router: Router) { }

  url: string = '';
  tipoClass: string = '';
  tipo: string = '';
  email: string = '';
  username: string = '';
  password: string = '';


  ngOnInit(): void {
    this.getPokemon();
  }

  getPokemon() {
    const pokemonNumber = Math.floor(Math.random() * 20) + 1; // Número del Pokémon deseado

    this.pokeapiService.getPokemonDetails(pokemonNumber).subscribe(
      (response: any) => {
        this.tipo = response.types[0].type.name;
        this.url = response.sprites.other.dream_world.front_default;

        if (this.tipo === 'fire') {
          this.tipoClass = 'bg-danger';
        } else if (this.tipo === 'water') {
          this.tipoClass = 'bg-primary';
        } else if (this.tipo === 'grass') {
          this.tipoClass = 'bg-success';
        } else if (this.tipo === 'bug') {
          this.tipoClass = 'purple';
        } else if (this.tipo === 'normal') {
          this.tipoClass = 'bg-warning';
        }

      },
      (error: any) => {
        console.error('error'); // Manejo de errores
      }
    );
  }

  handleSignIn() {
    this.userService.registerUser(this.email, this.username, this.password).subscribe(
      (res) => {
        console.log(res)
        sessionStorage.setItem('username', this.username)
        this.router.navigate(['/signin2']);
      }
    )
  }


  isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';

  handleAuth(): boolean {
    return sessionStorage.getItem('isLoggedIn') === 'true';
  }


}
