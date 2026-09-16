import { SectionTitle } from '../SectionTitle/SectionTitle';

export function JobCard({ jobData }) {



  return (
    <div className='flex flex-row justify-between w-full shadow-lg p-4 rounded-2xl border border-border-gray'>
      <div className='flex flex-col gap-4'>
        <p className='text-border-gray'>{jobData.organization}</p>
        <h2 className='text-2xl'>{jobData.title}</h2>
        <p>{jobData.description}</p>
      </div>
      <div className='flex flex-col gap-4 justify-between'>
        <div className='flex flex-col gap-4'>
          <p>{jobData.region.name}</p>
          <p>{jobData.createdAt}</p>
        </div>
        <div className='flex flex-row gap-4 justify-between'>
          <button className='bg-light-red px-4 py-2 rounded-2xl cursor-pointer'>Gem</button>
          <button className='bg-light-red px-4 py-2 rounded-2xl cursor-pointer'>Åben</button>
        </div>
      </div>
    </div>
  )
}