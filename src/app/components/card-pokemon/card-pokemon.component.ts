import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-card-pokemon',
  templateUrl: './card-pokemon.component.html',
  styleUrls: ['./card-pokemon.component.css']
})
export class CardPokemonComponent {

  @Input() id!: number;
  @Input() urlImage!: string;
  @Input() nombre!: string;
  @Input() tipo!: string;
  @Input() habilidades!: string[];
  @Input() action!: string;
  @Output() buttonClick: EventEmitter<void> = new EventEmitter<void>();

  getTipoClass(): string {
    let tipoClass = '';

    switch (this.tipo) {
      case 'fire':
        tipoClass = 'bg-danger';
        break;
      case 'water':
        tipoClass = 'bg-primary';
        break;
      case 'grass':
        tipoClass = 'bg-success';
        break;
      case 'bug':
        tipoClass = 'purple';
        break;
      case 'normal':
        tipoClass = 'bg-warning';
        break;
      default:
        break;
    }

    return tipoClass;
  }

  onButtonClick(): void {
    this.buttonClick.emit();
  }

}
