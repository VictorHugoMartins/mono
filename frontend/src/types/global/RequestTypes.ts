import * as express from 'express';
import * as next from 'next';

export type APIResponseType<T> = {
  success: boolean;
  number?: number;
  object: T;
  message?: string;
  errors?: APIResponseErrorType;
}

export type APIResponseErrorType = { [key: string]: string[] };

export type GetRequestType = {
  path: string;
  ctx?: Pick<next.NextPageContext, 'req'> | { req: next.NextApiRequest; } | { req: express.Request; } | null | undefined;
  isRecursive?: boolean;
}

export type PostRequestType = {
  path: string;
  data: {};
  ctx?: Pick<next.NextPageContext, 'req'> | { req: next.NextApiRequest; } | { req: express.Request; } | null | undefined;
  isRecursive?: boolean;
}
