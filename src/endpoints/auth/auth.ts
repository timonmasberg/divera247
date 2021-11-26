import {LoginApiResult} from "../pull/models/login-api-resultmodel";
import {BaseClient} from "../../base-client";

export class Auth extends BaseClient {
  getAccessToken(username: string, password: string): Promise<string> {
    return this.get<LoginApiResult>('v2/auth/login/', {
      username,
      password,
      jwt: false
    }).then(data => data.user.access_token);
  }
}
