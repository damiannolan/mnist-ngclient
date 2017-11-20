import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class PredictionService {
  private apiEndPoint: string = 'http://localhost:5000/upload';

  constructor(private http: Http) { }

  predict(formData: FormData): Observable<number> {
    let headers = new Headers();
    let options = new RequestOptions({ headers: headers });

    return this.http.post(`${this.apiEndPoint}`, formData, options)
        .map(res => res.json());
  }
}
