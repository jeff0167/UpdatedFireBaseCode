import { Injectable } from '@angular/core';
import { Pirate } from '../interfaces/pirate';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:8080/api/pirates';

@Injectable({
  providedIn: 'root'
})
export class PirateMySQLService {

   constructor(public http: HttpClient) { }

  getAll(): Observable<Pirate[]> {
    return this.http.get<Pirate[]>(baseUrl);
  }

  getAllByUserId(id: number){
    return this.http.get<Pirate[]>(baseUrl + "?userid=" + id);
  }

  get(id: number): Observable<Pirate> {
    return this.http.get<Pirate>(`${baseUrl}/${id}`);
  }

  create(data: Pirate): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: number, data: Pirate): Observable<any> {
    console.log(data)
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

}
