import { createContext, useContext, useEffect, useState } from 'react'
import Cookie from 'js-cookie'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  // Only is authenticated is we have all
  const initialAuthState = {
    token: Cookie.get('token') || '',
    user: Cookie.get('user') ? JSON.parse(Cookie.get('user')) : '',
    userId: Cookie.get('userId') || '',
    isAuthenticated:
      Cookie.get('userId') && Cookie.get('user') && Cookie.get('userId')
        ? true
        : false
  }

  const [authState, setAuthState] = useState(initialAuthState)

  useEffect(() => {
    if (Cookie.get('userId') !== authState.userId) {
      setAuthState({
        ...authState,
        token: Cookie.get('token'),
        user: Cookie.get('user'),
        userId: Cookie.get('userId')
      })
    }
  }, [authState])

  const signIn = (user, token) => {
    setAuthState({
      ...authState,
      token,
      user,
      userId: user.id,
      isAuthenticated: true
    })
    console.log(user, token)
    if (typeof window !== 'undefined') {
      Cookie.set('token', token)
      Cookie.set('user', JSON.stringify(user))
      Cookie.set('userId', user.id)
    }
  }

  const setAuthToken = token => {
    setAuthState({
      ...authState,
      token
    })
  }

  const signOut = () => {
    setAuthState(initialAuthState)
    if (typeof window !== 'undefined') {
      Cookie.remove('token')
      Cookie.remove('user')
      Cookie.remove('userId')
    }
  }

  return (
    <AuthContext.Provider value={{ authState, setAuthToken, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth () {
  const context = useContext(AuthContext)

  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider')
  }

  return context
}

export { AuthProvider as default, useAuth }
