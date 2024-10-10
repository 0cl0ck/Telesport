import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
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
  medalsData: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private olympicService: OlympicService
  ) {
    this.country$ = this.route.paramMap.pipe(
      switchMap((params) => {
        const id = Number(params.get('id'));
        return this.olympicService.getOlympicsByCountry(id);
      }),
      catchError(() => {
        this.router.navigate(['/']);
        return of(undefined);
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
          if (country) {
            return [
              {
                name: country.country,
                series: country.participations.map((p) => ({
                  name: p.year.toString(),
                  value: p.medalsCount,
                })),
              },
            ];
          }
          return [];
        })
      )
      .subscribe((data) => {
        this.medalsData = data;
      });
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
