import { Request } from 'express';

export interface Logger {
  info: (message: string) => void
  warn: (message: string) => void
  error: (message: string) => void
  requestInfo: (request: Request, requestData: unknown) => void
  responseInfo: (request: Request, responseData: unknown) => void
}
