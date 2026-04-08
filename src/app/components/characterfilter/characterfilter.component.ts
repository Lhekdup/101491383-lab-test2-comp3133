import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
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
    ReactiveFormsModule,
    MatSelectModule, 
    MatFormFieldModule, 
    MatCardModule
  ],
  templateUrl: './characterfilter.component.html',
  styleUrl: './characterfilter.component.css'
})
export class CharacterfilterComponent implements OnInit {
  houses: string[] = ['Gryffindor', 'Slytherin', 'Hufflepuff', 'Ravenclaw'];
  
  houseControl = new FormControl(''); 
  filteredCharacters = signal<Character[]>([]);

  constructor(private hpService: HarryPotterService) {}

  ngOnInit(): void {
    this.houseControl.valueChanges.subscribe(selectedHouse => {
      if (selectedHouse) {
        this.hpService.getCharactersByHouse(selectedHouse).subscribe({
          next: (data) => this.filteredCharacters.set(data),
          error: (err) => console.error(err)
        });
      }
    });
  }
}