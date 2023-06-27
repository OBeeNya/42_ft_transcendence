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
			const newFriend = await this.friendsService.addFriend(data);
			client.emit('friendAdded', newFriend);
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
			const friends = await this.friendsService.getFriends(data);
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