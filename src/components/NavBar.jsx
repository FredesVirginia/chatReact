import React from 'react'
import Perfil from "../img/perfil.jpg";
import {signOut } from "firebase/auth";
import {auth } from "../firebase";
import {useNavigate} from "react-router-dom";
import toast from 'react-hot-toast';
import {AuthContext} from "../context/AuthContext";
import {useContext} from "react";

export default function NavBar() {
  const navigate = useNavigate();
  const {currentUser} = useContext(AuthContext);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      // Aquí puedes realizar acciones adicionales después de cerrar sesión si es necesario
      console.log('Usuario cerró sesión exitosamente.');
      toast.promise(
        Promise.resolve('Cerraste Sesion!'), // Resuelve la promesa cuando la notificación se cierra
        {
          loading: 'Cargando...',
          success: (resolved) => {
            navigate('/login'); // Redirige a la página 'home' después de que la notificación se cierre
            return resolved;
          },
        }
      );
    
  

    } catch (error) {
      console.error('Error al cerrar sesión:', error.message);
    }
  };


  return (
    <div className='  flex  h-[70px] items-center bg-indigo-800 justify-between px-3 py-4 ' >
  <span className="text-white font-bold"> Beaches Chat</span>
  <div className=" flex gap-3 justify-center ">
    <img className='w-[25px] rounded-full' src={currentUser.photoURL} alt=""/>
    <span className="text-1xl text-gray-400 font-bold"> {currentUser.displayName}</span>

    <button className='px-2 bg-indigo-500 text-white'
      onClick={handleSignOut}
    >Logout</button>
  </div>
</div>
  )
}
