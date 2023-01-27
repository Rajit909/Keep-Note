import React, { useState } from 'react'
import {auth, G_Provider, F_Provider } from "../Firebase/firebase.config.js"
import axios from 'axios'
import {
  signInWithPopup,
  GoogleAuthProvider,
  facebookAuthProvider
} from "firebase/auth"
import { useNavigate } from 'react-router-dom'

function Social() {


  return (
    <div>Social</div>
  )
}

export default Social