import { WebSocketGateway } from '@nestjs/websockets';
import { PrismaClient } from '@prisma/client';
import { BaseGateway } from 'chat/base.gateway';
import express from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';


@WebSocketGateway({ namespace: '/chat' })
export class ChannelGateway extends BaseGateway
{
    
}