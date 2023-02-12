import { injectable } from 'inversify';
import 'reflect-metadata';

@injectable()
export class AccountService {
  getInfo () {
    return 'account info';
  }
}
