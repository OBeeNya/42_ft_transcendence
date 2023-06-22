import { Injectable } from "@nestjs/common";
import { UserBlock } from "@prisma/client";
import { BlockageDto } from "chat/blockage/blockage.dto";
import { PrismaService } from "prisma_module/prisma.service";

@Injectable()
export class BlockageService
{
	constructor(private prisma: PrismaService) {}

	async blockUser(data: BlockageDto): Promise<UserBlock>
	{
		return this.prisma.userBlock.create(
		{
			data:
			{
				blockerId: data.blockerId,
				blockedId: data.blockedId
			}
		});
	}

	async isUserBlocked(blockerId: number, blockedId: number)
	{
		console.log(`Checking if user ${blockerId} has blocked user ${blockedId}`);

		const block = await this.prisma.userBlock.findUnique(
		{
			where:
			{
				userId_blockedId:
				{
					userId: blockerId,
					blockedId: blockedId
				}
			}
		});

		if (block !== null)
			console.log(`User ${blockerId} has blocked user ${blockedId}`);
		else 
			console.log(`User ${blockerId} has not blocked user ${blockedId}`);

		return (block !== null);
	}
}
