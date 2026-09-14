import { NavBar } from '../NavBar/NavBar';
import logo from '../../assets/images/gratissimo-logo.png'
import { NavLink } from 'react-router';

export function Header() {



  return (
    <header className='bg-main-red'>
      <NavLink to="/">
        <img src={logo} alt="gratissimo logo" className='h-24'/>
      </NavLink>
      <NavBar />
    </header>
  )
}