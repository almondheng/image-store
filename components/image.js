import React, { useEffect, useState } from 'react'

export default function Image() {
  const [state, setState] = useState({ data: [] })

  useEffect(async () => {
    const res = await fetch("http://localhost:3030/img")
    const { data } = await res.json()
    console.log(data)
    setState({ data })
  }, [])

  return (
    <div className="container">

    {
      state.data.map(value => (
        <div key={value._id} id={value._id}
          dangerouslySetInnerHTML={ { __html: value.img } } />
      ))
    }

    <style jsx>{`
      .container {
        display: grid;
        grid-template-columns: repeat(3, 400px);
        grid-gap: 20px;
        justify-content: center;
      }

      .container > div {
        border: 1px solid red;
        height: 400px;
        width: 400px;
        overflow: hidden;
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
