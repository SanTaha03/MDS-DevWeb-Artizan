import { createContext, useContext, useEffect, useReducer } from 'react'
import { loginApi, registerApi } from '../services/api'
import { toast } from 'react-toastify'

const AuthContext = createContext()

const actionTypes = {
  LOGIN: 'LOGIN', // Connecté avec succès
  REGISTER: 'REGISTER', // Inscrit + connecté avec succès
  LOGOUT: 'LOGOUT', // Déconnecté
  LOADING: 'LOADING', // Chargement
  ERROR: 'ERROR', // Erreur
  RESET: 'RESET', // Réinitialisation de l'état
  SET_USER: 'SET_USER' // Modifier us
}

const initialState = {
  jwt: null,
  user: null,
  loading: false,
  error: null
}

/**
 * @param prevState Etat précédent l'action
 * @param action Action pour mettre à jour l'état = { type, data? = { jwt, user, error } }
 */
const authReducer = (prevState, action) => {
  switch (action.type) {
    case actionTypes.REGISTER:
    case actionTypes.LOGIN:
      return {
        jwt: action.data.jwt,
        user: action.data.user,
        loading: false,
        error: null
      }
    case actionTypes.ERROR:
      return {
        jwt: null,
        user: null,
        loading: false,
        error: action.data.error
      }
    case actionTypes.LOADING:
      return {
        ...prevState, // Recopie de l'état précédent
        loading: true
      }
    case actionTypes.RESET:
    case actionTypes.LOGOUT:
    {
      return initialState
    }
    case actionTypes.SET_USER:
      return {
        ...prevState,
        loading: true,
        user: action.data.user // Modif les infos user
      }
    default:
      throw new Error(`Unhandled action type : ${action.type}`)
  }
}

const authFactory = (dispatch) => ({
  // credentials = { identifier, password }
  login: async (credentials) => {
    dispatch({ type: actionTypes.LOADING })
    try {
      const result = await loginApi(credentials)
      dispatch({
        type: actionTypes.LOGIN,
        data: {
          user: result.user,
          jwt: result.jwt
        }
      })
    } catch (error) {
      console.error(error)
      toast.error('Identfiant ou mot de passe incorrect')
      dispatch({
        type: actionTypes.ERROR,
        data: {
          error: 'Identifiant ou mot de passe incorrect'
        }
      })
    }
  },
  logout: () => {
    dispatch({ type: actionTypes.LOGOUT })
  },
  register: async (credentials) => {
    dispatch({ type: actionTypes.LOADING })
    try {
      const result = await registerApi(credentials)
      dispatch({
        type: actionTypes.REGISTER,
        data: {
          user: result.user,
          jwt: result.jwt
        }
      })
    } catch (error) {
      console.error(error)
      toast.error('Identfiant ou mot de passe incorrect')
      dispatch({
        type: actionTypes.ERROR,
        data: {
          error: 'Identifiant ou mot de passe incorrect'
        }
      })
    }
  },
  setUser: (newUser) => {
    dispatch({
      type: actionTypes.SET_USER, data: { user: newUser }
    })
  }
})

const AuthProvider = ({ children }) => {
  const savedState = window.localStorage.getItem('AUTH')
  const _initialState = savedState ? JSON.parse(savedState) : initialState

  // Si le jeton n'est pas défini dans savedState mais qu'il existe dans le local storage,
  // mettez à jour l'état initial avec le jeton du local storage.
  if (_initialState.jwt === null) {
    const savedJwt = window.localStorage.getItem('jwt')
    if (savedJwt) {
      _initialState.jwt = savedJwt
    }
  }

  const [state, dispatch] = useReducer(authReducer, _initialState)

  useEffect(() => {
    window.localStorage.setItem('AUTH', JSON.stringify(state))
  }, [state])

  return (
    <AuthContext.Provider value={{ state, ...authFactory(dispatch) }}>
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used inside an <AuthProvider>')
  return context
}

export {
  AuthProvider,
  useAuth
}
