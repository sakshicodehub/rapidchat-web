import { useEffect, useState } from "react";
import { getMessages, sendMessage} from "../services/api";
import { showChat } from "../services/api"  


type Message = {
  id: number;
  content: string;
};

type ChatPageProps = {
  chat_id: string;
};

export default function ChatPage({ chat_id }: ChatPageProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState<string>("");
  
  const handleShowChat = async (chat_id: string) => {
      const res = await showChat(chat_id)
      setMessages(res.data.messages)
        console.log("data: ",res.data)
    }

  useEffect(() => {
    handleShowChat(chat_id);
  }, [chat_id]);

  const fetchMessages = async () => {
    try {
      const res = await getMessages(chat_id);
      setMessages(res.data.messages);
      console.log("message: ", res.data)
    } catch (err) {
      console.error("Failed to fetch messages:", err);
    }
  };

  const handleSend = async () => {
    if (!text.trim()) return;

    try {
      await sendMessage({ content: text, chat_id: chat_id, sent_at: new Date });
      setText("");
      fetchMessages();
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Chat</h2>

      <div style={{ height: 300, overflowY: "auto", border: "1px solid #ccc" }}>
        {messages.map((msg) => (
          <div key={msg.id}>{msg.content}</div>
        ))}
      </div>

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type message..."
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}