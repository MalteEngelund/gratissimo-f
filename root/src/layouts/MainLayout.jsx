import { Outlet } from 'react-router';
import { Header } from '../components/Header/Header';
import { Footer } from '../components/Footer/Footer';
import { SectionContainer } from '../components/SectionContainer/SectionContainer';
import { LoginBanner } from '../components/LoginBanner/LoginBanner';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export function MainLayout() {

  const { authToken } = useContext(AuthContext)

  return (
    <div className='flex flex-col font-main-font min-h-screen '>
      <Header />
        {/* check efter authToken her! conditional render v */}
        {!authToken &&
          <SectionContainer>
            <LoginBanner />
          </SectionContainer>
        }
      <div className='flex flex-col '>
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}