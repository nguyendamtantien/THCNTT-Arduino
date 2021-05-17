import { Injectable } from '@angular/core';
import {Account} from '../shared/account.model';
import { Observable, of } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }
  insertAccount(acc:Account): Observable<Account> {
    return this.http.post<Account>('http://localhost:8000/api/acc/insert/', acc);
}
}
