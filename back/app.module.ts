import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma_module/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { MatchHistoryModule } from './match-history/match-history.module';
import { ChatModule } from './chat/chat.module';
import { PongModule } from './pong/pong.module';
import { SocketModule } from 'pong/socket/pong.socket.module';
import { SocketModule2 } from 'pong/socket/pong.socket.module2';
import { SocketModule3 } from 'pong/socket/pong.socket.module3';

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
    SocketModule2,
    SocketModule3,
  ],
})
export class AppModule {}
