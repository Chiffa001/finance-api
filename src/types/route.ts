import { Router, Request, Response } from 'express';

import { Middleware } from './middleware';

export enum RouteBasePath {
  ACCOUNT = '/account',
  USERS = '/users',
  CATEGORY = '/category',
}

export type ControllerHandler = (req: Request, res: Response) => Promise<void> | void;

export interface Route {
  path: string
  method: keyof Pick<Router, 'get' | 'post' | 'put' | 'delete'>
  middleware?: Middleware[]
  cb: ControllerHandler
}
