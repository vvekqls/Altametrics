import { Request, Response, NextFunction } from "express";

interface PaginationOptions {
  defaultLimit?: number;
  maxLimit?: number;
}

export const paginate = (options: PaginationOptions = {}) => {
  const { defaultLimit = 10, maxLimit = 50 } = options;

  return (req: Request, res: Response, next: NextFunction) => {

    const page = parseInt(req.query.page as string) || 1;
    let limit = parseInt(req.query.limit as string) || defaultLimit;

    if (limit > maxLimit) {
      limit = maxLimit;
    }

    const skip = (page - 1) * limit;

    req.query.page = page.toString();
    req.query.limit = limit.toString();
    req.query.skip = skip.toString();

    next();
  };
};