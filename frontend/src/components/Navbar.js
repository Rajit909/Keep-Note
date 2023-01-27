import React,{ useRef, useState} from 'react'
import { NavLink } from 'react-router-dom'

function Navbar({ name, logout }) {
  let splitName;
  if (name) {
    splitName = name.split("");
  }
  const modalRef = useRef();
  const blurDivRef = useRef();
  const [ userData, setUserData ] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [ message, setMessage ] = useState("");
  const openModal = () => {
    modalRef.current.style.display = "block";
    blurDivRef.current.style.display = "none"
  };

  const closeModal = ()=>{
    modalRef.current.style.display = "none"
    blurDivRef.current.style.display = "none"
  };

  
  return (
    <div>Navbar</div>
  )
}

export default Navbar