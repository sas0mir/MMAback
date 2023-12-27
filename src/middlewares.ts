import { NextFunction } from "express";
import { Request, Response, Express } from "express";

function notFound(req: Request, res: Response, next: NextFunction) {
    res.status(404);
    const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
    next(error);
  }
  
  /* eslint-disable no-unused-vars */
  function errorHandler(err: unknown, req: Request, res: Response, next: NextFunction) {
    /* eslint-enable no-unused-vars */
    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
    const errMsg = err instanceof HttpException ? err.message : err instanceof Error && err.message ? err.message : 'todo some error';
    res.status(statusCode);
    res.json({
      message: err.message || '',
      stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack
    });
  }
  
  module.exports = {
    notFound,
    errorHandler
  };