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
			if (data.userId === data.friendId) 
				throw new Error("User cannot add themselves as a friend");

			const blockExists = await this.prisma.userBlock.findFirst(
			{
				where:
				{
					OR:
					[
						{userId: data.userId, blockedId: data.friendId},
						{userId: data.friendId, blockedId: data.userId}
					]
				}
			});

			if (blockExists)
				throw new Error(`Friend cannot be added. ` + 
								`One user has blocked the other.`);

			const friendshipExists = await this.prisma.userFriend.findFirst(
			{
				where:
				{
					userId: data.userId,
					friendId: data.friendId
				}
			});
							
			if (friendshipExists)
				throw new Error('This user is already a friend.');

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

			console.log(`User with ID ${data.userId} ` +
						`added ${data.friendId} as friend!`);

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