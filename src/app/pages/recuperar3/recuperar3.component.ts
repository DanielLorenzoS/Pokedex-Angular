import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PokeapiService } from 'src/app/services/pokeapi.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-recuperar3',
  templateUrl: './recuperar3.component.html',
  styleUrls: ['./recuperar3.component.css']
})
export class Recuperar3Component implements OnInit {

  passwordFormControl = new FormControl('', [Validators.required, Validators.minLength(8)]);
  confirmPasswordFormControl = new FormControl('', [Validators.required, Validators.minLength(8)])

  constructor(private pokeapiService: PokeapiService,
    private userService: UserService,
    private router: Router,
    private spinner: NgxSpinnerService) { }

  url: string = '';
  tipoClass: string = '';
  tipo: string = '';
  password: string = '';
  confirmPassword: string = '';
  pss: string = '';

  ngOnInit(): void {
    this.getPokemon();
    this.pss = sessionStorage.getItem('id') ?? '';
  }

  getPokemon() {
    const pokemonNumber = Math.floor(Math.random() * 20) + 1;

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
        console.error('error');
      }
    );
  }


  handleValidateTokenPassword() {
    this.spinner.show();
    if (this.password != this.confirmPassword) {
      this.spinner.hide();
      Swal.fire({
        text: `Las contraseñas no son iguales`,
        icon: 'error',
      });
    } else {
      this.userService.changePassword(parseInt(this.pss), this.password).subscribe(
        (res) => {
          this.spinner.hide();
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Contraseña cambiada correctamente',
            showConfirmButton: false,
            timer: 1500
          });
          this.router.navigate(['/']);
        }
      ),
      (error: any) => {
        this.spinner.hide();
        Swal.fire({
          text: `No se pudo cambiar la contraseña`,
          icon: 'error',
        });
      }
    }
    /* } else {
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
    } */
  }


}
