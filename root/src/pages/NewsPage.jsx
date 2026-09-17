import { NavLink, useParams } from 'react-router'
import { useFetch } from '../hooks/useFetch'
import { NewsCard } from '../components/NewsCard/NewsCard'
import { SectionContainerRed } from '../components/SectionContainerRed/SectionContainerRed'
import { useDanishDate } from '../hooks/useDate'

export function NewsPage() {

  const { id } = useParams()

  const { data: newsArticleData } = useFetch(import.meta.env.VITE_PUBLIC_BASE_URL + `/api/articles/${id}`)
  console.log('newsArticleData: ', newsArticleData)

  const { data: allArticlesData } = useFetch(import.meta.env.VITE_PUBLIC_BASE_URL + `/api/articles/`)


  return (
    <>
      {newsArticleData && 
        <div className='flex flex-col gap-8 overflow-hidden'>
          <img src={import.meta.env.VITE_PUBLIC_BASE_URL + `${newsArticleData.imageUrl}`} alt={newsArticleData.title} className='h-80 object-cover' />
          <article className='flex flex-col gap-4 p-4 pb-8 w-[80%] mx-auto'>
            <h1 className='text-2xl'>{newsArticleData.title}</h1>
            <div className='text-main-red'><span>d. {useDanishDate(newsArticleData.createdAt)}</span><span> af {newsArticleData.author}</span></div>
            <p>{newsArticleData.content}</p>
          </article>
        </div>
      }
      <SectionContainerRed>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {allArticlesData?.map((article) =>
          <NavLink to={`/nyheder/${article.id}`}>
            <NewsCard newsData={article} />
          </NavLink>
          )}
        </div>
      </SectionContainerRed>

    </>
  )
}