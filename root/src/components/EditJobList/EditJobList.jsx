import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { SectionTitle } from '../SectionTitle/SectionTitle';

export function EditJobList({ jobData }) {


  const { authToken } = useContext(AuthContext)
  const [ deleteResponse, setDeleteResponse ] = useState('')

  const handleDelete = async (e) => {
      e.preventDefault()
      const isConfirmed = window.confirm('Er du sikker på at du vil slette denne annonce?')
      if (!isConfirmed) {
        return
      }
      try {
        const response = await fetch(import.meta.env.VITE_PUBLIC_BASE_URL + '/api/job-listings/' + jobData.id, {
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
          throw new Error('Failed to delete job')
        } else {
          console.log('job deleted successfully')
          setDeleteResponse('Annoncen er nu slettet!')
        }
      } catch (error) {
        console.error('Error deleting job:', error)
      }
    }

  return (
    <div className='flex flex-col md:flex-row justify-between gap-4 w-full shadow-lg p-4 rounded-2xl border border-border-gray'>
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
        <div className='flex flex-col gap-4'>
          <div className='flex flex-row gap-4 justify-between'>
            <button className='bg-dark-red text-text-white px-4 py-2 rounded-2xl cursor-pointer border border-border-gray' onClick={handleDelete}>Slet</button>
            <button className='bg-light-red px-4 py-2 rounded-2xl cursor-pointer border border-border-gray'>Rediger</button>
          </div>
          <p className='text-green-500'>{deleteResponse}</p>
        </div>
      </div>
    </div>
  )
}