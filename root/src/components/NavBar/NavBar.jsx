import { useContext } from 'react';
import { NavLink } from 'react-router';
import { AuthContext } from '../../context/AuthContext';

export function NavBar() {

 const { authToken, logout } = useContext(AuthContext)

  return (
    <nav className='flex flex-col gap-4 md:flex-row justify-between bg-dark-red text-gray-200 px-8 py-2'>
      <ul className='flex flex-col md:flex-row gap-4 '>
        <li><NavLink to="/alle-jobs" className={({ isActive }) => (isActive ? "text-text-white" : "")}>Alle Jobs</NavLink></li>
        <li><NavLink to="/opret-annonce" className={({ isActive }) => (isActive ? "text-text-white" : "")}>Opret Annonce</NavLink></li>
        <li><NavLink to="/nyheder" className={({ isActive }) => (isActive ? "text-text-white" : "")}>Nyheder</NavLink></li>
      </ul>
      {!authToken ? (
      <ul className='flex flex-col md:flex-row gap-4'>
        <li><NavLink to="/opret-bruger" className='text-text-white'>Opret Profil</NavLink></li>
        <li><NavLink to="/login" className='text-text-white'>Login</NavLink></li>
      </ul>
      ) : (
      <ul className='flex flex-col md:flex-row gap-4'>
        <li><NavLink to="/min-side" className={({ isActive }) => (isActive ? "text-text-white" : "")}>Min Profil</NavLink></li>
        <li><NavLink to="" onClick={logout} className={({ isActive }) => (isActive ? "text-text-white" : "")}>Log ud</NavLink></li>
      </ul>
      )
      }
    </nav>
  )
}