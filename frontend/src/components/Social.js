import React, { useState } from 'react'
import {auth, G_Provider, F_Provider } from "../Firebase/firebase.config.js"
import axios from 'axios'
import {
  signInWithPopup,
  GoogleAuthProvider,
  facebookAuthProvider,
  FacebookAuthProvider
} from "firebase/auth"
import { useNavigate } from 'react-router-dom'
import { async } from '@firebase/util'

function Social() {
  const navigate = useNavigate();

  const [ errorMessage, setErrorMessage ] = useState();

  // Google SignIn
  const googleSignIn = async(e) => {
    e.preventDefault();
    try {
      const result = await signInWithPopup(auth, G_Provider);
      // registered User info
      const user = result.user
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/addnote`, {
          email: user.email,
          name: user.displayName,
        });
        setErrorMessage("");
        navigate("/")
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log(errorCode, errorMessage, email, credential);
      setErrorMessage(error.message)
    }
  };

  //  Facebook Authentication
  const facebookSignIn = async (e) => {
    e.preventDefault();
    try {
      const result = await signInWithPopup(auth, F_Provider);
      const user = result.user;
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/addnote`,{
          email: user.email,
          name: user.displayName,
        });
        setErrorMessage("");
        navigate("/")
    } catch (error) {
      console.log(error);
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = FacebookAuthProvider.credentialFromError(error);
      setErrorMessage(error,message)
    }
  };


  return (
    <>
      <div className="flex mt-7 justify-center w-full gap-8">
        <button
          type="button"
          className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
          onClick={(e) => facebookSignIn(e)}
        >
          Facebook
        </button>
        <button
          type="button"
          className="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
          onClick={(e) => googleSignIn(e)}
        >
          Google
        </button>
      </div>
      <div>
        <h4 className="text-sm font-semibold mt-2 text-red-600 text-center">
          {errorMessage}
        </h4>
      </div>
    </>
  )
}

export default Social