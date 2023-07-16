import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PokeapiService } from 'src/app/services/pokeapi.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.component.html',
  styleUrls: ['./recuperar.component.css']
})
export class RecuperarComponent implements OnInit {

  emailFormControl = new FormControl('', [Validators.required, Validators.minLength(8), Validators.email]);

  constructor(private pokeapiService: PokeapiService,
    private userService: UserService,
    private router: Router,
    private spinner: NgxSpinnerService) { }

  url: string = '';
  tipoClass: string = '';
  tipo: string = '';
  password: string = '';
  email: string = '';
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


  handleSendTokenPassword() {
    this.spinner.show();

    this.userService.getUserByEmail(this.email).subscribe(
      (res: any) => {
        sessionStorage.setItem('id', res.id);
      }
    )

    let blnEmail = false;
    this.userService.getAllUsers().subscribe(
      (res: any) => {
        res.map((e: any) => {
          this.spinner.hide();
          (e.email === this.email) ? blnEmail = true : blnEmail;
        })
        if (!blnEmail) {
          Swal.fire({
            text: `El correo no ha sido registrado`,
            icon: 'info',
          });
          this.spinner.hide();
        }
        if (blnEmail) {
          this.userService.sendTokenPasswordEmail(this.email).subscribe(
            (res) => {
              this.spinner.hide();
            }
          )
          this.router.navigate(['/recuperar2']);
        }
      },
      (error: any) => {
        this.spinner.hide();
        Swal.fire({
          title: 'Oops...',
          text: `No se pudo enviar el código`,
          icon: 'error',
        });
      }
    )
  }
}
