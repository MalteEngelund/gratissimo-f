import { NavLink } from 'react-router';
import { SectionContainerRed } from '../components/SectionContainerRed/SectionContainerRed';
import { SectionTitle } from '../components/SectionTitle/SectionTitle';

export function PageNotFound() {



  return (
    <SectionContainerRed>
      <div className='flex flex-col gap-4 items-center justify-center'>
        <SectionTitle text='Siden blev ikke fundet' />
        <NavLink to='/' className='text-main-red hover:text-main-red-hover'>Smut tilbage til forsiden!</NavLink>
      </div>
    </SectionContainerRed>
  )
}