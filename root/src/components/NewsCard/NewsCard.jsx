import { useDanishDate } from '../../hooks/useDate';

export function NewsCard({ newsData }) {


  
  

  return(
    <div className='flex flex-col gap-4 rounded-2xl object-fit overflow-hidden bg-white shadow-lg'>
      <img src={import.meta.env.VITE_PUBLIC_BASE_URL + `${newsData.imageUrl}` } alt={import.meta.env.VITE_PUBLIC_BASE_URL + `${newsData.title}`} className='' />
      <div className='flex flex-col gap-2 p-4'>
        <div className='text-main-red '><span>d. {useDanishDate(newsData.createdAt)} - </span><span>{newsData.author}</span></div>
        <h3>{newsData.title}</h3>
      </div>
    </div>
  )
}