import React, { useEffect, useState } from 'react'
import { Button, Input, Spinner, Switch } from '@nextui-org/react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/authContext'

function RegisterForm () {
  // Version simple
  // const [firstName, setFirstName] = useState('')
  // const [lastName, setLastName] = useState('')
  const [isSelected, setIsSelected] = React.useState(true)
  const [formData, setFormData] = useState({
    firstName: 'taha',
    lastName: 'tadil',
    username: 'tahatadil',
    email: 'taha@gmail.com',
    password: 'tahataha'

  })

  const navigate = useNavigate()
  const { state: { user, jwt, error, loading }, register } = useAuth()

  useEffect(() => {
    if (user && jwt) {
      navigate('/dashboard')
    }
  }, [user, jwt])

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    register(formData)
  }

  console.log(formData)

  return (

    <> {
      loading && (
        <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-center'>
          <Spinner color='warning' />
        </div>
      )
    }
      <form className='flex flex-col justify-center gap-3 px-32 ' onSubmit={handleSubmit}>
        <h2>S'INSCRIRE</h2>
        <Input
          name='lastName'
          label='Nom : '
          placeholder='Entrez votre nom...'
          value={formData.lastName}
          onChange={handleChange}

        />
        <Input
          name='firstName'
          label='Prénom : '
          placeholder='Entrez votre prénom...'
          value={formData.firstName}
          onChange={handleChange}
        />
        <Input
          name='username'
          label="Nom d'utilisateur : "
          isRequired
          placeholder="Entrez votre nom d'utilisateur..."
          value={formData.username}
          onChange={handleChange}
        />
        <Input
          name='email'
          label='Email : '
          isRequired
          placeholder='Entrez votre adresse email...'
          value={formData.email}
          onChange={handleChange}
        />
        <Input
          name='password'
          label='Mot de passe : '
          isRequired
          placeholder='Entrez un mot de passe...'
          value={formData.password}
          onChange={handleChange}
        />

        <div className='flex flex-col items-start gap-2'>
          <Switch isSelected={isSelected} onValueChange={setIsSelected}>
            Artisan ?
          </Switch>
          <p className='px-2 text-small text-default-500'> {isSelected ? 'YES !' : 'NOP!'}</p>
        </div>
        {
          error && <p style={{ color: 'red' }}>{error}</p>
        }
        <Button
          type='submit'
          color='primary'
        >
          S'ENREGISTER
        </Button>
      </form>
    </>
  )
}

export default RegisterForm
