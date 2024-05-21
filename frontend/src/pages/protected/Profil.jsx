import { Button, Input } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../contexts/authContext'
import { toast } from 'react-toastify'
import validator from 'validator'
import setUpdateUser from '../../hooks/User'

function Profil () {
  const { state: { user, jwt }, setUser } = useAuth()

  const [isEditMode, setIsEditMode] = useState(false)

  const { response, isLoading, update } = setUpdateUser()

  const [formData, setFormData] = useState({
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    username: user.username || '',
    email: user.email || '',
    id: user.id || '',
    token: jwt || ''
  })

  useEffect(() => {
    if (isEditMode) {
      setFormData({
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
        token: user.jwt
      })
    }
  }, [isEditMode])

  useEffect(() => {
    if (response && !isLoading) {
      setUser({ ...user, username: formData.username, email: formData.email })
    }
  }, [response])
  const handleEdit = () => {
    setIsEditMode(true)
  }

  const handleSave = () => {
    if (validator.matches(formData.email, /\S+@\S+\.\S+/)) {
      update({
        id: user.id,
        firstName: formData.firstName,
        lastName: formData.lastName,
        username: formData.username,
        email: formData.email,
        token: user.jwt
      })
      setIsEditMode(false)
    } else {
      toast.error('Veuillez entrer une adresse email valide')
    }
  }

  const handleChange = (event) => {
    if (isEditMode) {
      setFormData({
        ...formData,
        [event.target.name]: event.target.value
      })
    }
  }

  return (
    <section className='p-4'>
      <div className='title-container text-2xl font-bold'>
        <h2>
          Welcome back,{' '}
          <span className=' bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent'>
            {formData.username}
          </span>
        </h2>
      </div>

      <div className='mb-4'>
        <div className='flex'>
          <div className='md:w-1/3 px-2'>
            <label className='block'>First Name :</label>
          </div>
          <div className='md:w-2/3'>
            {isEditMode
              ? (
                <Input
                  type='text'
                  name='firstName'
                  value={formData.firstName}
                  onChange={handleChange}
                />
                )
              : (
                <span>{formData.firstName}</span>
                )}
          </div>
        </div>
      </div>
      <div className='mb-4'>
        <div className='flex'>
          <div className='md:w-1/3 px-2'>
            <label className='block'>Last Name :</label>
          </div>
          <div className='md:w-2/3'>
            {isEditMode
              ? (
                <Input
                  type='text'
                  name='lastName'
                  value={formData.lastName}
                  onChange={handleChange}
                />
                )
              : (
                <span>{formData.lastName}</span>
                )}
          </div>
        </div>
      </div>
      <div className='mb-4'>
        <div className='flex'>
          <div className='md:w-1/3 px-2'>
            <label className='block'>Username :</label>
          </div>
          <div className='md:w-2/3'>
            {isEditMode
              ? (
                <Input
                  type='text'
                  name='username'
                  value={formData.username}
                  onChange={handleChange}
                />
                )
              : (
                <span>{formData.username}</span>
                )}
          </div>
        </div>
      </div>
      <div className='mb-4'>
        <div className='flex'>
          <div className='md:w-1/3 px-2'>
            <label className='block'>Email :</label>
          </div>
          <div className='md:w-2/3'>
            {isEditMode
              ? (
                <Input
                  type='text'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                />
                )
              : (
                <span>{formData.email}</span>
                )}
          </div>
        </div>
      </div>
      <div className='row'>
        {isEditMode
          ? (
            <Button onClick={handleSave} className=' text-white font-bold py-2 px-4 rounded mr-2' color='primary'>Save</Button>
            )
          : (
            <Button onClick={handleEdit} className=' text-white font-bold py-2 px-4 rounded mr-2' color='primary'>Edit</Button>
            )}
      </div>
    </section>
  )
}

export default Profil
