import { Injectable } from "@nestjs/common";
import { User, UserFriend } from "@prisma/client";
import { PrismaService } from "prisma_module/prisma.service";
import { FriendsDto } from "./friends.dto";

@Injectable()
export class FriendsService
{
	constructor(private prisma: PrismaService) {}

	async addFriend(data: FriendsDto): Promise<User>
	{
		try
		{
			console.log(`Attempting to add friend with ID ${data.friendId} for user with ID ${data.userId}...`);

			if (data.userId === data.friendId) 
				throw new Error("User cannot add themselves as a friend");
			
			const friend = await this.prisma.userFriend.create(
			{
				data:
				{
					userId: data.userId,
					friendId: data.friendId
				},
				include:
				{
					friend: true
				}
			});
	
			console.log(`Friend with ID ${data.friendId} added successfully for user with ID ${data.userId}!`);
			return (friend.friend);

		}
		catch (error)
		{
			console.error('Error while adding friend:', error);
			throw error;
		}
	}

	async getFriends(data: FriendsDto) : Promise<User[]>
	{
		try
		{
			console.log(`Attempting to get friends for user with ID ${data.userId}...`);

			const userFriends = await this.prisma.userFriend.findMany(
			{
				where:
				{
					userId: data.userId
				},
				include:
				{
					friend: true
				}
			});

			console.log(`Friends retrieved successfully for user with ID ${data.userId}!`);
			const friends = userFriends.map(userFriend => userFriend.friend);
			return (friends);
		}
		catch (error)
		{
			console.error('Error while getting friends:', error);
			throw error;
		}
	}
}