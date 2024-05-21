import { useState, useCallback } from 'react'
import { toast } from 'react-toastify'

const useRegister = () => {
  const [response, setResponse] = useState()
  const [error, setError] = useState()
  const [isLoading, setIsLoading] = useState(false)

  const register = useCallback(async ({ lastName, firstName, username, email, password }) => {
    setIsLoading(true)
    try {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lastName, firstName, username, email, password })

      }
      const url = `${process.env.REACT_APP_API_URL}/auth/local/register`
      const _response = await fetch(url, requestOptions)
      const _responseJSON = await _response.json()
      if (_response.ok) {
        setResponse(_responseJSON)
        toast.success('Compte créé avec succès')
      } else {
        setError(_responseJSON?.message || 'Erreur lors de la création du compte')
        toast.error(_responseJSON?.message || 'Erreur lors de la création du compte')
      }
    } catch (error) {
      setError('Erreur de connexion au serveur')
      toast.error('Erreur de connexion au serveur')
    }
    setIsLoading(false)
  }, [])

  return { response, error, isLoading, register }
}

export default useRegister
