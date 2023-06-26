import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { PrismaService } from '../../prisma_module/prisma.service';
import { PrismaModule } from '../../prisma_module/prisma.module';

@Module(
{
  imports: [PrismaModule],
  providers: [ChatService, PrismaService],
  controllers: [ChatController],
})

export class ChatModule {}
