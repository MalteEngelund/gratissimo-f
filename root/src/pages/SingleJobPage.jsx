import { useParams } from 'react-router'
import { useFetch } from '../hooks/useFetch'

export function SingleJobPage() {

  const { id } = useParams()

  const { data } = useFetch(import.meta.env.VITE_PUBLIC_BASE_URL + `/api/job-listings/${id}`)
  console.log('data: ', data)
  return (
    <>
    hello
    </>
  )
}