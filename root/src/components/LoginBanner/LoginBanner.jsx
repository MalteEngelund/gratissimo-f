import { NavLink } from 'react-router';
import { Button } from '../Button/Button';
import { SectionTitle } from '../SectionTitle/SectionTitle';

export function LoginBanner() {


  return(
    <div className='flex flex-row gap-4 justify-between items-center w-full'>
      <SectionTitle text='Vi hjælper dig på vej til dit næste frivillige job' />
      <NavLink to="/login">
        <Button text='Login eller opret dig' />
      </NavLink>
    </div>
  )
}