import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const ALGORITHM: 'HS256' = 'HS256';
const ISSUER = 'https://form-builder.com';
const AUDIENCE = ['USER'];

const getToken = (req: Request): string | null => {
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    return req.headers.authorization.split(' ')[1];
  }
  return null;
};

const getClaims = (userId: string, email: string, name: string) => {
  return {
    reserved: {
      algorithm: ALGORITHM,
      issuer: ISSUER,
      audience: 'USER',
      expiresIn: '1d',
      subject: `${userId}`,
    },
    application: {
      email,
      name,
    },
  };
};

const validateClaims = () => ({
  algorithm: ALGORITHM,
  issuer: ISSUER,
  audience: AUDIENCE,
});

export const createToken = (userId: string, email: string, name: string): string => {
  const claims = getClaims(userId, email, name);
  return jwt.sign(claims.application, process.env.JWT_SECRET as string, claims.reserved);
};

interface JwtPayload {
  aud: string;
  sub: string;
  iss: string;
  iat: number;
  exp: number;
  prm?: string;
  email: string;
  name: string;
  mobile: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        role: string;
        name: string;
        mobile: string;
      };
    }
  }
}

// eslint-disable-next-line consistent-return
export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const token = getToken(req);

  if (token) {
    try {
      const decoded = (await jwt.verify(token, process.env.JWT_SECRET as string, validateClaims())) as JwtPayload;

      req.user = {
        id: decoded.sub,
        email: decoded.email,
        role: decoded.aud,
        name: decoded.name,
        mobile: decoded.mobile,
      };

      next();
    } catch (e: any) {
      if (e.name === 'TokenExpiredError') {
        return res.status(400).json({ success: false, status: 'Expired Token' });
      }
      return res.status(400).json({ success: false, status: 'Invalid Token' });
    }
  } else {
    return res.status(400).json({ success: false, status: 'No Token Provided' });
  }
};
