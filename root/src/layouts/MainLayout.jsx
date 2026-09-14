import { Outlet } from 'react-router';
import { Header } from '../components/Header/Header';
import { Footer } from '../components/Footer/Footer';

export function MainLayout() {



  return (
    <div className='flex flex-col font-main-font min-h-screen'>
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}