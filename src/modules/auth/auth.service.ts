import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
// import { map } from 'rxjs'; // keep this for later use
import { of } from 'rxjs'; // use this to mock response

@Injectable()
export class AuthService {
  constructor(private http: HttpService) {}

  validateUser(token: string) {
    // 🧪 Mocked response for now (replace with real API when ready)
    return of({ valid: true, userId: 'mock-user-id' });

    // ✅ Uncomment below for real API call later
    // return this.http.get('https://your-auth-api.com/validate', {
    //   headers: { Authorization: `Bearer ${token}` },
    // }).pipe(map(res => res.data)); 
  }
}
