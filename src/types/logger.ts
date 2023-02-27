import { Request } from 'express';

export interface Logger {
  info: (message: string) => void
  warn: (message: string) => void
  error: (message: string) => void
  requestInfo: (request: Request, requestData: unknown, moduleName: string) => void
  responseInfo: (request: Request, responseData: unknown, moduleName: string) => void
  getRequestInfo: (req: Request) => string
}
