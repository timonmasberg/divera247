import {DiveraEndpoint} from "../../divera-endpoint";
import {LoginApiResult} from "../pull/models/login-api-resultmodel";

export class Auth extends DiveraEndpoint {
  constructor() {
    super('v2/auth/');
  }

  getAccessToken(username: string, password: string): Promise<string> {
    return this.get<LoginApiResult>('login/', {
      username,
      password,
      jwt: false
    }).then(data => data.user.access_token);
  }
}
