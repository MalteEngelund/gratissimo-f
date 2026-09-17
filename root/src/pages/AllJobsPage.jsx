import { useContext, useEffect, useState } from 'react'
import { useFetch } from '../hooks/useFetch'
import { SearchSection } from '../components/SearchSection/SearchSection'
import searchIcon from '../assets/icons/icons8-search-100.png'
import { SectionContainerRed } from '../components/SectionContainerRed/SectionContainerRed'
import { useSearchParams } from 'react-router'
import { JobCard } from '../components/JobCard/JobCard'
import { SectionContainer } from '../components/SectionContainer/SectionContainer'
import { Modal } from '../components/Modal/Modal'
import { useFetchV2 } from '../hooks/useFetchV2'
import { AuthContext } from '../context/AuthContext'

export function AllJobsPage() {

  const { data: jobListingsData, isLoading: isJobListingsLoading, error: jobListingsError } = useFetch(import.meta.env.VITE_PUBLIC_BASE_URL + '/api/job-listings')
  console.log('jobListingsData: ', jobListingsData)

  const { authToken } = useContext(AuthContext)

  if (authToken) {
    const { data: favoriteData } = useFetchV2(import.meta.env.VITE_PUBLIC_BASE_URL + '/api/favorites/', authToken.accessToken)
    console.log('favoriteData:', favoriteData)
  }

  const [ search, setSearch ] = useState('')
  const [ isModalOpen, setIsModalOpen ] = useState(false)
  const [ searchParams, setSearchParams ] = useSearchParams()

  /* 
  useEffect(() => {
    const searchQuery = searchParams.get('search') || ''
    setSearch(searchQuery)
  }, [searchParams]) */

  const filteredJobs = jobListingsData?.filter((job) => job.title.toLowerCase().includes(search.toLowerCase())) && jobListingsData?.filter((job) => job.description.toLowerCase().includes(search.toLowerCase()))
  

  return (
    <>
      {/* <SectionContainerRed>
          <h2 className='text-2xl'>Søg friviligt arbejde:</h2>
          <div className='flex flex-row w-full rounded-2xl bg-white items-center'>
          <div className='flex flex-row gap-4 items-center w-full pl-4'>
          <img src={searchIcon} alt="search" className='w-6 h-6'  />
          <input type='search' className='w-full bg-white py-2' placeholder='eks. cafémedhjælper...' onChange={(e) => setSearch(e.target.value)} />
          </div>
          <button className='bg-main-red text-text-white px-4 py-2 rounded-r-2xl'>Søg</button></div>
        </SectionContainerRed> */}
        <SectionContainerRed>
          <SearchSection onChange={(e) => setSearch(e.target.value)}  />
        </SectionContainerRed>
      <SectionContainer>
        {isJobListingsLoading && <p>Loading...</p>}
        {jobListingsError && <p>Error: {jobListingsError.message}</p>}
        <div className='flex flex-col gap-4 '>
        {filteredJobs?.map((job) => 
          <JobCard jobData={job} key={job.id} setIsModalOpen={setIsModalOpen} />
        )}
        </div>
        {/* {isModalOpen && 
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} >
            
            
          </Modal>
        } */}
      </SectionContainer>
    </>
  )
}