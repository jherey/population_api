import { Request, Response } from 'express';

const validationErrorHandler = (req: Request, res: Response, next: any): Response => {
  const errors = req.validationErrors();
  const validationErrors: string[] = [];
  if (errors) {
    errors.map((error: { msg: string; }) => validationErrors.push(error.msg));
    return res.status(400).json({ errors: validationErrors });
  }
  return next();
};

export const createLocation = (req: Request, res: Response, next: any): Response => {
  req.checkBody('location', 'Location is required').trim().notEmpty();
  req.checkBody('male', 'Male is required').trim().notEmpty();
  req.checkBody('male', 'Male value should be numeric').isNumeric();
  req.checkBody('female', 'Female is required').trim().notEmpty();
  req.checkBody('female', 'Female value should be numeric').isNumeric();
  req.checkBody('subLocations', 'Sub locations should be an array').optional().isArray();

  return validationErrorHandler(req, res, next);
};
