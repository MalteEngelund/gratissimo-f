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

export function HomePage() {

  const { data: categoryData, isLoading, error } = useFetch(import.meta.env.VITE_PUBLIC_BASE_URL + '/api/job-categories')
  console.log('categoryData:', categoryData)

  const { data: jobListingsData, isLoading: joblistingsLoading, error: jobListingsError } = useFetch(import.meta.env.VITE_PUBLIC_BASE_URL + '/api/job-listings')
  console.log('jobListingsData:', jobListingsData)

  const { data: newsData } = useFetch(import.meta.env.VITE_PUBLIC_BASE_URL + '/api/articles')
  console.log('newsData: ', newsData)

  const { data: testimoniesData } = useFetch(import.meta.env.VITE_PUBLIC_BASE_URL + '/api/testimony')
  console.log('testimoniesData: ', testimoniesData)

  const [ search, setSearch ] = useState('')
  // let [ searchParams, setSearchParams ] = useSearchParams()

  /* useEffect(() => {
      const searchQuery = searchParams.get('search') || ''
      setSearch(searchQuery)
    }, [searchParams]) */

  // const randomArticle = newsData ? newsData[Math.floor(math.random() * newsData.length)] : null

  const randomArticles = newsData ? newsData.sort(() => 0.5 - Math.random()).slice(0, 3) : null

  return (
    <div className='flex flex-col gap-4'>
      <SectionContainerRed>
          <SearchSection onChange={(e) => setSearch(e.target.value)}  />
        </SectionContainerRed>
      <SectionContainer>
        <JobCategories categoryData={categoryData} jobListingsData={jobListingsData} />
      </SectionContainer>

      <SectionContainerRed>
        <SectionTitle text='Udvalgte Nyheder' />
        <div className='grid grid-cols-3 gap-8'>
          {randomArticles?.map((article) =>
            <NavLink to={`/nyheder/${article.id}`}>
              <NewsCard newsData={article} />
            </NavLink>
          )}
          {/* <NewsCard newsData={newsData} /> */}
        </div>
      </SectionContainerRed>

      <SectionContainer>
        {testimoniesData &&
        <Caroussel data={testimoniesData} />
        }
        </SectionContainer>
    </div>
  )
}