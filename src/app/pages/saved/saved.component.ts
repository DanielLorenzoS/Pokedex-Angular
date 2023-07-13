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
  myPokemons: Pokemon[] = [];
  listPokemons: Pokemon[] = [];
  sessionId!: number;
  idCount: number = 0;

  constructor(private pokedexService: PokedexService, private pokeapiService: PokeapiService) { }

  ngOnInit(): void {
    this.getPokemons();

    const numeroGuardado = sessionStorage.getItem('id');
    this.sessionId = numeroGuardado ? parseInt(numeroGuardado, 10) : 0;
  }

  getPokemons() {
    this.pokedexService.getPokemons().subscribe((response: any) => {
      response.forEach((e: any) => {
        if (e.id_user === this.sessionId) {
          this.myPokemons.push(e)
        }
      });
      const pokemonIds = this.myPokemons.map((pokemon: any) => pokemon.id);
      const pokemonObservables = this.myPokemons.map((pokemon: any) =>
        this.pokeapiService.getPokemonDetails(pokemon.pokemon)
      );
      forkJoin(pokemonObservables).subscribe((responses: any) => {
        responses.forEach((res: any, index = 0) => {
          const pokemon: Pokemon = {
            id: pokemonIds[index],
            url: res.sprites.other.dream_world.front_default,
            name: res.name,
            tipo: res.types[0].type.name,
            abilities: res.abilities.map((ability: any) => ability.ability.name)
          };
          this.listPokemons.push(pokemon);
        });
      });
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
            this.myPokemons = this.myPokemons.filter((pokemon) => pokemon.id !== id);
            this.listPokemons = this.listPokemons.filter((pokemon) => pokemon.id !== id);
            Swal.fire({
              title: `${name} eliminado correctamente`,
              icon: 'success',
            });
          },
          (error) => {
            console.log(error);
          }
        );
      }
    });
  }

}
