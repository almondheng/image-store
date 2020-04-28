import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Editor = dynamic(
  () => import('./editor'),
  { ssr: false }
)

export default function Image() {
  const router = useRouter()
  const { id } = router.query

  const [state, setState] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  const fetchData = async () => {
    setIsLoading(true)
    const res = await fetch(`http://localhost:3030/img/${id}`)
    const { data } = await res.json()
    setState(data)
    setIsLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  // delete almond
  const dealmond = async () => {
    await fetch(`http://localhost:3030/img/${id}`, { method: 'delete' })
    router.replace('/list')
  }

  return (
    <div className="container">

      { isLoading ? <div>Loading ...</div> : <Editor data={state} /> }

      <button onClick={dealmond}>Delete</button>

    </div>
  )
}
