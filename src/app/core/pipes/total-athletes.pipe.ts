import { Pipe, PipeTransform } from '@angular/core';
import { Participation } from '../models/Participation';

@Pipe({
  name: 'totalAthletes',
})
export class TotalAthletesPipe implements PipeTransform {
  transform(participations: Participation[]): number {
    return participations.reduce((sum, p) => sum + p.athleteCount, 0);
  }
}
