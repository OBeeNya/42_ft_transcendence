import { Module } from '@nestjs/common';
import { ChatService } from './channels.service';
import { ChatController } from './channels.controller';
import { PrismaService } from '../../prisma_module/prisma.service';
import { PrismaModule } from '../../prisma_module/prisma.module';

@Module(
{
  imports: [PrismaModule],
  providers: [ChatService, PrismaService],
  controllers: [ChatController],
})

export class ChatModule {}
