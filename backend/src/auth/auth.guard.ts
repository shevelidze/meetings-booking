import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';

import { AUTH_OPTIONS } from './auth.constants';
import { AuthOptions } from './types';

@Injectable()
export class AuthGuard implements CanActivate {
  public constructor(
    private readonly reflector: Reflector,
    @Inject(AUTH_OPTIONS)
    private readonly authOptions: AuthOptions,
  ) {}

  public canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest() as Request;
    const isPublic =
      this.reflector.get<boolean | undefined>(
        'isPublic',
        context.getHandler(),
      ) || false;

    if (isPublic) {
      return true;
    }

    if (request.headers.authorization === undefined) {
      return false;
    }

    const requestAuthorizationMatch =
      request.headers.authorization.match(/^Bearer (.*)$/);

    if (requestAuthorizationMatch === null) {
      throw new ForbiddenException(
        'Invalid authorization header. Expected: Bearer <token>.',
      );
    }

    const requestAccessToken = requestAuthorizationMatch[1];

    try {
      (request as any).userEmail = (
        jwt.verify(
          requestAccessToken,
          this.authOptions.jwtSecret,
        ) as jwt.JwtPayload
      ).email;
    } catch (e) {
      if (e instanceof jwt.JsonWebTokenError) {
        return false;
      }

      throw e;
    }

    return true;
  }
}
