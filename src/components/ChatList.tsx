import { useEffect, useState } from "react";
import ContactList from "./ContactList";
import { getchatlist } from "../services/api";
import ChatPage from "../pages/ChatPage";

type Message = {
  id: number;
}

type Chat = {
  id: string;
  name: string;
  chat_type: string;
  messages: Message[]
};

export default function ChatList() {
  const [newChat,setNewChat] = useState(false)
  const [chats, setChats] = useState<Chat[]>([]);
  const [startChat, setStartChat] = useState(false)
  const fetchChats = async () => {
    try {
      const res = await getchatlist();
      setChats(res.data);
      console.log("chat list", res.data);
    } catch (err) {
      console.error("Failed to fetch chat list:", err);
    }
  };
  
    useEffect(() => {
      fetchChats();
    }, []);
  return (
    <>
      {chats.map((chat) => (
        <div key={chat.id}>
          {
            chat.messages.length != 0 && (chat.chat_type == "direct_chat" ?
            (
              <>
              <button onClick={() => {setStartChat(true)}}>{chat.name}</button>
              {startChat && <ChatPage chat_id= {chat.id}/>}
              </>
            ):
            (
              <>
              <div>{chat.id}</div>
              </>
            ))
          }
        </div>
      ))}
      {
        <>
          <div onClick={() => {setNewChat(true)}}>New chat</div>
          {newChat && <ContactList/>}
        </>
      }
    </>
  );
}