import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as env from './env';


@Injectable()
export class MapService {

  constructor(private httpClient: HttpClient) {
  }

  getAll(): Observable<any> {
    return forkJoin(
      {
        locations0: this.httpClient.get(env.ROMANIA_PLACES_GEO_JSON_URL),
      }
    ).pipe(map((data) => {
      // @ts-ignore
      return [...data.locations0.locations];
    }));
  }
}
