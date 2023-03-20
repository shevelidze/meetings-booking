import { Global, Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthGuard } from './auth.guard';
import { AUTH_OPTIONS } from './auth.constants';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: AUTH_OPTIONS,
      useValue: {
        jwtSecret: "Don't hack me, please",
        jwtTokenExpiresIn: '30d',
      },
    },
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
