import { Injectable } from '@angular/core';
import { LoginDto } from './model/LoginDto';
import { HttpClient } from '@angular/common/http';
import { Observable, take } from 'rxjs';
import { LoginRetornoDto } from './model/LoginRetornoDto';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private readonly URL = `http://localhost:8080`;

  constructor(private http: HttpClient) {}

  login(loginDto: LoginDto): Observable<LoginRetornoDto> {
    return this.http
      .post<LoginRetornoDto>(`${this.URL}/user/login`, loginDto)
      .pipe(take(1));
  }
}
