import { useParams } from 'react-router'
import { useFetch } from '../hooks/useFetch'
import { SectionContainer } from '../components/SectionContainer/SectionContainer'
import { SectionContainerRed } from '../components/SectionContainerRed/SectionContainerRed'
import { SearchSection } from '../components/SearchSection/SearchSection'
import { useState } from 'react'
import { JobCard } from '../components/JobCard/JobCard'
import { SectionTitle } from '../components/SectionTitle/SectionTitle'
import { JobCategories } from '../components/JobCategories/JobCategories'

export function CategoryPage() {

  const { id } = useParams()

  const { data: jobListingsData, isLoading: isJobListingsLoading, error: jobListingsError } = useFetch(import.meta.env.VITE_PUBLIC_BASE_URL + `/api/job-categories/${id}`)
  console.log('jobListingsData:', jobListingsData)

  const { data: categoryData, isLoading: categoryIsLoading, error: categoryError } = useFetch(import.meta.env.VITE_PUBLIC_BASE_URL + '/api/job-categories')
  console.log('categoryData:', categoryData)
  const { data: allJobListingsData, isLoading: allJoblistingsLoading, error: allJobListingsError } = useFetch(import.meta.env.VITE_PUBLIC_BASE_URL + '/api/job-listings')
  console.log('allJobListingsData:', allJobListingsData)

  const [ search, setSearch ] = useState('')
  const [ isModalOpen, setIsModalOpen ] = useState(false)

  const filteredJobs = jobListingsData?.jobListings.filter((job) => job.title.toLowerCase().includes(search.toLowerCase())) && jobListingsData?.jobListings.filter((job) => job.description.toLowerCase().includes(search.toLowerCase()))


  return (
    <>
    <SectionContainerRed>
      <SearchSection onChange={(e) => setSearch(e.target.value)}  />
    </SectionContainerRed>
    
    <SectionContainer>
        {categoryIsLoading && <p>Loading...</p>}
        {categoryError && <p>Error: {categoryError.message}</p>}
        <JobCategories categoryData={categoryData} jobListingsData={allJobListingsData} />
    </SectionContainer>

    <SectionContainer>
      
      <SectionTitle text={`Kategori: ${jobListingsData?.name}`} />
      {isJobListingsLoading && <p>Loading...</p>}
      {jobListingsError && <p>Error: {jobListingsError.message}</p>}
      <div className='flex flex-col gap-4 '>
        {filteredJobs?.map((job) => 
        <JobCard jobData={job} key={job.id} setIsModalOpen={setIsModalOpen} />
        )}
      </div>
    </SectionContainer>
    </>
  )
}