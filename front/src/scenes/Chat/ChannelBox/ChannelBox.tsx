import { useContext, useEffect, useRef } from "react";
import { ChanMessageContext } from "../../../contexts";
import "./ChannelBox.css";


export interface ChanMessage {
    senderId: number;
    channelId: number;
    content: string;
}

const ChannelBox = ({senderId, channelId}: {senderId: number , channelId: number}) =>
{
   const allMessages = useContext(ChanMessageContext);
   const messagesEndRef = useRef<null | HTMLDivElement>(null);
   console.log('le message passe dans channelBox', allMessages);
  
    const messages = allMessages.filter(
      (msg) =>
        (msg.senderId === senderId && msg.channelId === channelId)
    );
   console.log('peut etre ici', allMessages);

  
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
              {message.content}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
    );
  };
export default ChannelBox;
