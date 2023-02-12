import { Router, Request, Response } from 'express';

export enum RouteBasePath {
  ACCOUNT = '/account',
}

export type ControllerHandler = (req: Request, res: Response) => void;

export interface Route {
  path: string
  method: keyof Pick<Router, 'get' | 'post' | 'put' | 'delete'>
  cb: ControllerHandler
}
