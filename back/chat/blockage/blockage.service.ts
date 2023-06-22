import { Injectable } from "@nestjs/common";
import { PrismaService } from "prisma_module/prisma.service";
import { User } from "@prisma/client";
import { BlockageDto } from "chat/blockage/blockage.dto";

@Injectable()
export class BlockageService
{
	constructor(private prisma: PrismaService) {}

	async blockUser(data: BlockageDto): Promise<User>
	{
		return this.prisma.user.update(
		{
			where: {id: data.blockerId},
			data: {blocked: {connect: {id: data.blockedId}}},
		});
	}

	async isUserBlocked(data: BlockageDto): Promise<boolean>
	{
		console.log(`Checking if user ${data.blockerId} has blocked user ${data.blockedId}`);

		const user = await this.prisma.user.findUnique(
		{
			where: {id: data.blockerId},
			include: {blocked: true}
		});

		if (user === null)
			throw new Error(`User with ID ${data.blockerId} not found`);

		const block = user.blocked.some(blockedUser => blockedUser.id === data.blockedId);

		if (block)
			console.log(`User ${data.blockerId} has blocked user ${data.blockedId}`);
		else 
			console.log(`User ${data.blockerId} has not blocked user ${data.blockedId}`);

		return (block);
	}
}
