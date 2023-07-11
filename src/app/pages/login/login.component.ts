import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PokeapiService } from 'src/app/services/pokeapi.service';
import { PokedexService } from 'src/app/services/pokedex.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private pokeapiService: PokeapiService, private pokedexService: PokedexService, private router: Router) { }

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
        sessionStorage.setItem('isLoggedIn', 'true');
        console.log(sessionStorage.getItem('isLoggedIn'))
        this.router.navigate(['/fetch']);
      },
      (error: any) => {
        console.error('Error en la solicitud:', error.status);
      }
    );
    
  }

  isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';

  handleAuth(): boolean {
    console.log('aaaaaaaauth ' + sessionStorage.getItem('isLoggedIn'))
    return sessionStorage.getItem('isLoggedIn') === 'true';
  }

}
