import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { MapService } from '../../core/map-service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.less']
})
export class MainPageComponent implements OnInit, OnDestroy {

  locations: any;
  private unsubscribe = new Subject<void>();


  constructor(private mapService: MapService) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  private loadData(): void {
    this.locations = [];
    this.mapService.getAll()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(res => {
        if (res) {
          this.locations = res;
        }
      });
  }
}
