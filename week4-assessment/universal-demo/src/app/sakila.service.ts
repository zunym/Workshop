import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

export interface Film {
  film_id: number;
  title: string;
  description: string;
  release_year: number;
  rating: string;
  special_features: string;
}

@Injectable()
export class SakilaService {

  constructor(private http: HttpClient) { }

  getFilms(limit=10, offset=0): Promise<Film[]> {
    const params = new HttpParams()
      .set('limit', limit + '')
      .set('offset', offset + '')

    return (
      this.http.get<Film[]>('films', { params })
        .toPromise()
    );
  }


}
