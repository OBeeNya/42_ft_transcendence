import React, { useEffect, useState } from 'react';
import { useContext } from "react";
import { SocketContext } from "../../../socketContext";
import './Block.css';

type Props =
{
	blockerId: number;
	blockedId: number;
	message: string;
	onClose: () => void;
};

const Block: React.FC<Props> = ({blockerId, blockedId, message, onClose}) =>
{
	const socket = useContext(SocketContext);

	const blockUser = () =>
	{
		if (socket)
			socket.emit('blockUser', {blockerId, blockedId});
	};

	const unblockUser = () =>
	{
		if (socket)
			socket.emit('unblockUser', {blockerId, blockedId});
	};

	useEffect(() =>
	{
		if (socket == null)
			return () => {};

		socket.on('userBlocked', (data: {blockerId: number, blockedId: number}) =>
		{
			// Gérer l'événement 'userBlocked' ici...
			console.log(`User ${data.blockedId} has been blocked by ${data.blockerId}`);
		});
	
		socket.on('userUnblocked', (data: {blockerId: number, blockedId: number}) =>
		{
			// Gérer l'événement 'userUnblocked' ici...
			console.log(`User ${data.blockedId} has been unblocked by ${data.blockerId}`);
		});
	
		return () =>
		{
		  socket.off('userBlocked');
		  socket.off('userUnblocked');
		};
	  }, []);

	return (
	<div className="block">
		<div className="block-content">
			<div className="block-icon">
				<i className="fas fa-times-circle"></i>
			</div>
			<div className="block-message">
				{message}
			</div>
		</div>
			<button className="block-close" onClick={onClose}>
				<i className="fas fa-times"></i>
			</button>
	</div>
	);
}

export default Block;
