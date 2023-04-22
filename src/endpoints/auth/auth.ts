import { LoginApiData } from './models/login-api-data.model';
import { BaseClient } from '../../base-client';
import { DiveraResponse } from '../divera-response.model';

export class Auth extends BaseClient {
  async auth(
    username: string,
    password: string,
  ): Promise<DiveraResponse<LoginApiData>> {
    return this.post<LoginApiData>('v2/auth/login/', {
      Login: {
        username,
        password,
        jwt: false,
      },
    });
  }
}
