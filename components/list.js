import { useEffect, useState } from 'react'
import Link from 'next/link'
import { gql } from "apollo-boost";
import client from "../graphql";


export default function ImageList() {
  const [state, setState] = useState({ images: [] })

  const fetchData = async () => {
    const res = await client.query({
      query: gql`
      {
        images {
          _id
          img
        }
      }
      `
    })

    setState(await res.data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="container">

    {
      state.images.map(value => (
        <Link href="/img/[id]" as={ "/img/" + value._id }>
          <div key={value._id} id={value._id}
            dangerouslySetInnerHTML={ { __html: value.img } } />
        </Link>
      ))
    }

    <style jsx>{`
      .container {
        display: grid;
        grid-template-columns: repeat(3, 400px);
        grid-gap: 20px;
        justify-content: center;
        transition: transform .3s;
      }

      .container > div {
        border: 1px solid red;
        height: 400px;
        width: 400px;
        overflow: hidden;
      }

      .container > div:hover {
        border: 1px solid green;
        height: 450px;
        width: 450px;
        cursor: pointer;
      }
    `}</style>

    <style jsx global>{`
      figure {
        margin: 0;  // remove browser default figure
      }

      .container > div img {
        height: 100%;
        max-width: 100%;
      }
    `}</style>
    </div>
  )
}
