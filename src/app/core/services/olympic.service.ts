import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Olympic } from '../models/Olympic';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<Olympic[] | null>(null);
  constructor(private http: HttpClient) {}

  loadInitialData(): Observable<Olympic[]> {
    return this.http.get<Olympic[]>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),
      catchError((error) => {
        console.error('Erreur lors du chargement des données:', error);
        this.olympics$.next(null);
        return throwError(
          () =>
            new Error(
              'Impossible de charger les données. Veuillez réessayer plus tard.'
            )
        );
      })
    );
  }

  getOlympics(): Observable<Olympic[] | null> {
    return this.olympics$.asObservable();
  }

  getOlympicsByCountry(id: number): Observable<Olympic | undefined> {
    return this.olympics$.pipe(
      map((olympics) => olympics?.find((olympic) => olympic.id === id))
    );
  }
}
