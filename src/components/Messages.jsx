import React , {useContext , useEffect , useState} from 'react';
import { ChatContext } from '../context/ChatContext';
import Message from './Message'
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

export default function Messages() {
  const {data} = useContext(ChatContext);
  const [messages , setMessages] = useState([]);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);

  console.log("EL menssaje es " , messages)
  return (
    <div className='bg-gray-200 h-[400px] overflow-scroll'>
     

     {messages.legth > 0 
     ? ( 
      messages.map((m) =>(
        <Message message={m}  key={m.id}/>
      ))
     )
     :(<p>Cargando..</p>)
     }
    </div>
  )
}
