import React from 'react';
import './Block.css';

interface BlockProps
{
	message: string;
	onClose: () => void;
	iconColor: string;
}

const Block: React.FC<BlockProps> = ({message, onClose, iconColor}) =>
(
	<div className="block">
		<div className="block-content">
			<div className="block-icon" style={{color: iconColor}}>
				<i className="fas fa-exclamation-circle"></i>
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

export default Block;
