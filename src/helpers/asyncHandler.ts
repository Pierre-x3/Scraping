import { Response, Request, NextFunction } from 'express';

type AsyncFunc = (req: Request, res: Response, next: NextFunction) => Promise<any>;

const asyncHandler = (func: AsyncFunc) => (req: Request, res: Response, next: NextFunction) => {
  func(req, res, next).then().catch(next);
}

export { asyncHandler };