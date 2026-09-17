import { useContext } from 'react';
import { NavLink } from 'react-router';
import { AuthContext } from '../../context/AuthContext';

export function NavBar() {

 const { authToken, logout } = useContext(AuthContext)

  return (
    <nav className='flex flex-col gap-4 md:flex-row justify-between bg-dark-red text-text-white px-8 py-2'>
      <ul className='flex flex-col md:flex-row gap-4 '>
        <li><NavLink to="/alle-jobs">Alle Jobs</NavLink></li>
        <li><NavLink to="/opret-annonce">Opret Annonce</NavLink></li>
        <li><NavLink to="/nyheder">Nyheder</NavLink></li>
      </ul>
      {!authToken ? (
      <ul className='flex flex-col md:flex-row gap-4'>
        <li><NavLink to="/opret-bruger">Opret Profil</NavLink></li>
        <li><NavLink to="/login">Login</NavLink></li>
      </ul>
      ) : (
      <ul className='flex flex-col md:flex-row gap-4'>
        <li><NavLink to="/min-side">Min Profil</NavLink></li>
        <li><NavLink to="" onClick={logout}>Log ud</NavLink></li>
      </ul>
      )
      }
    </nav>
  )
}