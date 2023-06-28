import { Injectable } from "@nestjs/common";
import { Channel, ChatType } from "@prisma/client";
import { PrismaService } from "prisma_module/prisma.service";
import { CreateChannelDto } from "./channels.dto";

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
}