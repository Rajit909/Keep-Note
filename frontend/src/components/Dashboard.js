import React from 'react'
import { useEffect, useRef, useState } from 'react'
import axios from "axios"
import {signOut, sendEmailVerification} from "firebase/auth"
import { Auth } from 'firebase/auth'
import Navbar from "./Navbar"
import { NavLink,useNavigate } from 'react-router-dom'



function Dashboard() {
  const navigate = useNavigate();

  const [ userNote, setUserNote] = useState({
    title: "",
    note: "",
  });




  return (
    <>
    <div className='font-bold p-5 bg-orange-400 flex gap-10 '>
      <h1>
      Dashboard
      </h1>
      <button>SignOut</button>
      </div>

    

    </>
  )
}

export default Dashboard