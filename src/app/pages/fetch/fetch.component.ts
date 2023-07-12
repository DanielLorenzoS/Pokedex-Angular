import { Component, OnInit } from '@angular/core';
import { PokeapiService } from 'src/app/services/pokeapi.service';
import { PokedexService } from 'src/app/services/pokedex.service';
import Swal from 'sweetalert2';

interface MyPokemon {
  pokemon: number;
}

@Component({
  selector: 'app-fetch',
  templateUrl: './fetch.component.html',
  styleUrls: ['./fetch.component.css']
})
export class FetchComponent implements OnInit {

  constructor(private pokeapiService: PokeapiService, private pokedexService: PokedexService) { }

  id!: number;
  url!: string;
  tipo!: string;
  tipoClass!: string;
  nombre!: string;
  habilidades!: string[];
  myPokemons: MyPokemon[] = [];

  ngOnInit(): void {
    this.getPokemon();
    this.getPokemons();
  }

  getPokemon() {
    const pokemonNumber = Math.floor(Math.random() * 20) + 1;

    this.pokeapiService.getPokemonDetails(pokemonNumber).subscribe(
      (response: any) => {
        this.id = response.id;
        this.nombre = response.name;
        this.tipo = response.types[0].type.name;
        this.url = response.sprites.other.dream_world.front_default;
        this.habilidades = response.abilities.map((ability: any) => ability.ability.name).join('\n');

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

  changePokemon() {
    this.getPokemon();
  }

  getPokemons() {
    this.pokedexService.getPokemons().subscribe(
      (res: any) => {
        res.map((e: any) => {
          this.myPokemons.push({ pokemon: e.pokemon })
        });
      }
    );
  }

  handleAddPokemon(): void {

    const exists = this.myPokemons.some((e: any) => e.pokemon === this.id);

    if (exists) {
      Swal.fire({
        title: `${this.nombre} ya está en la lista.`,
        icon: 'info',
      });
      return;
    } else {
      Swal.fire({
        title: `¿Estás seguro de que deseas agregar a ${this.nombre}?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Agregar',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          this.pokedexService.addPokemon(this.id).subscribe(
            (res) => {
              this.changePokemon();
              this.myPokemons.push({ pokemon: this.id });
            }
          );
          Swal.fire({
            title: `${this.nombre} añadido correctamente`,
            icon: 'success',
          });
        }
      });
    }
  }

}
