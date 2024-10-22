import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MedalData } from 'src/app/core/models/MedalData';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  olympics$: Observable<Olympic[] | null>;
  numberOfJOs: number = 0;
  medalsData: MedalData[] = [];
  view: [number, number] = [800, 400];
  colorScheme: Color = {
    name: 'myScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#956065', '#B8CBE7', '#89A1DB', '#793D52', '#9780A1'],
  };
  errorMessage: string | null = null;

  private destroy$ = new Subject<void>();

  constructor(private olympicService: OlympicService, private router: Router) {
    this.olympics$ = this.olympicService.getOlympics();
  }

  ngOnInit(): void {
    this.updateChartSize();
    window.addEventListener('resize', this.updateChartSize.bind(this));
    this.olympics$
      .pipe(
        takeUntil(this.destroy$),
        map((olympics) => {
          if (olympics === null) {
            return [];
          }
          // Compte le nombre unique de JO
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
            id: country.id,
          }));
        }),
        catchError((error) => {
          console.error('Erreur dans HomeComponent:', error);
          this.errorMessage =
            'Une erreur est survenue lors du chargement des données.';
          return of([]);
        })
      )
      .subscribe({
        next: (data) => {
          this.medalsData = data;
        },
        error: (error) => {
          console.error('Erreur de souscription:', error);
          this.errorMessage = 'Une erreur inattendue est survenue.';
        },
      });
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.updateChartSize.bind(this));
    this.destroy$.next();
    this.destroy$.complete();
  }

  private updateChartSize(): void {
    const chartContainer = document.querySelector('.chart-container');
    if (chartContainer) {
      this.view = [chartContainer.clientWidth, 400];
    }
  }

  onSelect(event: { name: string }): void {
    if (event && event.name) {
      const selectedCountry = this.medalsData.find(
        (country) => country.name === event.name
      );
      if (selectedCountry && selectedCountry.id) {
        this.router.navigate(['/detail', selectedCountry.id]);
      }
    }
  }
  getTooltipText(data: { data: MedalData; value: number }): string {
    return `
      <div class="tooltip-content">
        <span class="tooltip-country">${data.data.name}:</span>
        <span class="tooltip-value"><i class="fas fa-medal"></i> ${data.value} </span>
      </div>
    `;
  }
}
