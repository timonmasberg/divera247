import {LoginApiResult} from "./models/login-api-result.model";
import {BaseClient} from "../../base-client";

export class Auth extends BaseClient {
  getAccessToken(username: string, password: string): Promise<string> {
    return this.get<LoginApiResult>('v2/auth/login/', {
      username,
      password,
      jwt: false
    }).then(resp => resp.data.user?.access_token);
  }
}
