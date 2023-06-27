import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma_module/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { MatchHistoryModule } from './match-history/match-history.module';
import { ChatModule } from './chat/channels/channels.module';
import { PongModule } from './pong/pong.module';
import { SocketModule } from 'pong/socket/pong.socket.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    PrismaModule,
    MatchHistoryModule,
    ChatModule,
    PongModule,
    SocketModule,
  ],
})
export class AppModule {}
