import * as express from 'express';
import * as next from 'next';

export type CTXServerSideType = Pick<next.NextPageContext, 'req'> | { req: next.NextApiRequest; } | { req: express.Request; } | null | undefined;