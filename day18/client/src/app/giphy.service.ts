import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface SearchResult {
  searchTerm: string;
  images: string[];
  timestamp: number;
  fromCache?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class GiphyService {

  readonly URL = "/search";

  constructor(private http: HttpClient) { }

  search(searchTerm: string, resultCount: number):
    Promise<SearchResult> {
    const params = new HttpParams()
      .set('searchTerm', searchTerm)
      .set('resultCount', resultCount + '');

    return (
      this.http.get<SearchResult>(this.URL, { params: params })
        .toPromise()
    );
  }

  searchWithObservable(searchTerm: string, resultCount: number):
    Observable<SearchResult> {

    const params = new HttpParams()
      .set('searchTerm', searchTerm)
      .set('resultCount', resultCount + '');

    return (
      this.http.get<SearchResult>(this.URL, { params: params })
    );
  }
}
