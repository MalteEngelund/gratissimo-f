import { useEffect, useState } from 'react'
import backIcon from '../../assets/icons/icons8-back-60.png'
import forwardsIcon from '../../assets/icons/icons8-forward-60.png'
import { TestimonyCard } from '../TestimonyCard/TestimonyCard'

export function Caroussel({ data }) {

  const [itemIndex, setItemIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      nextItem()
    }, 5000)
    return () => clearInterval(interval)
  })

  function nextItem() {
    setItemIndex((prevIndex) => (prevIndex + 1) % data.length)
  }

  function prevItem() {
    setItemIndex((prevIndex) => (prevIndex - 1) % data.length)
  }

  return (
    <div className='relative w-full h-60 flex items-center justify-center'>
      <div className='w-[80%]'>
      <TestimonyCard testimoniesData={data[itemIndex]} />
      </div>
      <button onClick={prevItem} className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 cursor-pointer w-10 h-10">
        <img src={backIcon} alt='back' />
      </button>
      <button onClick={nextItem} className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 cursor-pointer w-10 h-10">
        <img src={forwardsIcon} alt="Forwards" />
      </button>
    </div>
    
  )
}