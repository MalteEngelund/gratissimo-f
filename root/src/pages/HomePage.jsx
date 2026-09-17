import { NavLink, useSearchParams } from 'react-router'
import { Caroussel } from '../components/Caroussel/Caroussel'
import { JobCategories } from '../components/JobCategories/JobCategories'
import { LoginBanner } from '../components/LoginBanner/LoginBanner'
import { NewsCard } from '../components/NewsCard/NewsCard'
import { SearchSection } from '../components/SearchSection/SearchSection'
import { SectionContainer } from '../components/SectionContainer/SectionContainer'
import { SectionContainerRed } from '../components/SectionContainerRed/SectionContainerRed'
import { SectionTitle } from '../components/SectionTitle/SectionTitle'
import { TestimonyCard } from '../components/TestimonyCard/TestimonyCard'
import { useFetch } from '../hooks/useFetch'
import { useEffect, useState } from 'react'
import { Button } from '../components/Button/Button'

export function HomePage() {

  const { data: categoryData, isLoading: categoryIsLoading, error: categoryError } = useFetch(import.meta.env.VITE_PUBLIC_BASE_URL + '/api/job-categories')
  console.log('categoryData:', categoryData)

  const { data: jobListingsData, isLoading: joblistingsLoading, error: jobListingsError } = useFetch(import.meta.env.VITE_PUBLIC_BASE_URL + '/api/job-listings')
  console.log('jobListingsData:', jobListingsData)

  const { data: newsData, isLoading: newsIsLoading, error: newsError } = useFetch(import.meta.env.VITE_PUBLIC_BASE_URL + '/api/articles')
  console.log('newsData: ', newsData)

  const { data: testimoniesData, isLoading: testimoniesIsLoading, error: testimoniesError } = useFetch(import.meta.env.VITE_PUBLIC_BASE_URL + '/api/testimony')
  console.log('testimoniesData: ', testimoniesData)

  const [ search, setSearch ] = useState('')
  const [ searchParams, setSearchParams ] = useSearchParams('search=' + search)

   /* useEffect(() => {
      const searchQuery = searchParams.get('search') || ''
      setSearch(searchQuery)
    }, [searchParams])  */

    

  // const randomArticle = newsData ? newsData[Math.floor(math.random() * newsData.length)] : null

  

  const randomArticles = newsData ? newsData.sort(() => 0.5 - Math.random()).slice(0, 3) : null

  return (
    <div className='flex flex-col gap-4'>
      <SectionContainerRed>
          {/* <SearchSection onChange={(e) => setSearch(e.target.value)} onClick={() => setSearchParams('search=' + search)}  /> */}
          <NavLink to='alle-jobs' className='flex flex-col items-center'>
            <Button text='Søg efter et frivilligt job ved at klikke her!' />
          </NavLink>
        </SectionContainerRed>
      <SectionContainer>
        {categoryIsLoading && <p>Loading...</p>}
        {categoryError && <p>Error: {categoryError.message}</p>}
        <JobCategories categoryData={categoryData} jobListingsData={jobListingsData} />
      </SectionContainer>

      <SectionContainerRed>
        <SectionTitle text='Udvalgte Nyheder' />
        {newsIsLoading && <p>Loading...</p>}
        {newsError && <p>Error: {newsError.message}</p>}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {randomArticles?.map((article) =>
            <NavLink to={`/nyheder/${article.id}`}>
              <NewsCard newsData={article} />
            </NavLink>
          )}
          {/* <NewsCard newsData={newsData} /> */}
        </div>
      </SectionContainerRed>

      <SectionContainer>
        {testimoniesIsLoading && <p>Loading...</p>}
        {testimoniesError && <p>Error: {testimoniesError.message}</p>}
        {testimoniesData &&
        <Caroussel data={testimoniesData} />
        }
        </SectionContainer>
    </div>
  )
}