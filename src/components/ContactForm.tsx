
import { useState } from "react"
import {createContact} from "../services/api"

export default function CreateContectForm(){
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const handelContactCreation = async() =>{
        await createContact({contact: {nickname: name, phone: phone}})
    }
 return(
    <>
        <input type="text" name="name" value={name} placeholder="Enter a name" onChange={(e) => setName(e.target.value)}/>
        <input type="text" name="phone" value={phone} placeholder="Enter a phone number" onChange={(e) => setPhone(e.target.value)} />
        <button onClick={handelContactCreation}> submit </button>
    </>
 )
}