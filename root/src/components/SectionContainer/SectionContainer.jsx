

export function SectionContainer({ children }) {


  return (

    <section className='flex flex-col gap-4 px-4 py-12 w-full'>
      <div className='max-w[80%] mx-auto'>
        {children}
      </div>
    </section>
  )
}