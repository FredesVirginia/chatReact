import React , {useContext, useState} from 'react'
import Mujer from "../img/mujer.png";
import  {collection ,  getDoc  , setDoc, getDocs, query , where , doc, serverTimestamp, updateDoc} from "firebase/firestore"
import {db} from "../firebase";
import {AuthContext} from "../context/AuthContext";


export default function SearchBar() {

  const [userName , setUserName] = useState("");
  const [user , setUser] = useState(null);
  const [error , setError] = useState(false);
  const {currentUser} = useContext(AuthContext);



  const handleSearch = async  ()=>{
     const q =query (
      collection(db, "users"),
      where("displayName" , "==" , userName) 
     );
     try{
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) =>{
          setUser(doc.data())
        })
     }catch(error){
        setError(true);
        console.log("Error en searbar"  , error)
     }
  }

  const handleKey = (e)=> {
    e.code === "Enter" && handleSearch();
  }

  const handleSelect= async (e)=>{
    const combineId = currentUser.uid > user.uid
    ? currentUser.uid + user.uid
    : user.uid + currentUser.uid;
     try{
      const res = await getDoc(doc(db , "chats" , combineId)); 
      if(!res.exists()){
        //create a chat in chats collecion
   
        await setDoc(doc(db, "chats", combineId), { messages: [] });

        
        //create user chats

        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combineId + "userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combineId + ".date"]: serverTimestamp(),
        });
        


         await updateDoc(doc(db , "userChats", user.uid) , {
          [combineId+"userInfo"] : {
            uid:currentUser.uid,
            displayName : currentUser.displayName,
            photoURL: currentUser.photoURL
          } ,
          [combineId+".date"]: serverTimestamp()
        })
     
     
      }
    
    }catch(error){
        console.log(error);
     }

     setUser(null);
     setUserName("");
  }


  
  return (
    <div className='border border-b-gray-300'>
      <div className='p-2'>
        <input  placeholder='find user' class="border-transparent bg-indigo-600  " type='text' 
          onChange={e=>setUserName(e.target.value)}
          onKeyDown={handleKey}
          value = {userName}
        />
      </div>
      {error && <span > User Not Found</span>}
       {user && <div
        onClick={handleSelect}
        className='p-2 flex items-center gap-3 text-white cursor-pointer hover:bg-indigo-900 transition'>
        <img className='w-[60px] rounded-full'
         alt=""
          src={user.photoURL}/>
        <div>
            <span>{user.displayName }</span>
        </div>
      </div> }
    </div>
  )
}
