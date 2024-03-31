import { createContext, useReducer, useEffect } from 'react';

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload };
    case 'LOGOUT':
      return { user: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const storedUser = JSON.parse(localStorage.getItem('user')) || null;
  const initialState = storedUser ? { user: storedUser } : { user: null };
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!storedUser) {
          throw new Error('User not found in localStorage');
        }
        const response = await fetch(`http://localhost:4000/api/users/${storedUser.userObj._id}`, {
          method: 'GET',
    
        });
        if (!response.ok) {
          throw new Error('Failed to fetch user details');
        }
        const data = await response.json();
        localStorage.setItem('user', JSON.stringify(data));
        console.log(data)
        dispatch({ type: 'LOGIN', payload: data });
      } catch (error) {
        console.error(error);
        // Handle error, such as redirecting to login page
      }
    };

    if (storedUser) {
      fetchUser();
    }
  }, []);
  console.log('AuthContext state:', state)

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      { children }
    </AuthContext.Provider>
  );
};
