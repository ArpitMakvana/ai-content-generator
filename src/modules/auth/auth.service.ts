import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map, catchError, of } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(private http: HttpService) {}

  validateUser(token: string) {
    return this.http.get('https://aismartlms.isplpos.com/api/validate-token', {
      headers: { Authorization: `Bearer ${token}` },
    }).pipe(
      map(res => {
        if (res.data?.status) {
          return {
            valid: true,
            userId: res.data?.user?.id || '',
          };
        } else {
          return {
            valid: false,
            userId: '',
          };
        }
      }),
      catchError(() => {
        return of({
          valid: false,
          userId: '',
        });
      }),
    );
  }
}
