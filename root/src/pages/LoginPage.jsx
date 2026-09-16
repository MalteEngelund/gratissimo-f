import { NavLink } from 'react-router';
import { SectionContainerRed } from '../components/SectionContainerRed/SectionContainerRed';
import { SectionTitle } from '../components/SectionTitle/SectionTitle';
import { SectionContainer } from '../components/SectionContainer/SectionContainer';
import { FormLabel } from '../components/FormLabel/FormLabel';
import { Button } from '../components/Button/Button';
import { useForm } from 'react-hook-form'
import { AuthContext } from '../context/AuthContext';
import { useContext, useState } from 'react';

export function LoginPage() {


  const { authToken, setAuthToken, logout } = useContext(AuthContext)
  const { register, handleSubmit, formState: { errors } } = useForm()
  // const [ loginResponse, setLoginResponse ] = useState('')


  const postLogin = async (data) => {

    try {
      const response = await fetch(import.meta.env.VITE_PUBLIC_BASE_URL + '/api/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: data.username,
          password: data.password,
        }),
      
        })
        const responseData = await response.json()
        if (response.ok) {
          console.log('Login successful:', responseData)
          setAuthToken(responseData)
          // setLoginResponse('Du er nu logget ind!')
        }
        if (!response.ok) {
          console.error('Login failed:', responseData)

      }

    }
    catch (error) {
      console.error('Error:', error)

    }
  }

  return (
    <>
      {!authToken &&

      <SectionContainerRed>
        <div className='flex flex-col gap-8 text-center'>
          <SectionTitle text='Log ind eller opret dig som bruger' />
          <p>Når du opretter en profil på Gratissimo får du adgang til at oprette, slette og redigere i job annoncer. Som privatperson får du mulighed for at gemme de jobs du kunne være interesseret i. </p>
          <NavLink className='text-main-red hover:text-main-red-hover'>Log ind for at gå til min side</NavLink>
        </div>
      </SectionContainerRed>
      }
      <SectionContainer>
        <SectionTitle text='Login' />
        {!authToken ? (
        <form noValidate onSubmit={handleSubmit(postLogin)} className='w-full flex flex-col gap-8'>
          <div className='flex flex-col'>
            <FormLabel text='Email' name='email' />
            <input type="text" name='email' placeholder='skriv din email...' className='bg-light-red px-4 py-2 rounded border border-border-gray' {...register("username", { required: true, pattern: { value: /^\S+@\S+$/, message: "Indtast en gyldig email" }})} />
            {errors.username && <span className="text-red-500">Indstast en gyldig email</span>}
          </div>
          <div className='flex flex-col'>
            <FormLabel text='Password' name='password' />
            <input type="password" placeholder='skriv dit password..' className='bg-light-red px-4 py-2 rounded border border-border-gray' {...register("password", { required: true, pattern: { value: /^[A-Za-z0-9]+$/, message: 'Må ikke indeholde specialtegn' } })} />
            {errors.password && <><span className="text-red-500">Forkert password eller email.</span><span className="text-red-500">{errors.password.message}</span></>}
          </div>
          <Button type='submit' text='Log ind' />
          
        <NavLink to='/opret-bruger' className='text-main-red hover:text-main-red-hover'>Opret bruger</NavLink>
        </form>
        ) : (
          <div className='flex flex-col gap-4'>
            <span className='text-green-500'>Du er logget ind!</span>
            <button onClick={logout} className='bg-main-red hover:bg-main-red-hover px-4 py-2 cursor-pointer text-text-white rounded-2xl'>Log ud</button>
          </div>
        )
      }
      </SectionContainer>
    </>
  )
}