import React  , {useContext}from 'react';
import {ChatContext} from "../context/ChatContext";
import Add from "../img/add.jpg";
import Camara from "../img/camara.jpg";
import More from "../img/more.png";
import Messages from './Messages';
import Input from './Input';


export default function Chat() {
  const { data} = useContext(ChatContext);

  console.log(" Estamosn e le componente Chat se imprime data de ChatContext" , data);

  return (
    <div className='flex-1 w-[800px]'>
      <div className='h-[50px] bg-indigo-400 flex justify-between flex-row items-center p-4'>
        <span className='text-white'> {data.user?.displayName} </span>
        <div className='flex  flex-row gap-3'>
          <img className='w-[20px] rounded-full' src={Camara} alt =""/> 
          <img className='w-[20px] rounded-full' src={Add} alt="" /> 
          <img className='w-[20px] rounded-full' src={More} alt="" /> 
         
        </div>
       
      </div>
      <Messages/>
      <Input/>
    </div>
  )
}
