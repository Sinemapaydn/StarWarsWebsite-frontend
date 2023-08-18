import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EntitiesService {

  private baseApiUrl: string = 'https://localhost:7256/api/';

  constructor(private http: HttpClient) { }

  getAllFilms(): Observable<any> {
    const url = `${this.baseApiUrl}Values/GetAllFilms`;
    return this.http.get<any>(url);
  }

  getAllPeople(): Observable<any> {
    const url = `${this.baseApiUrl}Values/GetAllPeople`;
    return this.http.get<any>(url);
  }

  getAllVehicles(): Observable<any>{
    const url = `${this.baseApiUrl}Values/GetAllVehicles`;
    return this.http.get<any>(url);
  }

  getAllPlanets(): Observable<any>{
    const url = `${this.baseApiUrl}Values/GetAllPlanets`;
    return this.http.get<any>(url);
  }

  getAllSpecies(): Observable<any>{
    const url = `${this.baseApiUrl}Values/GetAllSpecies`;
    return this.http.get<any>(url);
  }

  getAllStarships(): Observable<any>{
    const url = `${this.baseApiUrl}Values/GetAllStarships`;
    return this.http.get<any>(url);
  }

  getEntityByURL(url: string): Observable<any> {
    return this.http.get<any>(url);
  }

  getFilm(filmId: number): Observable<any> {
    const url = `${this.baseApiUrl}Values/GetFilm/${filmId}`;
    return this.http.get<any>(url);
  }

  getFilmIdFromUrl(url: string): number {
    const parts = url.split('/');
    const filmId = parseInt(parts[parts.length - 2], 10);
    return filmId;
  }

}
