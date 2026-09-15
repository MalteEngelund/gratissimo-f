export function TestimonyCard({ testimoniesData }) {



  return (
    <div className='flex flex-col gap-8 text-center'>
      <h2 className='text-main-red text-2xl'>{testimoniesData.title}</h2>
      <article>{testimoniesData.content}</article>
      <h4>{testimoniesData.name}</h4>
    </div>
  )
}