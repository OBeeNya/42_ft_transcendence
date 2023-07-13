import { useContext, useEffect, useRef } from "react";
import { ChanMessageContext } from "../../../contexts";
import "./ChannelBox.css";


export interface ChanMessage {
    senderId: number;
    channelId: number;
    content: string;
    sender: {
      name:string;
    }
}

const ChannelBox = ({senderId, channelId}: {senderId: number , channelId: number}) =>
{
   const allMessages = useContext(ChanMessageContext);
   const messagesEndRef = useRef<null | HTMLDivElement>(null);
  
    const messages = allMessages.filter(msg => msg.channelId === channelId);

    console.log("check sender", senderId, "message", messages);

    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
  
    useEffect(() => {
      scrollToBottom();
    }, [messages]);
  
    return (
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
    );
  };
export default ChannelBox;
