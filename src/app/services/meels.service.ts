import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MeelsService {
  private baseUrl = 'https://www.themealdb.com/api/json/v1/1';

  constructor(private http: HttpClient) { }

  getmeels(option: string): Observable<any> {
    if (option === 'All') {
      return this.http.get(`${this.baseUrl}/search.php?s=`);
    }
    return this.http.get(`${this.baseUrl}/filter.php?c=${option}`);
  }
}