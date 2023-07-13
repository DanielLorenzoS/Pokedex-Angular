import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PokeapiService } from 'src/app/services/pokeapi.service';
import { PokedexService } from 'src/app/services/pokedex.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  emailFormControl = new FormControl('', [Validators.required, Validators.minLength(5)]);
  passwordFormControl = new FormControl('', [Validators.required, Validators.minLength(5)]);

  constructor(private pokeapiService: PokeapiService,
    private pokedexService: PokedexService,
    private router: Router,
    private userService: UserService) { }

  url: string = '';
  tipoClass: string = '';
  tipo: string = '';
  email: string = '';
  password: string = '';
  bln: boolean = false;

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

  handleLogin() {
    this.pokedexService.isAuthenticated(this.email, this.password).subscribe(
      (res: any) => {
        console.log('Entro..', res);
        let credentials = btoa(`${this.email}:${this.password}`);
        sessionStorage.setItem('isLoggedIn', 'true');
        sessionStorage.setItem('credentials', credentials)
        this.userService.getUserByUsername(this.email).subscribe(
          (res: any) => {
            sessionStorage.setItem('id', res.id);
            console.log(typeof (res.id))
          }
        )
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Logged successfully',
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigate(['/fetch'], { queryParams: { email: this.email }});
      },
      (error: any) => {
        Swal.fire({
          title: 'Oops...',
          text: `Credenciales incorrectas`,
          icon: 'error',
        });
      }
    );

  }

  isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';

  handleAuth(): boolean {
    return sessionStorage.getItem('isLoggedIn') === 'true';
  }

}
