import { PrismaClient } from '@prisma/client';
import express from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);
const prisma = new PrismaClient();

io.on('connection', (socket: Socket) => {
  console.log('Nouvelle connexion Socket.IO ouverte.');

  socket.on('disconnect', () => {
    console.log('Connexion Socket.IO fermée.');
  });

  socket.on('join', async (roomId: string) => {
    let room = await prisma.channel.findUnique({ where: { id: parseInt(roomId) } });
    socket.join(roomId);
    console.log(`Le client a rejoint la room: ${roomId}`);
  });

  socket.on('message', async (roomId: string, message: string) => {
    socket.to(roomId).emit("message", {
      message,
      name: "test"
    })
  });

});
