import { Inject, Injectable, Module, forwardRef } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthService } from 'auth/auth.service';
import { ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [UserController],
  providers: [UserService,
    AuthService,
    ConfigService],
    exports: [UserService],
    imports: [HttpModule]
  })
export class UserModule {}
