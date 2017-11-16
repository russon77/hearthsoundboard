import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICard } from './data.model';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CardService {

  constructor(private http: HttpClient) {}

  getCards(): Observable<ICard[]> {
    return this.http.get<ICard[]>('/assets/cards.db.json');
  }
}
