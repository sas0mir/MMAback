import { NextFunction } from "express";
import { Request, Response, Express } from "express";
import { HttpException } from "./helpers/constants";

interface SessionRequest extends Request {
  session: any
}

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
    res.status(err instanceof HttpException ? err.code : statusCode);
    res.json({
      message: errMsg,
      stack: process.env.NODE_ENV === 'production' ? '🥞' : err instanceof Error ? err.stack : errMsg
    });
  }

  function requireAuth(req: SessionRequest, res: Response, next: NextFunction) {
    if (req.session.userId) {
        next(); // User is authenticated, continue to next middleware
    } else {
        res.redirect('/login'); // User is not authenticated, redirect to login page
    }
  }
  
  module.exports = {
    notFound,
    errorHandler,
    requireAuth
  };