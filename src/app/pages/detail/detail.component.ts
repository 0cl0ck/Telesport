import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { switchMap, catchError, map } from 'rxjs/operators';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  country$: Observable<Olympic | undefined>;
  medalsData: { name: string; series: { name: string; value: number }[] }[] =
    [];
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private olympicService: OlympicService
  ) {
    this.country$ = this.olympicService.loadInitialData().pipe(
      switchMap(() => this.route.paramMap),
      switchMap((params) => {
        const id = Number(params.get('id'));
        if (isNaN(id)) {
          throw new Error('ID invalide');
        }
        return this.olympicService.getOlympicsByCountry(id);
      }),
      catchError((error) => {
        console.error(
          'Erreur lors de la récupération des données du pays:',
          error
        );
        this.router.navigate(['/not-found']);
        return EMPTY;
      })
    );
  }

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    this.country$
      .pipe(
        map((country) => {
          if (!country) {
            throw new Error('Pays non trouvé');
          }
          return [
            {
              name: country.country,
              series: country.participations.map((p) => ({
                name: p.year.toString(),
                value: p.medalsCount,
              })),
            },
          ];
        }),
        catchError((error) => {
          console.error('Erreur lors du chargement des données:', error);
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

  goBack(): void {
    this.router.navigate(['/']);
  }
}
