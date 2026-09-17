import { useContext, useEffect, useState } from 'react';
import { SectionContainerRed } from '../components/SectionContainerRed/SectionContainerRed';
import { SectionTitle } from '../components/SectionTitle/SectionTitle';
import { AuthContext } from '../context/AuthContext';
import { NavLink } from 'react-router';
import { SectionContainer } from '../components/SectionContainer/SectionContainer';
import { useFetch } from '../hooks/useFetch';
import { JobCard } from '../components/JobCard/JobCard';
import { EditJobList } from '../components/EditJobList/EditJobList';
import { useFetchV2 } from '../hooks/useFetchV2';
import { FavoriteCard } from '../components/FavoriteCard/FavoriteCard';

export function MyPage() {

  const { authToken, logout } = useContext(AuthContext)
  const userId = authToken?.user.id
  
  const [ activeTab, setActiveTab ] = useState('Mine annoncer')

  const { data: jobData } = useFetch(import.meta.env.VITE_PUBLIC_BASE_URL + '/api/job-listings')
  console.log('jobData: ', jobData)

  /* const { data: favoriteData } = useFetch(import.meta.env.VITE_PUBLIC_BASE_URL + `/api/favorites/`)
  console.log('favoriteData: ', favoriteData) */
  
  
  const { data: favoriteData } = useFetchV2(import.meta.env.VITE_PUBLIC_BASE_URL + `/api/favorites/`, authToken.accessToken)
  console.log('favoriteData: ', favoriteData)




  

  
  const userJobs = jobData ? jobData.filter(job => job.userId === userId) : []
  console.log('userJobs: ', userJobs)

  const noJobs = userJobs.length === 0


  /* const handleDelete = async (jobId) => {
      const isConfirmed = window.confirm('Are you sure you want to cancel job?')
      if (!isConfirmed) {
        return
      }
      try {
        const response = await fetch(import.meta.env.VITE_PUBLIC_BASE_URL + `/api/job-listings/${jobId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken.accessToken}`
          },
          // body: JSON.stringify({
          //   userId: authToken.user.id
          // })
          
        })
        if (!response.ok) {
          throw new Error('Failed to cancel job')
        } else {
          console.log('job cancelled successfully')
        }
      } catch (error) {
        console.error('Error deleting job:', error)
      }

    } */

  return (
    <>
      <SectionContainerRed>
        <div className='flex flex-col gap-4 text-center'>
          <SectionTitle text={`Velkommen ${authToken.user.firstname}`} />
          <p>Rediger eller slet dine annoncer. Du kan også danne dig et overblik over de annoncer du har gemt som favorit, samt fjerne dem igen</p>
          <div className='flex flex-row gap-4 justify-end'>
            <NavLink to='/' className='text-main-red hover:text-main-red-hover' onClick={logout}>Log ud</NavLink>
            <NavLink to='/rediger-profil' className='text-main-red hover:text-main-red-hover' >Redigér profil</NavLink>
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
            {noJobs && (
              <p>Du har ingen annoncer</p>
            )}
            <div className='flex flex-col gap-4'>
              {userJobs?.map((job) => 
                <EditJobList jobData={job} key={job.id}  />
              )}
            </div>
          </SectionContainer>
        )}
        {activeTab === 'Mine favoritter' &&(
          <>
            <SectionContainer>
              <div className='flex flex-col gap-4'>
                {favoriteData?.map((favorite) => (
                  <FavoriteCard jobData={favorite.jobListing} key={favorite.id} favoriteId={favorite.id} />
                ))}
              </div>
            </SectionContainer>
          </>
        )}
      </SectionContainer>
    </>
  )
}