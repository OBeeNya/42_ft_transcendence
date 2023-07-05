import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma_module/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { MatchHistoryModule } from './match-history/match-history.module';
import { ChatModule } from './chat/channels/channels.module';
import { PongModule } from './pong/pong.module';
import { SocketModule } from 'pong/socket/pong.socket.module';
import { FriendsModule } from 'chat/friends/friends.module';
import { DirectMessageModule } from 'chat/directMessage/directMessage.module';
import { BlockageModule } from 'chat/blockage/blockage.module';
import { InviteToPongModule } from 'chat/inviteToPong/inviteToPong.module';

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
	BlockageModule,
	DirectMessageModule,
	FriendsModule,
	InviteToPongModule,
  ],
})

export class AppModule {}