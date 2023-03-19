import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';

import { User } from 'src/entity';

import { AUTH_OPTIONS } from './auth.constants';
import { AuthOptions } from './types';

@Injectable()
export class AuthService {
  public constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @Inject(AUTH_OPTIONS) private readonly authOption: AuthOptions,
  ) {}

  public async generateUserAccessTokenByEmailAndPassword(
    email: string,
    password: string,
  ) {
    const possibleUser = await this.userRepository.findOne({
      where: {
        email,
        passwordHash: this.generatePasswordHash(password),
      },
    });

    if (possibleUser === null) {
      return null;
    }

    return this.generateAccessToken({
      email: possibleUser.email,
    });
  }

  private generateAccessToken(payload: object) {
    return jwt.sign(payload, this.authOption.jwtSecret, {
      expiresIn: this.authOption.jwtTokenExpiresIn,
    });
  }

  private generatePasswordHash(password: string) {
    return crypto.createHash('sha256').update(password).digest('base64');
  }
}
