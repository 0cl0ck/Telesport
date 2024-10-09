import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Color, ScaleType } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  olympics$: Observable<Olympic[] | null>;
  numberOfJOs: number = 0;
  medalsData: any[] = [];
  view: [number, number] = [innerWidth / 0.95, 400];
  colorScheme: Color = {
    name: 'myScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#956065', '#B8CBE7', '#89A1DB', '#793D52', '#9780A1'],
  };

  constructor(private olympicService: OlympicService) {
    this.olympics$ = this.olympicService.getOlympics();
  }

  ngOnInit(): void {
    this.olympics$
      .pipe(
        map((olympics) => {
          if (olympics === null) {
            return [];
          }
          // Compter le nombre unique de JO
          const uniqueJOs = new Set<number>();
          olympics.forEach((country) => {
            country.participations.forEach((participation) => {
              uniqueJOs.add(participation.year);
            });
          });
          this.numberOfJOs = uniqueJOs.size;

          return olympics.map((country) => ({
            name: country.country,
            value: country.participations.reduce(
              (sum, p) => sum + p.medalsCount,
              0
            ),
          }));
        }),
        catchError(() => {
          console.error('An error occurred while fetching the data');
          return of([]);
        })
      )
      .subscribe((data) => {
        this.medalsData = data;
      });
  }

  onSelect(event: any): void {
    console.log('Item clicked', event);
    // Ici, on ajoutera la logique pour rediriger vers la page de détails du pays
  }
  getTooltipText(data: any): string {
    return `
      <div class="tooltip-content">
        <span class="tooltip-country">${data.data.name}:</span>
        <span class="tooltip-value"><i class="fas fa-medal"></i> ${data.value} </span>
      </div>
    `;
  }
}
