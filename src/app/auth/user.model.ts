export class User {
  constructor(public email: string,
    public id: string,
    private _token: string,
    private _expiresDate: Date) {}

    get token() {
      if(!this._expiresDate || new Date() > this._expiresDate) {
        return null;
      }

      return this._token;
    }
}
