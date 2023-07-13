import { Injectable } from "@nestjs/common";
import { Channel, ChatType, ChanMessage } from "@prisma/client";
import { PrismaService } from "prisma_module/prisma.service";
import { ChannelMessageDto, CreateChannelDto } from "./channels.dto";
import * as argon from 'argon2';

@Injectable()
export class ChannelsService
{
    constructor(private prisma: PrismaService) {}

    async createChannel(createChannelDto: CreateChannelDto): Promise<Channel> {
        const { name, userId, ispassword, password } = createChannelDto;
        const hash = await argon.hash(password);
        const newChannel = await this.prisma.channel.create({
            data: {
                name,
                ispassword,
                password: hash,
                owner: {
                    connect: {
                        id: userId,
                    }
                }
            },
        });
        console.log("service createchannel");
        return newChannel;
    }
    
    async checkPassword(hashedPassword: string, password: string): Promise<boolean> {
        try {
            const correctPassword = await argon.verify(hashedPassword, password);
            return correctPassword;
        } catch (err) {
            console.error(err);
            return false;
        }
      }
      

    async addUserToChannel(channelId: string, userId: number, password: string){
        try {
            const channel = await this.prisma.channel.findUnique({
                where: { id: Number(channelId) },
                include: { users: true },
            });


            if (channel && channel.ispassword) {
                const correctPassword = await this.checkPassword(channel.password, password);
                if (correctPassword === false) {
                    throw new Error("Invalid password");
                  }
            }
            if (channel && channel.users.some(user => user.id === userId)) {
                return;
            }

            await this.prisma.channel.update({
                where: { id: Number(channelId) },
                data: {
                    users: {
                        connect: {
                            id: userId
                        }
                    },
                }
            });
        } catch(error) {
            console.log("Error while updating channel: ", error);
            throw error;
        }
    }

    async getAllChannels(): Promise<Channel[]> {
        return this.prisma.channel.findMany();
    }

    async create(data: ChannelMessageDto): Promise<ChanMessage> {
        console.log('Creating channel message with data:', data);
        try
        {
            const createdMessage = await this.prisma.chanMessage.create(
            {
                data:
                {
                    senderId: data.senderId,
                    channelId: data.channelId,
                    content: data.message,
                },
                include: { sender: true },
            });
            console.log(createdMessage.sender.name);
            console.log('Channel message created:', createdMessage);
            return (createdMessage);
        }
        catch (error)
        {
            console.error('Error while creating channel message:', error);
            throw error;
        }
    }

    async getRoomMessages(channelId: string): Promise<ChanMessage[]> {
        try {    
            const messages = await this.prisma.chanMessage.findMany({
                where: { channelId: Number(channelId) },
                orderBy: { createdAt: 'asc' },
                include: { sender: true },
            });
            return messages;
        }
        catch (error)
        {
            console.error('Error while creating channel message:', error);
            throw error;
        }
    }
}
