import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Required for two-way binding
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { HarryPotterService } from '../../services/harry-potter.service';
import { Character } from '../../models/character.model';

@Component({
  selector: 'app-characterfilter',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    MatSelectModule, 
    MatFormFieldModule, 
    MatCardModule
  ],
  templateUrl: './characterfilter.component.html',
  styleUrl: './characterfilter.component.css'
})
export class CharacterfilterComponent {
  houses: string[] = ['Gryffindor', 'Slytherin', 'Hufflepuff', 'Ravenclaw'];
  selectedHouse: string = '';
  filteredCharacters: Character[] = [];

  constructor(private hpService: HarryPotterService) {}

  onHouseSelect(): void {
    if (this.selectedHouse) {
      this.hpService.getCharactersByHouse(this.selectedHouse).subscribe({
        next: (data) => {
          this.filteredCharacters = data;
        },
        error: (err) => console.error('Error fetching filtered characters:', err)
      });
    }
  }
}
