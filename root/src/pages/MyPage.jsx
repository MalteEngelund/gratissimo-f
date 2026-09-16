import { useContext, useState } from 'react';
import { SectionContainerRed } from '../components/SectionContainerRed/SectionContainerRed';
import { SectionTitle } from '../components/SectionTitle/SectionTitle';
import { AuthContext } from '../context/AuthContext';
import { NavLink } from 'react-router';
import { SectionContainer } from '../components/SectionContainer/SectionContainer';
import { useFetch } from '../hooks/useFetch';
import { JobCard } from '../components/JobCard/JobCard';
import { EditJobList } from '../components/EditJobList/EditJobList';

export function MyPage() {

  const { authToken, logout } = useContext(AuthContext)
  const userId = authToken?.user.id
  
  const [ activeTab, setActiveTab ] = useState('Mine annoncer')

  const { data: jobData } = useFetch(import.meta.env.VITE_PUBLIC_BASE_URL + '/api/job-listings')
  console.log('jobData: ', jobData)
  
  const userJobs = jobData ? jobData.filter(job => job.userId === userId) : []
  console.log('userJobs: ', userJobs)
  return (
    <>
      <SectionContainerRed>
        <div className='flex flex-col gap-4 text-center'>
          <SectionTitle text={`Velkommen ${authToken.user.firstname}`} />
          <p>Rediger eller slet dine annoncer. Du kan også danne dig et overblik over de annoncer du har gemt som favorit, samt fjerne dem igen</p>
          <div className='flex flex-row gap-4 justify-end'>
            <NavLink to='/' className='text-main-red hover:text-main-red-hover' onClick={logout}>Log ud</NavLink>
            <NavLink to='' className='text-main-red hover:text-main-red-hover' >Redigér profil</NavLink>
          </div>
        </div>
      </SectionContainerRed>
      <SectionContainer>
        
        <div className="flex flex-row w-[80vw]" >
        <button
          className={`p-2 cursor-pointer rounded-l-2xl w-100 ${activeTab === 'Mine annoncer' ? 'bg-dark-red text-text-white w-full' : 'bg-light-red text-black w-full'}`}
          onClick={() => setActiveTab('Mine annoncer')}>Mine annoncer
        </button>
        <button
          className={`w-full p-2 cursor-pointer rounded-r-2xl ${activeTab === 'Mine favoritter' ? 'bg-dark-red text-text-white w-full' : 'bg-light-red text-black w-full'}`}
          onClick={() => setActiveTab('Mine favoritter')}>Mine favoritter
        </button>
      </div>

        {activeTab === 'Mine annoncer' && (
          <SectionContainer>
            <div className='flex flex-col gap-4'>
              {userJobs?.map((job) => 
                <EditJobList jobData={job} key={job.id} />
              )}
            </div>
          </SectionContainer>
        )}
        {activeTab === 'Mine favoritter' &&(
          <>

          </>
        )}
      </SectionContainer>
    </>
  )
}