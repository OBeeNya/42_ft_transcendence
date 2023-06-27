// import { Injectable } from "@nestjs/common";
// import { PrismaService } from "prisma_module/prisma.service";
// import { UserBlock } from "@prisma/client";
// import { BlockageDto } from "chat/blockage/blockage.dto";

// @Injectable()
// export class BlockageService
// {
// 	constructor(private prisma: PrismaService) {}

// 	async blockUser(data: BlockageDto): Promise<UserBlock>
// 	{
// 		return this.prisma.userBlock.create(
// 		{
// 			data:
// 			{
// 				blockerId: data.blockerId,
// 				blockedId: data.blockedId
// 			}
// 		});
// 	}

// 	async isUserBlocked(data: BlockageDto)
// 	{
// 		console.log(`Checking if user ${data.blockerId} has blocked user ${data.blockedId}`);

// 		const block = await this.prisma.userBlock.findUnique(
// 		{
// 			where:
// 			{
// 				blockerId_blockedId:
// 				{
// 					blockerId: data.blockerId,
// 					blockedId: data.blockedId
// 				}
// 			}
// 		});

// 		if (block !== null)
// 			console.log(`User ${data.blockerId} has blocked user ${data.blockedId}`);
// 		else 
// 			console.log(`User ${data.blockerId} has not blocked user ${data.blockedId}`);

// 		return (block !== null);
// 	}
// }
