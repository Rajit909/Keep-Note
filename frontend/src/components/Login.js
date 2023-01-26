import React,{useState, useEffect, useRef} from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { NavLink, useNavigate } from 'react-router-dom'
import Social from "../components/Social.js"
import {auth} from "../Firebase/firebase.config.js"
import { async } from '@firebase/util';


function Login() {
  const navigate = useNavigate();

  const [ userDetails, setUserDetails ] = useState({
    email: "",
    password: "",
  });


  const [ errorMessage, setErrorMessage ] = useState("");
  const inputPassRef = useRef();

  const submitHandler = async(e) =>{
    e.preventDefault();
    if (!(userDetails.email && userDetails.password)) {
      setErrorMessage("All fields are Required.");
      return;
    }else{
      setErrorMessage("");
    }
    try {
      await signInWithEmailAndPassword(
        auth,
        userDetails.email,
        userDetails.password
      );
      navigate("/")
    } catch (error) {
      console.log(error.message)
      setErrorMessage(error.password)
    }
  };
  useEffect(() => {
    try {
      auth.onAuthStateChanged((user) => {
        if (user) {
          navigate("/")
        }
      })
    } catch (error) {
      console.log(error)
      message: error.message
    }
  }, []);

  const showPassword = () => {
    if (inputPassRef.current.type === "password") {
      inputPassRef.current.type = "text";
    }else{
      inputPassRef.current.type = "password"
    }
  };

  return (
    <div>Login</div>
  )
}

export default Login