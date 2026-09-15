export function SectionContainerRed({ children}) {



  return (
    <section className='flex flex-col gap-4 px-4 py-12 w-full bg-light-red'>
      <div className='w-[80%] mx-auto'>
        {children}
      </div>
    </section>
  )
}