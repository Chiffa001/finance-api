import { Router, Request, Response, NextFunction } from 'express';

import { Middleware } from './middleware';

export enum RouteBasePath {
  ACCOUNT = '/account',
  USERS = '/users',
  CATEGORY = '/category',
  OPERATION = '/operation'
}

export type ControllerHandler = (req: Request, res: Response, next: NextFunction) => Promise<void> | void;

export interface Route {
  path: string
  method: keyof Pick<Router, 'get' | 'post' | 'put' | 'delete'>
  middleware?: Middleware[]
  cb: ControllerHandler
}
