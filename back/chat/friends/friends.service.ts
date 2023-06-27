import { Injectable } from "@nestjs/common";
import { UserFriend } from "@prisma/client";
import { PrismaService } from "prisma_module/prisma.service";
import { FriendsDto } from "./friends.dto";

@Injectable()
export class FriendsService
{
	constructor(private prisma: PrismaService) {}

	async addFriend(data: FriendsDto): Promise<UserFriend>
	{
		try
		{
			const friend = await this.prisma.userFriend.create(
			{
				data:
				{
					userId: data.userId,
					friendId: data.friendId
				}
			});

			return (friend);
		}
		catch (error)
		{
			console.error('Error while adding friend:', error);
			throw error;
		}
	}

	async getFriends(data: FriendsDto) : Promise<UserFriend[]>
	{
		try 
		{
			const friends = await this.prisma.userFriend.findMany(
			{
				where:
				{
					userId: data.userId
				}
			});

			return (friends);
		}
		catch (error)
		{
			console.error('Error while getting friends:', error);
			throw error;
		}
	}
}