import { NavLink } from 'react-router';

export function NavBar() {



  return (
    <nav className='flex flex-row justify-between bg-dark-red text-text-white px-8 py-2'>
      <ul className='flex flex-row gap-4'>
        <li><NavLink to="/alle-jobs">Alle Jobs</NavLink></li>
        <li><NavLink to="/opret-annonce">Opret Annonce</NavLink></li>
        <li><NavLink to="/nyheder">Nyheder</NavLink></li>
      </ul>
      <ul className='flex flex-row gap-4'>
        <li><NavLink to="/opret-bruger">Opret Profil</NavLink></li>
        <li><NavLink to="/login">Login</NavLink></li>
      </ul>
    </nav>
  )
}