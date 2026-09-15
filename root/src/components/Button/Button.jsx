export function Button({ type, text }) {


  return (
    <button type={type} className='bg-main-red hover:bg-main-red-hover rounded-xl px-4 py-2 cursor-pointer text-text-white'>{text}</button>
  )
}