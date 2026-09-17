import { useEffect, useState } from 'react'
import { AuthContext } from './AuthContext.jsx'
import { useCookies } from 'react-cookie'

export const AuthContextProvider = ({ children }) => {


  const [authToken, setAuthToken] = useState(null)
  const [cookies, setCookies, removeCookie] = useCookies()

  const now = new Date().getTime()
  const twoHoursFromNow = now + 24 * 60 * 60 * 1000
  const expireTime = new Date(twoHoursFromNow)

  useEffect(() => {
    if (authToken) {
      setCookies('authToken', authToken, {expires: expireTime, path: '/'})
    }
  }, [authToken, setCookies])

  if(!authToken && cookies.authToken) {
    setAuthToken(cookies?.authToken)
  }

  const logout = () => {
    setAuthToken(null)
    removeCookie('authToken', { path: '/' })
    // navigate til login page her?
  }

  return (

    <AuthContext.Provider value={{ authToken, setAuthToken, logout }}>
      {children}
    </AuthContext.Provider>
  )
}