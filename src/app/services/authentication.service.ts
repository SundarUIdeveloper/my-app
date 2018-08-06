import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthenticationService {
  constructor(private httpClient: HttpClient) {

  }

  authenticateUser(data): Observable<{ token: String }> {
    return this.httpClient.post<{ token: String }>('http://localhost:3000/auth/v1/', data, { responseType: 'json' });
  }

  setBearerToken(token) {
    window.localStorage.setItem('bearerToken', token);
  }

  getBearerToken(): String {
    return window.localStorage.getItem('bearerToken');
  }

  isUserAuthenticated(token): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.httpClient.post<{ isAuthenticated: boolean }>('http://localhost:3000/auth/v1/isAuthenticated', {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).subscribe(data => {
        resolve(data.isAuthenticated);
      },
        err => {
          reject(err);
        });
    });
  }
}
