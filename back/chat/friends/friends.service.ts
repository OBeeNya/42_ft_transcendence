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
			console.log(`Attempting to add friend with ID ${data.friendId} for user with ID ${data.userId}...`);

			const friend = await this.prisma.userFriend.create(
			{
				data:
				{
					userId: data.userId,
					friendId: data.friendId
				}
			});

			console.log(`Friend with ID ${data.friendId} added successfully for user with ID ${data.userId}!`);

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
			console.log(`Attempting to get friends for user with ID ${data.userId}...`);

			const friends = await this.prisma.userFriend.findMany(
			{
				where:
				{
					userId: data.userId
				}
			});

			console.log(`Friends retrieved successfully for user with ID ${data.userId}!`);

			return (friends);
		}
		catch (error)
		{
			console.error('Error while getting friends:', error);
			throw error;
		}
	}
}