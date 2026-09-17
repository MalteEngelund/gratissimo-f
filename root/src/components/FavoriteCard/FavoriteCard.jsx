import { useContext, useState } from 'react';
import { Modal } from '../Modal/Modal';
import { SectionTitle } from '../SectionTitle/SectionTitle';
import { NavLink } from 'react-router';
import { AuthContext } from '../../context/AuthContext';

export function FavoriteCard({ jobData, favoriteId }) {

const [ isModalOpen, setIsModalOpen ] = useState(false)
const [ removeFavoriteResponse, setRemoveFavoriteResponse ] = useState('')
const { authToken } = useContext(AuthContext)


  const handleRemoveFavorite = async () => {
    try {
      const response = await fetch(import.meta.env.VITE_PUBLIC_BASE_URL + '/api/favorites/' + favoriteId, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken.accessToken}`,
        },
        body: JSON.stringify({
          userId: authToken.user.id,
          jobListingId: jobData.id,
        }),
      });
      const responseData = await response.json();
      if (response.ok) {
        console.log('removed!', responseData)
        setRemoveFavoriteResponse('Fjernet favorit!')
      }
      if (!response.ok) {
        console.error('Failed to remove favorite:', responseData)
      }
    }
    catch (error) {
      console.error('Error:', error)
    }
  }

  console.log('favoriteId:', favoriteId)

  return (
    <div className='flex flex-col md:flex-row justify-between w-full shadow-lg p-4 gap-4 rounded-2xl border border-border-gray'>
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
          <button className='bg-dark-red text-text-white px-4 py-2 rounded-2xl cursor-pointer border border-border-gray' onClick={handleRemoveFavorite} >Fjern</button>
          {/* <NavLink to={`/job/${jobData.id}`}>Åben</NavLink> */}
          <button className='bg-light-red px-4 py-2 rounded-2xl cursor-pointer border border-border-gray' onClick={() => setIsModalOpen(true)}>Åben</button>
        </div>
        <p>{removeFavoriteResponse}</p>
      </div>
      {isModalOpen && <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} >
         
         <div className='flex flex-row gap-8 justify-between p-4'>
          <div className='flex flex-col gap-4'>
            <p className='text-border-gray'>{jobData.organization}</p>
            <SectionTitle text={jobData.title} />
            <h3 className='font-semibold'>Beskrivelse</h3>
            <h4>{jobData.description}</h4>
            
          </div>
          <div className='flex flex-col gap-8 justify-between'>
            <ul>
              <li className='flex flex-row gap-4 justify-between'><span>Lokation:</span><span>{jobData.region.name}</span></li>
              <li className='flex flex-row gap-4 justify-between'><span>Indrykket:</span><span>{jobData.createdAt}</span></li>
              <li className='flex flex-row gap-4 justify-between'><span>Arbejdstid:</span><span>{jobData.workType.type}</span></li>
              <li className='flex flex-row gap-4 justify-between'><span>Hjemmearbejde:</span><span>{jobData.workHome}</span></li>
            </ul>
            <ul>
              <li><h3 className='font-semibold'>Kontakt</h3></li>
              <li>{jobData.organization}</li>
              <li className='flex flex-row justify-between gap-4'><span>Adresse:</span><span>{jobData.address}</span></li>
              <li className='flex flex-row gap-2 justify-end'><span>{jobData.zipcode}</span><span>{jobData.city}</span></li>
            </ul>
            <div className='flex flex-row gap-4 justify-between'>
              <button className='bg-dark-red text-text-white cursor-pointer rounded-2xl px-4 py-2' onClick={handleRemoveFavorite} >Fjern</button>
              <button className='bg-light-red cursor-pointer rounded-2xl px-4 py-2' onClick={() => setIsModalOpen(false)}>Luk</button>
            </div>
          </div>
         </div>
        </Modal>} 
    </div>
  )
}