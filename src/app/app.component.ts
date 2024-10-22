import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { OlympicService } from './core/services/olympic.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'olympic-games-starter';
  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.olympicService
      .loadInitialData()
      .pipe(take(1))
      .subscribe({
        error: (err) =>
          console.error('Erreur lors du chargement initial des données:', err),
      });
  }
}
