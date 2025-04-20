import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { Funcionario } from './model/funcionario';

@Injectable({
  providedIn: 'root',
})
export class FuncionarioService {
  private readonly URL = `http://localhost:8080`;

  constructor(private http: HttpClient) {}

  public listAll(): Observable<Funcionario[]> {
    return this.http
      .get<Funcionario[]>(`${this.URL}/funcionario`)
      .pipe(take(1));
  }

  public getFuncionarioById(id: string): Observable<Funcionario> {
    return this.http
      .get<Funcionario>(`${this.URL}/funcionario/${id}`)
      .pipe(take(1));
  }
}
