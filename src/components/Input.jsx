import React , {useContext , useState} from 'react';
import Aadd from "../img/aadd.jpg";
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { Timestamp, arrayUnion , doc , serverTimestamp, updateDoc } from 'firebase/firestore';
import { db, storage } from '../firebase';
import { v4 as uuid} from "uuid";
import { ref, uploadBytesResumable , getDownloadURL } from 'firebase/storage';



export default function Input() {
  const [text , setText] = useState("");
  const[img , setImg] = useState(null);
  const {currentUser} = useContext(AuthContext);
  const {data} = useContext(ChatContext);


  const handleSend = async () => {
    if (!data.chatId) {
      console.log("El valor de data chatId es", data.chatId);
      return;
    }
  
    // Actualización de mensajes sin tener en cuenta la imagen
    await updateDoc(doc(db, "chats", data.chatId), {
      messages: arrayUnion({
        id: uuid(),
        text,
        senderId: currentUser.uid,
        date: Timestamp.now(),
      }),
    });
  
    // Actualización de datos de usuario sin tener en cuenta la imagen
    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });
  
    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });
  
    setText("");
  };
  
  








  return (
    <div className=' flex justify-between px-4 bg-white h-[50px] '>
    <input type="text" 
     className='border-none focus:outline-none'
      placeholder='Type Something...' 
      onChange={e=>setText(e.target.value)}
      />
      <div className='flex justify-between'>
        <img src={Aadd} className='w-[30px]' alt=""/>
        <input 
        type="file" 
        style={{display:"none"}}
         id="file"
         
          onChange={e => setImg(e.target.files[0])}
         />
       <label htmlForm= "file" >
           <img  alt=""  />
        
        </label>
        <button className='mt-3 bg-blue-400 text-white  px-1 h-[30px]  '
          onClick={handleSend}
        >Send</button>
        
      </div>
    </div>
  )
}
