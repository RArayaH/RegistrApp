import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class APIAlumnosService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin' : '*'
    })
  };

  constructor(private http: HttpClient) { }

  getAlumnos():Observable<any>{
    return this.http.get(environment.apiUrl + '/alumnos/').pipe(
      retry(3)
    );
  }

  getDocentes():Observable<any>{
    return this.http.get(environment.apiUrl + '/docentes/').pipe(
      retry(3)
    );
  }



}
