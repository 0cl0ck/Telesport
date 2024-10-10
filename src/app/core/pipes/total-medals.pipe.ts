import { Pipe, PipeTransform } from '@angular/core';
import { Participation } from '../models/Participation';

@Pipe({
  name: 'totalMedals',
})
export class TotalMedalsPipe implements PipeTransform {
  transform(participations: Participation[]): number {
    return participations.reduce((sum, p) => sum + p.medalsCount, 0);
  }
}
