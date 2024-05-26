import React, { useState } from 'react'
import { UserContext } from './UserContext'

const UserProvider = ({children}) => {
    const userData=JSON.parse(localStorage.getItem("user"))
    const[user,setUser]=useState(userData||{})
    const[isHidden, setIsHidden]=useState(true)
  return (
    <UserContext.Provider value={{user,setUser, isHidden, setIsHidden}}>{children}</UserContext.Provider>
  )
}

export default UserProvider