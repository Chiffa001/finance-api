import { hash } from 'bcryptjs';

export class UserEntity {
  private _password: string;
  constructor (private readonly _email: string, private readonly _name: string) {}

  async setPassword (password: string, salt: number) {
    this._password = await hash(password, salt);
  }

  get email () {
    return this._email;
  }

  get name () {
    return this._name;
  }

  get password () {
    return this._password;
  }
}
