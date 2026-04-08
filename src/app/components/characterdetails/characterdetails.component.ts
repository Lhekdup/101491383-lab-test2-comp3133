import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { HarryPotterService } from '../../services/harry-potter.service';
import { Character } from '../../models/character.model';

@Component({
  selector: 'app-characterdetails',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatButtonModule, MatListModule],
  templateUrl: './characterdetails.component.html',
  styleUrl: './characterdetails.component.css'
})
export class CharacterdetailsComponent implements OnInit {
  character: Character | null = null;

  constructor(
    private route: ActivatedRoute,
    private hpService: HarryPotterService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    
    if (id) {
      this.hpService.getCharacterById(id).subscribe({
        next: (data) => {
          this.character = data[0];
        },
        error: (err) => console.error('Error fetching details:', err)
      });
    }
  }
}