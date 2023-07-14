import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PokeapiService } from 'src/app/services/pokeapi.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signin2',
  templateUrl: './signin2.component.html',
  styleUrls: ['./signin2.component.css']
})
export class Signin2Component implements OnInit {

  passwordFormControl = new FormControl('', [Validators.required, Validators.minLength(8)]);

  constructor(private pokeapiService: PokeapiService,
    private userService: UserService,
    private router: Router) { }

  url: string = '';
  tipoClass: string = '';
  tipo: string = '';
  password: string = '';
  username!: string;
  tempId!: number;

  ngOnInit(): void {
    this.getPokemon();
    this.username = sessionStorage.getItem('username') ?? '';
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
  

  handleValidateToken() {
    this.userService.getUserByUsernameToken(this.username).subscribe(
      (res: any) => {
        this.tempId = res.id;
        console.log(res)
        this.userService.validateTokenEmail(this.tempId, this.password).subscribe(
          (res) => {
            console.log(res)
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Correo confirmado',
              showConfirmButton: false,
              timer: 1500
            })
            sessionStorage.removeItem('username');
            this.router.navigate(['/']);
          },
          (error: any) => {
            
          }
        )
      }
    )
  }

}