import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'

import client from "../graphql";
import { gql } from "apollo-boost";

const GET_IMAGE_BY_ID = gql`
query getImageById($id: MongoID!) {
  imagesById(_id: $id) {
    _id
    img
  }
}
`

const REMOVE_IMAGE_BY_ID = gql`
mutation removeImageById($id: MongoID!) {
  imageDeleteById(_id: $id) {
    recordId
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
    await client.mutate({
      mutation: REMOVE_IMAGE_BY_ID,
      variables: {
        id: id
      }
    })
    router.push('/list')
  }

  return (
    <div className="container">

      { isLoading ? <div>Loading ...</div> : <Editor data={state} /> }

      <button onClick={dealmond}>Delete</button>

    </div>
  )
}
