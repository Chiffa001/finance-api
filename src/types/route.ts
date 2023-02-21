import { Router, Request, Response } from 'express';

import { Middleware } from './middlware';

export enum RouteBasePath {
  ACCOUNT = '/account',
}

export type ControllerHandler = (req: Request, res: Response) => void;

export interface Route {
  path: string
  method: keyof Pick<Router, 'get' | 'post' | 'put' | 'delete'>
  middleware?: Middleware[]
  cb: ControllerHandler
}
