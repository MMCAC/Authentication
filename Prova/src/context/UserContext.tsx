import { createContext, ReactNode, useState } from 'react'

type UserType = {
  authTime: number,
  exp: number,
  photoURL: string,
  displayName: string,
  setAuthTime: (newState: number) => void,
  setExp: (newState: number) => void,
  isSessionValid: () => boolean,
  setPhotoURL: (newState: string) => void,
  setDisplayName: (newState: string) => void

}

const initialValue: UserType = {
  authTime: 0,
  exp: 0,
  photoURL: '',
  displayName: '',
  setAuthTime: () => {},
  setExp: () => {},
  setPhotoURL: () => {},
  isSessionValid: () => false,
  setDisplayName: () => {}
}

export const UserContext = createContext(initialValue)

type UserContextProps = {
  children: ReactNode
}

export const UserContextProvider = ({children}: UserContextProps) => {
  const [authTime, setAuthTime] = useState(initialValue.authTime)
  const [exp, setExp] = useState(initialValue.exp)
  const [photoURL, setPhotoURL] = useState(initialValue.photoURL)
  const [displayName, setDisplayName] =useState(initialValue.displayName)

  

  // const isSessionValid = () => {
  //   const diff = exp - new Date().getTime()
  //   return diff > 0
  // }
  
  return <UserContext.Provider value={{authTime, exp, photoURL, displayName, setAuthTime, setExp, setPhotoURL, setDisplayName, isSessionValid: () => {
   const timestamp = new Date().getTime()
   const diff = exp*1000 - timestamp
   console.log(timestamp, exp, diff)
   return diff > 0}}}>{children}</UserContext.Provider>
}