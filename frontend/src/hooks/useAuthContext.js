import { AuthContext } from "../context/AuthContext"
import { useContext } from "react"

export const useAuthContext = () => {
  const context = useContext(AuthContext)

  if(!context) {
    throw Error('useAuthContext must be used inside an AuthContextProvider')
  }

  if (!context.user) {
    console.log('User is null , please sign in');
    // nhotou error 404 page ???
  }
  return context
}