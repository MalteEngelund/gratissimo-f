import { NavLink } from 'react-router'
import { SectionTitle } from '../SectionTitle/SectionTitle'

export function JobCategories({ categoryData, jobListingsData }) {


  
  const jobCountPerCategory = categoryData?.map((category) => {
    const jobCount = jobListingsData?.filter((job) => job.jobCategory.id === category.id).length
    return { categoryId: category.id, jobCount}
  })

  return (
    <div className='w-full'>
      <SectionTitle text='Find job ved kategori' />
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 w-full'>
        {categoryData?.map((category) =>
          <NavLink key={category.id} to={`/job-kategori/${category.id}`} className=''>
            <div className='flex flex-row justify-between items-center border border-border-gray rounded w-full'>
              <h3 className='text-center px-4 w-full'>{category.name}</h3>
              <span className='bg-light-red px-4 py-2 rounded-r'>{jobCountPerCategory?.find((item) => item.categoryId === category.id)?.jobCount}</span>
            </div>
          </NavLink>
        )}
      </div>
    </div>
  )
}