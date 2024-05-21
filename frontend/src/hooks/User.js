import { useCallback, useState } from 'react'
import { toast } from 'react-toastify'

const setUpdateUser = () => {
  const [response, setResponse] = useState()
  const [error, setError] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const update = useCallback(async ({ id, username, email, token }) => {
    try {
      console.log('Update function called with ID:', id) // Log the user ID
      console.log('Update function called with JWT:', token) // Log the JWT
      console.log('Update function called with username:', username) // Log the username
      console.log('Update function called with email:', email) // Log the email

      setIsLoading(true)
      const requestData = {}
      if (username) {
        requestData.username = username
      }
      if (email) {
        requestData.email = email
      }

      const _response = await fetch(`${process.env.REACT_APP_API_URL}/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(requestData)
      })

      const _responseJSON = await _response.json()
      if (_response.ok) {
        // Update informations in Local Storage
        const savedState = JSON.parse(window.localStorage.getItem('AUTH'))
        const updateUser = { ...savedState.user, ...requestData }
        window.localStorage.setItem('AUTH', JSON.stringify({ ...savedState, user: updateUser }))

        setIsLoading(false)
        setResponse(_responseJSON)
        toast.success('Vos informations ont bien été modifiées')
      } else {
        setError(_responseJSON?.error?.message)
        setIsLoading(false)
        toast.error(_responseJSON?.error?.message)
      }
    } catch (e) {
      setError(e)
      setIsLoading(false)
    }
  }, [])
  return { response, error, isLoading, update }
}

export default setUpdateUser
