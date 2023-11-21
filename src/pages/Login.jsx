import React , {useState} from 'react';
import {useNavigate , Link} from "react-router-dom";
import {signInWithEmailAndPassword}  from "firebase/auth";
import {auth} from "../firebase";
import toast from 'react-hot-toast';

export default function Login() {
const [error , setError] = useState(false);
const navigate = useNavigate();
const handleSubmit = async (e) =>{
  e.preventDefault();
  const email = e.target[0].value;
  const password = e.target[1].value;

   try{
      await signInWithEmailAndPassword(auth , email, password);
      toast.promise(
        Promise.resolve('Inicio de Seccion Correcto'), // Resuelve la promesa cuando la notificación se cierra
        {
          loading: 'Cargando...',
          success: (resolved) => {
            navigate('/'); // Redirige a la página 'home' después de que la notificación se cierre
            return resolved;
          },
        }
      );
   }catch(error){
    console.log(error)
    setError(true);
   }
}

  return (
    <div className=' flex justify-center items-center min-h-screen'>
    <div  className="p-10   m-auto w-[400px] h-[340px] bg-white">
       <h1 className='text-2xl font-bold text-center'>Beaches Chat</h1>
      <h2 className='text-center'> Login</h2>
      <form className="grid gap-8" onSubmit={handleSubmit} >
     
        <input className = "border-b-gray-300 border-b" type="email" placeholder="email"/>
        <input className = "border-b-gray-300 border-b" type="password" placeholder="password"/>
        
        <button className='bg-indigo-400 p-2 font-bold text-white'> Login</button>
      </form>
      {error && <span>Ouu algo salio mal</span>}
    <p className='text-center my-4'>No tienes cuenta ? <Link to="/register"> Register </Link></p>
    </div>
  </div>
  )
}
