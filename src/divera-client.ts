export class DiveraClient {
  constructor(private readonly _accessKey: string) {

  }

  get accessKey(): string {
    return this._accessKey;
  }
}
