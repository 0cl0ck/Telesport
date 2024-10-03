import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public olympics$: Observable<Olympic[] | null>;

  constructor(private olympicService: OlympicService) {
    this.olympics$ = this.olympicService.getOlympics();
  }

  ngOnInit(): void {
    //Les données sont chargées dans AppComponent
  }
}
