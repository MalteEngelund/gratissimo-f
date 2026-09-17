import searchIcon from '../../assets/icons/icons8-search-100.png'

export function SearchSection({ onChange, onClick, search }) {


  return (

    <section className='flex flex-col gap-4'>
      <h2 className='text-2xl'>Søg friviligt arbejde:</h2>
      <div className='flex flex-row w-full rounded-2xl bg-white items-center'>
        <div className='flex flex-row gap-4 items-center w-full pl-4'>
          <img src={searchIcon} alt="search" className='w-6 h-6' />
          <input type='search' className='w-full bg-white py-2 focus:outline-none' placeholder='eks. cafémedhjælper...' onChange={onChange} value={search}   />
        </div>
        <button className='bg-main-red text-text-white px-4 py-2 rounded-r-2xl cursor-pointer' onClick={onClick}>Søg</button></div>
    </section>
  )
}