import { ConnectedSocket, MessageBody, SubscribeMessage,
		 WebSocketGateway } from "@nestjs/websockets";
import { PrismaService } from "prisma_module/prisma.service";
import { Socket } from "socket.io";
import { BaseGateway } from "chat/base.gateway";
import { FriendsService } from "./friends.service";
import { FriendsDto } from "./friends.dto";

@WebSocketGateway({cors: {origin: "*"}})
export class FriendsGateway extends BaseGateway
{
	constructor(private friendsService: FriendsService,
				private prisma: PrismaService)
	{
		super();
	}

	@SubscribeMessage('addFriend')
	async handleAddFriend(@MessageBody() data: FriendsDto,
						  @ConnectedSocket() client: Socket)
	{
		try
		{
			console.log(`Received addFriend request. User ID: ${data.userId}, Friend ID: ${data.friendId}`);
			const newFriend = await this.friendsService.addFriend(data);
			console.log('Successfully added friend! Emitting friendAdded...');

			client.emit('friendAdded', newFriend);
			console.log('newFriend:', newFriend);
		}
		catch (error)
		{
			console.error('Error while adding friend:', error);
			client.emit('error', {message: 'There was an error adding your friend.',
								  error: error.message});
		}
	}

	@SubscribeMessage('getFriends')
	async handleGetFriends(@MessageBody() data: FriendsDto,
						   @ConnectedSocket() client: Socket)
	{
		try
		{
			console.log(`Received getFriends request for user with ID ${data.userId}`);
			const friends = await this.friendsService.getFriends(data);
			console.log('Successfully retrieved friends! Emitting friends...');

			client.emit('friends', friends);
		}
		catch (error)
		{
			console.error('Error while getting friends:', error);
			client.emit('error', {message: 'There was an error getting your friends.',
								  error: error.message});
		}
	}
}