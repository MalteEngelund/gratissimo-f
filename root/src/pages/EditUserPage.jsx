import { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useForm } from 'react-hook-form'
import { SectionContainer } from '../components/SectionContainer/SectionContainer'
import { SectionTitle } from '../components/SectionTitle/SectionTitle'
import { NavLink } from 'react-router'
import { FormLabel } from '../components/FormLabel/FormLabel'
import { Button } from '../components/Button/Button'

// repeat password hookform: https://stackoverflow.com/questions/70480928/how-to-validate-password-and-confirm-password-in-react-hook-form-is-there-any-v

export function EditUserPage() {


  const { authToken, setAuthToken, logout } = useContext(AuthContext)
  const { register, handleSubmit, formState: { errors }, watch} = useForm()
  const [ loginResponse, setLoginResponse ] = useState('')

  const userId = authToken.user.id
  console.log('userId:', userId)

  const editLogin = async (data) => {
    try {
      const response = await fetch(import.meta.env.VITE_PUBLIC_BASE_URL + `/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken.accessToken}`
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
          firstname: data.firstname,
          lastname: data.lastname,
          phone: data.phone,
          zipcode: data.zipcode,
        })
        
      })
      const responseData = await response.json()

      if (response.ok) {
        console.log('Login edited successfully:', responseData)
        setLoginResponse('Konto redigeret!')
      }
      if (!response.ok) {
        console.error('Failed to edit login:', responseData)
        setLoginResponse('Fejl ved redigering af konto. Prøv igen.')
      }

    }
    catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <>
      <SectionContainer>
        <SectionTitle text='Redigér bruger' />
        {!authToken ? (
          <div className='flex flex-col gap-4'>
            <NavLink to='/login'>
              <button className='bg-main-red hover:bg-main-red-hover px-4 py-2 cursor-pointer text-text-white rounded-2xl'>Du skal være logget ind</button>
            </NavLink>
          </div>
        
        ) : (
          <form noValidate onSubmit={handleSubmit(editLogin)} className='w-full flex flex-col gap-8'>
          <div className='flex flex-col'>
            <FormLabel text='Email' name='email' />
            <input type="text" name='email' placeholder='skriv din email...' className='bg-light-red px-4 py-2 rounded border border-border-gray' {...register("email", { required: true, pattern: { value: /^\S+@\S+$/, message: "Indtast en gyldig email" }})} />
            {errors.email && <span className="text-red-500">Indstast en gyldig email</span>}
          </div>
          <div className='flex flex-col'>
            <FormLabel text='Password' name='password' />
            <input type="password" placeholder='skriv dit password..' className='bg-light-red px-4 py-2 rounded border border-border-gray' {...register("password", { required: true, pattern: { value: /^[A-Za-z0-9]+$/, message: 'Må ikke indeholde specialtegn' } })} />
            {errors.password && <>{/* <span className="text-red-500">Forkert password eller email.</span> */}<span className="text-red-500">{errors.password.message}</span></>}
          </div>
          <div className='flex flex-col'>
            <FormLabel text='Gentag password' name='repeatPassword' />
            <input type="password" placeholder='gentag dit password..' className='bg-light-red px-4 py-2 rounded border border-border-gray' {...register("repeatPassword", {required: true, validate: (val) => {if (watch('password') !== val) { return "Passwords matcher ikke"; }},})} />
            {errors.repeatPassword && <>{/* <span className="text-red-500">Forkert password eller email.</span> */}<span className="text-red-500">{errors.repeatPassword.message}</span></>}
          </div>
          <div className='flex flex-col'>
            <FormLabel text='Fornavn' name='firstname' />
            <input type="text" placeholder='skriv dit fornavn..' className='bg-light-red px-4 py-2 rounded border border-border-gray' {...register("firstname", { required: true, pattern: { value: /^[A-Za-z0-9]+$/, message: 'Må ikke indeholde specialtegn' } })} />
            {errors.firstname && <>{/* <span className="text-red-500">Forkert password eller email.</span> */}<span className="text-red-500">{errors.firstname.message}</span></>}
          </div>
          <div className='flex flex-col'>
            <FormLabel text='Efternavn' name='lastname' />
            <input type="text" placeholder='skriv dit efternavn..' className='bg-light-red px-4 py-2 rounded border border-border-gray' {...register("lastname", { required: true, pattern: { value: /^[A-Za-z0-9]+$/, message: 'Må ikke indeholde specialtegn' } })} />
            {errors.lastname && <>{/* <span className="text-red-500">Må ikke indeholde specialtegn</span> */}<span className="text-red-500">{errors.lastname.message}</span></>}
          </div>
          <div className='flex flex-col'>
            <FormLabel text='Telefon nummer' name='phone' />
            <input type="text" placeholder='skriv dit telefon nummer..' className='bg-light-red px-4 py-2 rounded border border-border-gray' {...register("phone", { required: true, pattern: { value: /^[2-9]\d{7}$/, message: 'Må kun indeholde 8 tal og ikke starte med 0 eller 1' } })} />
            {errors.phone && <>{/* <span className="text-red-500">Må kun indeholde 8 tal</span> */}<span className="text-red-500">{errors.phone.message}</span></>}
          </div>
          <div className='flex flex-col'>
            <FormLabel text='Post nummer' name='zipcode' />
            <input type="text" placeholder='skriv dit post nummer..' className='bg-light-red px-4 py-2 rounded border border-border-gray' {...register("zipcode", { required: true, pattern: { value: /^\d{4}$/, message: 'Må kun indeholde 4 tal' } })} />
            {errors.zipcode && <><span className="text-red-500">{errors.zipcode.message}</span></>}
          </div> 
          <Button type='submit' text='Rediger bruger' />
          <span className='text-green-500'>{loginResponse}</span>
        </form>
        )
      }
      </SectionContainer>
    </>
  )
}