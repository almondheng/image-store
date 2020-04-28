import React, { useEffect, useState } from 'react'

export default function Image() {
  const [state, setState] = useState({ data: [] })

  const fetchData = async () => {
    const res = await fetch("http://localhost:3030/img")
    setState(await res.json())
  }

  useEffect(() => {
    fetchData()
  }, [])

  // delete almond
  const dealmond = async id => {
    await fetch(`http://localhost:3030/img/${id}`, { method: 'delete' })
    fetchData()
  }

  return (
    <div className="container">

    {
      state.data.map(value => (
        <div key={value._id} id={value._id}
          dangerouslySetInnerHTML={ { __html: value.img } }
          onClick={ () => dealmond(value._id) } />
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
