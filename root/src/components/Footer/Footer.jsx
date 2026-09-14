import { NavLink } from 'react-router';
import { ListTitle } from '../ListTitle/ListTitle';
import facebookLogo from '../../assets/icons/SoMe/facebook.png'
import linkedInLogo from '../../assets/icons/SoMe/LinkedIn Circled.png'
import instagramLogo from '../../assets/icons/SoMe/Instagram Circle.png'
import googlePlusLogo from '../../assets/icons/SoMe/Google Plus.png'

export function Footer() {



  return (
    <footer className='flex flex-row justify-around bg-main-red mt-auto text-text-white p-8'>
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
        <form className='flex flex-row'>
          <input type="email" placeholder='@ indtast email' className='bg-off-white text-black p-2 rounded-l' />
          <button className='bg-dark-red p-2 rounded-r'>Tilmeld</button>
        </form>
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