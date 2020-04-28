import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'

import client from "../graphql";
import { gql } from "apollo-boost";

const GET_IMAGE_BY_ID = gql`
query imagesById($id: MongoID!) {
  imagesById(_id: $id) {
    img
  }
}
`

const Editor = dynamic(
  () => import('./editor'),
  { ssr: false }
)

export default function Image() {
  const router = useRouter()
  const { id }  = router.query

  const [state, setState] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  const fetchData = async () => {
    setIsLoading(true)
    const res = await client.query({
      query: GET_IMAGE_BY_ID,
      variables: {
        id: id
      }

    }) 
    setState(await res.data.imagesById)
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
