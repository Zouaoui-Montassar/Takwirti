import { createContext, useReducer , useEffect } from 'react'

export const AuthContext = createContext()

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      
      return { user: action.payload }
    case 'LOGOUT':
      return { user: null }
    default:
      return state
  }
}

export const AuthContextProvider = ({ children }) => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const initialState = storedUser ? { user: storedUser } : { user: null };
  /* en realité lenna el initial state tethat null , ama ken naamel akeka ywalili kol refresh yhez lel sign in 
   donc walit amaltou ychecki el local storage ken fama user ( hata louken el token ghalet chaalina feha )
   ywali yhotou fel initla state bech yrefreshi lpage   */
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    
    if (user) {
      dispatch({ type: 'LOGIN', payload: user }) 
    }
  }, [])

  console.log('AuthContext state:', state)
  
  
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      { children }
    </AuthContext.Provider>
  )

}