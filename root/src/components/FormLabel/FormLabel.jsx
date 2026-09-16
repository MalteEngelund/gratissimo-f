export function FormLabel({ name, text }) {


  return (
    <label htmlFor={name}>
      {text}
    </label>
  )
}