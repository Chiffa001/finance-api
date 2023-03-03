import { OperationType } from '@prisma/client';

export class OperationEntity {
  private _balance: number;
  constructor (private readonly _sum: number, private readonly _accountId: number, private readonly _categoryId: number, private readonly _type: OperationType = OperationType.EXPENSE) {}

  get sum () {
    return this._sum;
  }

  get accountId () {
    return this._accountId;
  }

  get categoryId () {
    return this._categoryId;
  }

  get balance () {
    return this._balance;
  }

  get type () {
    return this._type;
  }

  setBalance (oldBalance: number) {
    if (this._type === OperationType.INCOME) {
      this._balance = oldBalance + this._sum;

      return;
    }

    if (this._type === OperationType.EXPENSE) {
      const newBalance = oldBalance - this._sum;

      if (newBalance < 0) {
        throw new Error('Недостаточно средств');
      }

      this._balance = newBalance;

      return;
    }

    this._balance = oldBalance;
  }
}
