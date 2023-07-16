import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PokeapiService } from 'src/app/services/pokeapi.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-recuperar2',
  templateUrl: './recuperar2.component.html',
  styleUrls: ['./recuperar2.component.css']
})
export class Recuperar2Component implements OnInit {

  emailFormControl = new FormControl('', [Validators.required, Validators.minLength(8), Validators.email]);

  constructor(private pokeapiService: PokeapiService,
    private userService: UserService,
    private router: Router,
    private spinner: NgxSpinnerService) { }

  url: string = '';
  tipoClass: string = '';
  tipo: string = '';
  email: string = '';
  username!: string;

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


  handleSendTokenPassword() {
    if (this.email.length === 0) {
      Swal.fire({
        text: `Ingresa el código`,
        icon: 'error',
      });
    } else {
      this.spinner.show();

      this.userService.validateTokenPasswordEmail(this.email).subscribe(
        (res: any) => {
          this.spinner.hide();
          if (res) {
            this.router.navigate(['/recuperar3']);
          } else {
            Swal.fire({
              text: `El código no es válido`,
              icon: 'warning',
            });
          }

        },
        (error: any) => {
          this.spinner.hide();
          Swal.fire({
            title: 'Oops...',
            text: `No se pudo validar el código`,
            icon: 'error',
          });
        }
      )
    }
  }
}
