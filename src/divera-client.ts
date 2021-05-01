import {Alarms} from "./endpoints/alarm/alarms";
import {Pull} from "./endpoints/pull/pull";
import {Auth} from "./endpoints/auth/Auth";

export class DiveraClient {
  constructor(private readonly _accessKey: string) {

  }

  get accessKey(): string {
    return this._accessKey;
  }

  factorAlarmsEndpoint(): Alarms {
    return new Alarms(this.accessKey);
  }

  factorPullAllEndpoint(): Pull {
    return new Pull(this.accessKey);
  }

  static factorAuthEndpoint(): Auth {
    return new Auth();
  }
}
