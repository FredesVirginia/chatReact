import React , {useState} from 'react'
import Add from "../img/imagen.jpg";
import {auth , storage , db} from "../firebase";
import {  createUserWithEmailAndPassword , updateProfile } from "firebase/auth";
import { getStorage ,ref, uploadBytesResumable , getDownloadURL} from "firebase/storage"
import {doc , setDoc} from "firebase/firestore";
import {useNavigate , Link} from "react-router-dom";
import toast from 'react-hot-toast';
export default function Register() {
  const [error , setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];
  
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
  
      const storageRef = ref(storage, `profile_images/${res.user.uid}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
  
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Manejar cambios de estado durante la carga, si es necesario
        },
        (error) => {
          console.error('Error durante la carga de la imagen:', error);
          setError(true);
        },
        async () => {
          // La carga se completó con éxito, obtener la URL de descarga
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
  
          // Actualizar el perfil del usuario
          await updateProfile(res.user, {
            displayName,
            photoURL: downloadURL,
          });
  
          // Almacenar información adicional en Firestore
          await setDoc(doc(db, 'users', res.user.uid), {
            uid: res.user.uid,
            displayName,
            email,
            photoURL: downloadURL,
          });

          await setDoc(doc(db , "userChats" , res.user.uid), {});
  
          console.log('Registro exitoso');
          console.log(res);
          toast.promise(
            Promise.resolve('Login Correcto!'), // Resuelve la promesa cuando la notificación se cierra
            {
              loading: 'Cargando...',
              success: (resolved) => {
                navigate('/'); // Redirige a la página 'home' después de que la notificación se cierre
                return resolved;
              },
            }
          );
        }
      );
    } catch (error) {
      console.error('Error durante la creación del usuario:', error);
      setError(true);
    }
  };
  

  return (
    <div className=' flex justify-center items-center min-h-screen '>
      <div  className="bg-white p-10  m-auto w-[400px]">
         <h1 className='text-2xl font-bold text-center'>Beaches Chat</h1>
        <h2 className='text-center'> Register</h2>
        <form className="grid gap-8" onSubmit={handleSubmit}>
        <input className="border-b-gray-300 border-b focus:outline-blue-500 " type="text" placeholder="Name"/>
          <input className = "border-b-gray-300 border-b" type="email" placeholder="Email"/>
          <input className = "border-b-gray-300 border-b" type="password" placeholder="password"/>
           <input style={{display : "none"}} type="file" id="file"/>
            <label className='cursor-pointer' htmlFor="file">
                <img className='w-[40px]' src={Add} />
                <span> Add your avatar</span>
            </label>
          <button className='bg-indigo-400 p-2 font-bold text-white'> Sign Up</button>
        </form>
        {error && <span> Oh Algo salio Mal </span>}
        <p className='text-center my-4'>You do have an Account? <Link to="/login"> Login </Link></p>
      </div>
    </div>
  )
}
