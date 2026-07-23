import { createChat, getcontactlist } from "../services/api";
import { useEffect, useState } from "react";
import CreateContectForm from "./ContactForm";
import ChatPage from "../pages/ChatPage";

type Person = {
    id: number;
    nickname: string;
    phone: string;
    is_direct_chat: boolean;
    chat_id: string;
};

export default function ContactList() {
    const [list, setList] = useState<Person[]>([]);
    const [isChat, setIsChat] = useState(false)

    const [isCreateContact, setIsCreateContact] = useState(false)
    
    const fetchlist = async () => {
          const res = await getcontactlist();
          console.log("contact list", res.data)
          setList(res.data)
    }

    const handleCreateChat = async (phone: string) => {
        await createChat({chat: {phone: phone,chat_type: "direct_chat"}});
    };

      useEffect(() => {
        fetchlist();
      }, []);

    return (
        <div>
            <h3>Contact List</h3>

            {
                list.length === 0 ? (
                    <>
                        <span>No contacts</span>
                    </>
                ) : (
                    list.map((person) => (
                        <div key={person.id}>
                            <li>
                                <span>{person.nickname}</span>
                                {
                                    person.is_direct_chat ?
                                    (
                                        <>
                                            <button 
                                                onClick={() => setIsChat(true)}
                                            >
                                                Chat
                                            </button>
                                        {isChat && <ChatPage chat_id= {person.chat_id}/>}
                                        </>
                                    ):(
                                        <>
                                            <button 
                                                onClick={() => handleCreateChat(person.phone)}
                                            >
                                                Create Chat
                                            </button>
                                        </>
                                    )
                                }
                            </li>
                        </div>
                    ))
                )
            }
            <button onClick={ () => setIsCreateContact(true)}>Create Contact</button>
            { isCreateContact && <CreateContectForm/> }
        </div>
    );
}