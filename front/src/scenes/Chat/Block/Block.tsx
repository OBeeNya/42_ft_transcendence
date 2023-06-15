import React from 'react';
import './Block.css';

interface BlockProps
{
	message: string;
	onClose: () => void;
}

const Block: React.FC<BlockProps> = ({message, onClose}) =>
(
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

export default Block;