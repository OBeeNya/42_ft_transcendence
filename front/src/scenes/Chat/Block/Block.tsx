import './Block.css';

type Props =
{
	message: string;
	onClose: () => void;
};

const Block: React.FC<Props> = ({message, onClose}) => 
{
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
