import { Injectable } from "@nestjs/common";
import { Channel, ChatType, Message } from "@prisma/client";
import { PrismaService } from "prisma_module/prisma.service";
import { CreateChannelDto } from "./channels.dto";
import { Socket } from "socket.io";

@Injectable()
export class ChannelsService
{
    constructor(private prisma: PrismaService) {}

    async createChannel(createChannelDto: CreateChannelDto, ownerId: number): Promise<Channel> {
        const { name } = createChannelDto;
        const newChannel = await this.prisma.channel.create({
            data: {
                name,
                owner: {
                    connect: {
                        id: ownerId
                    }
                }
            },
        });
        console.log("service createchannel");
        return newChannel;
    }

    async addUserToChannel(roomId: string, userId: number): Promise<void> {
        await this.prisma.channel.update({
            where: { id: Number(roomId) },
            data: {
                users: {
                    connect: {
                        id: userId
                    }
                }
            }
        });
    }

    async getAllChannels(): Promise<Channel[]> {
        return this.prisma.channel.findMany();
    }

    sendMessageToRoom(roomId: string, message: string, client: Socket): void {
        console.log('je passe ici avec:', message);
        client.to(roomId).emit('newMessage', { roomId, message });
      }

    async getRoomMessages(roomId: string): Promise<Message[]> {
        return await this.prisma.message.findMany({
            where: { channelId: Number(roomId) },
            orderBy: { createdAt: 'asc' },
        });
    }

}