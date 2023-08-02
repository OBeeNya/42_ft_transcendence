import { useContext, useEffect, useRef } from "react";
import { ChanMessageContext } from "../../../contexts";
import "./ChannelBox.css";
import { SocketContext } from '../../../contexts';
import { AiOutlineUser } from 'react-icons/ai';


export interface ChanMessage {
    senderId: number;
    channelId: number;
    content: string;
    sender: {
      name:string;
    }
}

const ChannelBox = ({senderId, channelId, toggleUsersPopup, onLeaveChannel}: {senderId: number , channelId: number, toggleUsersPopup: () => void, onLeaveChannel: () => void}) =>
{
  const socket = useContext(SocketContext);
  const allMessages = useContext(ChanMessageContext);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  
  const messages = allMessages.filter(msg => msg.channelId === channelId);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  const handleLeaveChannel = async () => {
    if (socket) {
      socket.emit('leaveRoom', {channelId: channelId, userId: senderId.toString()});
      onLeaveChannel();
    }
  };

    useEffect(() => {
      scrollToBottom();
    }, [messages]);
  
    useEffect(() => {
      
    })

    return (
      <div className="channel-box">
        <div className="button-container">
        <button className="leavechannel" onClick={handleLeaveChannel}>leave channel</button>
        <button className="buttonuser" onClick={() => toggleUsersPopup()}> <AiOutlineUser size={20}/></button>
        </div>
        <div className="chat-box">
          {messages.map((message, i) => (
            <div key={i} className={`message-container`}>
              <div
                className={`message ${
                  message.senderId === senderId ? "sent" : "received"
                }`}
                >
                <span className="sender-name">{message.sender.name}</span>
                <div className="message-content">{message.content}</div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
    );
  };
export default ChannelBox;
