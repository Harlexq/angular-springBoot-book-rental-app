import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class HttpClientService {
  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  get<T>(api: string, callBack: (res: T) => void) {
    this.http.get<T>(this.apiUrl + api).subscribe({
      next: (res) => {
        callBack(res);
      },
    });
  }

  getById<T>(api: string, id: number, callBack: (res: T) => void) {
    this.http.get<T>(this.apiUrl + api + '/' + id).subscribe({
      next: (res) => {
        callBack(res);
      },
    });
  }

  post<T>(api: string, model: T, callBack: (res: T) => void) {
    this.http.post<T>(this.apiUrl + api, model).subscribe({
      next: (res) => {
        callBack(res);
      },
    });
  }

  put<T>(api: string, id: number, model: T, callBack: (res: T) => void) {
    this.http.put<T>(this.apiUrl + api + '/' + id, model).subscribe({
      next: (res) => {
        callBack(res);
      },
    });
  }

  putFind<T>(api: string, model: T, callBack: (res: T) => void) {
    this.http.put<T>(this.apiUrl + api, model).subscribe({
      next: (res) => {
        callBack(res);
      },
    });
  }

  delete<T>(api: string, id: number, callBack: (res: T) => void) {
    this.http.delete<T>(this.apiUrl + api + '/' + id).subscribe({
      next: (res) => {
        callBack(res);
      },
    });
  }
}
