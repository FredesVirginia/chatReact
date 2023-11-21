import Register from "./pages/Register";
import "./App.css";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { Toaster } from 'react-hot-toast';
import {useContext} from "react";
import {AuthContext} from "./context/AuthContext"
import {useState} from "react";
import toast from "react-hot-toast";
import {
  BrowserRouter, 
  Routes ,
  Route , 
  Navigate,
 
} from "react-router-dom";


function App() {
  const { currentUser, authLoading } = useContext(AuthContext);
  
 console.log("EL user es " , currentUser)
 const ProtectedRoute = ({ children }) => {
  if (authLoading) {
    return <div className="flex justify-center items-center">
      <h1 className=" mt-[200px] text-2xl">Autenticando...</h1>
    </div>
  }

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return children;
};


  return (
  
    <div className="bg-indigo-300 h-screen"  >
       <BrowserRouter>
      <Routes>
     
          <Route
            index
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
    <Toaster position="top-center" reverseOrder={false} />
    </div>
   
   
  );
}

export default App;
