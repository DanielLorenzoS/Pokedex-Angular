import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { PokeapiService } from 'src/app/services/pokeapi.service';
import { PokedexService } from 'src/app/services/pokedex.service';
import Swal from 'sweetalert2';

interface Pokemon {
  id: number;
  url: string;
  name: string;
  tipo: string;
  abilities: string[];
}

@Component({
  selector: 'app-saved',
  templateUrl: './saved.component.html',
  styleUrls: ['./saved.component.css']
})
export class SavedComponent implements OnInit {
  myPokemons: string[] = []; // CORREGIDO: Debe ser Pokemon[]
  listPokemons: Pokemon[] = []; // CORREGIDO: Debe ser Pokemon[]

  constructor(private pokedexService: PokedexService, private pokeapiService: PokeapiService) {}

  ngOnInit(): void {
    this.getPokemons();
  }

  getPokemons() {
    this.pokedexService.getPokemons().subscribe((res: any) => {
      res.forEach((e: any) => this.myPokemons.push(e));

      const pokemonObservables = this.myPokemons.map((pokemon: any) =>
        this.pokeapiService.getPokemonDetails(pokemon.pokemon)
      );

      forkJoin(pokemonObservables).subscribe((responses: any) => {
        responses.forEach((res: any) => {

          const pokemon: Pokemon = {
            id: res.id,
            url: res.sprites.other.dream_world.front_default,
            name: res.name,
            tipo: res.types[0].type.name,
            abilities: res.abilities.map((ability: any) => ability.ability.name)
          };

          this.listPokemons.push(pokemon);
        });
      });
      console.log(this.listPokemons)
    });
  }

  handleDeletePokemon(id: number, name: string) {
    Swal.fire({
      title: `¿Estás seguro de que deseas eliminar a ${name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Agregar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.pokedexService.deletePokemon(id).subscribe(
          (res) => {
            console.log(res);
            this.myPokemons = [];
            this.listPokemons = [];
            this.getPokemons();
          }
        );
        Swal.fire({
          title: `${name} eliminado correctamente`,
          icon: 'success',
        });
      }
    });
  }
  
}
