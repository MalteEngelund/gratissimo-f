import { NavLink } from 'react-router';
import { ListTitle } from '../ListTitle/ListTitle';
import facebookLogo from '../../assets/icons/SoMe/facebook.png'
import linkedInLogo from '../../assets/icons/SoMe/LinkedIn Circled.png'
import instagramLogo from '../../assets/icons/SoMe/Instagram Circle.png'
import googlePlusLogo from '../../assets/icons/SoMe/Google Plus.png'
import { useForm } from 'react-hook-form';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';

export function Footer() {


  const [emailResponse, setEmailResponse] = useState(null)
  const { register, handleSubmit, formState: { errors } } = useForm()
  const { authToken } = useContext(AuthContext)

  const postNewsLetter = async (data) => {
    setEmailResponse(null)
    try {
      const response = await fetch(import.meta.env.VITE_PUBLIC_BASE_URL + '/api/newsletter', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email
        })
        
      })
      const responseData = await response.json()

      if (response.ok) {
        console.log('Newsletter subscribed successfully:', responseData)
        setEmailResponse('Du er nu tilmeldt!')
      }
      if (!response.ok) {
        console.error('Failed to subscribe to newsletter:', responseData)
        setEmailResponse('Ugyldig email eller allerede tilmeldt')
        
      }

    }
    catch (error) {
      console.error('Error:', error)
      setEmailResponse('Der opstod en fejl.')
    }
  }





  return (
    <footer className='flex flex-col lg:flex-row items-center md:justify-around gap-8 md:gap-4 bg-main-red mt-auto text-text-white p-8'>
      <ul className='flex flex-col'>
        <li><ListTitle text="For jobsøgere" /></li>
        <li><NavLink>Din kundeside</NavLink></li>
        <li><NavLink to="/opret-bruger">Opret bruger</NavLink></li>
        <li><NavLink>Gemte jobs</NavLink></li>
      </ul>
      <ul>
        <li><ListTitle text="For arbejdsgivere" /></li>
        <li><NavLink>Virksomhedsprofil</NavLink></li>
        <li><NavLink>Jobannoncering</NavLink></li>
        <li><NavLink>Rekruttering</NavLink></li>
      </ul>
      <ul>
        <li><ListTitle text="Links" /></li>
        <li><NavLink>Om Gratissimo</NavLink></li>
        <li><NavLink>Job hos os</NavLink></li>
        <li><NavLink>For investorer</NavLink></li>
        <li><NavLink>Presse</NavLink></li>
      </ul>
      <ul>
        <li><ListTitle text="Vil du have jobs direkte i din indbakke?" /></li>
        <li><NavLink>Tilmeld dig vores elektroniske nyhedsbrev</NavLink></li>
        <form className='flex flex-row' noValidate onSubmit={handleSubmit(postNewsLetter)}>
          <input type="email" placeholder='@ indtast email' className='bg-off-white text-black p-2 rounded-l focus:outline-none' {...register('email', { required: 'Indtast en email', pattern: { value: /^\S+@\S+$/i, message: 'Indtast en gyldig email' } })} />
          <button className='bg-dark-red p-2 rounded-r'>Tilmeld</button>
        </form>
        {errors.email && <span className="text-red-500">{errors.email.message}</span>}
        {emailResponse && <span className="text-white">{emailResponse}</span>}
      </ul>
      <div className='flex flex-col gap-4'>
        <ul>
          <li><ListTitle text="Kontakt info" /></li>
          <li><NavLink>Fidusvej 23</NavLink></li>
          <li><NavLink>9230 Øster Lundby</NavLink></li>
          <li><NavLink>+45 22 13 22 13</NavLink></li>
        </ul>
        <div className='flex flex-row'>
          <NavLink><img src={linkedInLogo} alt="linked in" className='h-10' /></NavLink>
          <NavLink><img src={facebookLogo} alt="facebook" className='h-10' /></NavLink>
          <NavLink><img src={instagramLogo} alt="instagram" className='h-10' /></NavLink>
          <NavLink><img src={googlePlusLogo} alt="google plus" className='h-10' /></NavLink>
        </div>
      </div>
    </footer>
  )
}