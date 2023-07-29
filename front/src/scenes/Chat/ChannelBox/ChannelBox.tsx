import { useContext, useEffect, useRef } from "react";
import { ChanMessageContext, ChanUsersContext } from "../../../contexts";
import "./ChannelBox.css";
import { AiOutlineUser } from 'react-icons/ai';


export interface ChanMessage {
    senderId: number;
    channelId: number;
    content: string;
    sender: {
      name:string;
    }
}

const ChannelBox = ({senderId, channelId, toggleUsersPopup}: {senderId: number , channelId: number, toggleUsersPopup: () => void}) =>
{
   const allMessages = useContext(ChanMessageContext);
   const messagesEndRef = useRef<null | HTMLDivElement>(null);
  
    const messages = allMessages.filter(msg => msg.channelId === channelId);

    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
  
    useEffect(() => {
      scrollToBottom();
    }, [messages]);
  
    return (
      <div className="chat-box">
        <button className={"buttonuser"} onClick={toggleUsersPopup}><AiOutlineUser size={20}/></button>
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
    );
  };
export default ChannelBox;
