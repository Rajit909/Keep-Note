import React from 'react'
import { useEffect, useRef, useState } from 'react'
import axios from "axios"
import {signOut, sendEmailVerification} from "firebase/auth"
import { Auth } from 'firebase/auth'
import Navbar from "./Navbar"
import { NavLink, useNavigate } from 'react-router-dom'
import { async } from '@firebase/util'




function Dashboard() {
  const navigate = useNavigate();

  const [ userNote, setUserNote] = useState({
    title: "",
    note: "",
  });

  const titleRef = useRef();
  const noteRef = useRef();
  const updateBtnRef = useRef();
  const addBtnRef = useRef();
  const searchRef = useRef();
  const [ showMsg, setShowMsg ] = useState("");
  const [ holdId, setHoldId ] = useState(0);
  const [ Notes, setNotes ] = useState([]);
  const [searchText, setSearchText ] = useState("");
  const [allNotes, setAllNotes] = useState(Notes);
  const [ userData, setUserData] = useState({});

// Auth system

  useEffect(() => {
    const onload = async () => {
      await fetchData();
      await fetchUserNotes();
    }
    onload();

    // eslint disable next line
  }, [userData])

  const fetchData = async()=>{
    Auth.onAuthStateChanged((user) => {
      setUserData(user);

      if (!user) {
        navigate("/login")
      }
    });
  }

  const logout = async (e) => {
    e.preventDefault();
    try {
      await signOut(auth);
      alert("SignOut Successfull.")
      navigate("/login")
    } catch (error) {
      console.log(error.message);
      alert(error.message)
    }
  };

  const verifyEmail = async (e) => {
    e.preventDefault();
    try {
      let user = auth.currentUser;
      await sendEmailVerification(user)
      alert(
        "Email verification mail send, if not found in primary mail box, check in spam"
      )
    } catch (error) {
      console.log(error.message)
      alert(error.message);
    }
  };

  // handle all promise
  const handlePromise = async (Promise) => {
    let data, err;
    try {
      data = await promise;
    } catch (error) {
      err = error.message;
    }
    return [data, err]
  };

  // adding note to database
  const addnote = async (e) => {
    e.preventDefault();

    if (!(userNote.title && userNote.note && userData.email)) {
      setShowMsg("Please add title and Note")
      setTimeout(() => {
        setShowMsg("")
      }, 2000);
      return;
    }
    
    const value = {
    title: userNote.title,
    note: userNote.note,
    email: userData.email,
  }

  const promise = axios.put(
    `${process.env.REACT_APP_BACKEND_URL}/updatenote`,
    value
  )
  
  const [data, err] = await handlePromise(promise);
  await fetchUserNotes();

  if (err) {
    setShowMsg(err)
    console.log(err);
    return;
  }
  setShowMsg("NOte added Successfully")

  setTimeout(() => {
    setShowMsg("")
  }, 2000);
  userNote.title = "";
  userNote.note = "";
}

// Fetching data from Backend 
  const fetchUserNotes = async () => {
    if (!userData.email) {
      return;
    }
    console.log(typeof userData.email);
    let promise = axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/notes/${userData.email}`
    );

    const [data, err] = await handlePromise(promise);

    if (err) {
      return;
    }

    setNotes(data.data?.notes)
    setAllNotes(data.data?.notes)
  };

  // edit method
  const editNote = async (title, note, id) => {
    titleRef.current.value = title;
    noteRef.current.value = note
    setHoldId(id);
    setUserNote({
      title: titleRef.current.value,
      note: noteRef.current.value
    });
    // windo scroll to(0,0)
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth"
    })
    setTimeout(() => {
      titleRef.current.focus();
    }, 1000);

    updateBtnRef.current.style.display = "block";
    addBtnRef.current.style.display = "none";
  };

  // update method while editing

  const updateNote = async (e) => {
    e.preventDefault();

    const value = {
      title: userNote.title,
      note: userNote.note,
      email: userData.email,
    };

    let promise = axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/editNote/${holdId}`,
      value
    )

    const [data, err] = await handlePromise(promise);
    await fetchUserNotes();

    if (err) {
      setShowMsg(err)

      setTimeout(() => {
        setShowMsg("")
      }, 4000);
    }
    if (data) {
      setShowMsg("Note Upadted")
      updateBtnRef.current.style.display = 'none';
      addBtnRef.current.style.display = "block";

      setTimeout(() => {
        setShowMsg("")
      }, 3000);
    }
    setUserNote({ title:"", note: ""});
  };

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