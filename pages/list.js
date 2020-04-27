import Head from 'next/head'

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Image List</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">
          List Images
        </h1>

        <p className="description">
          Get started by editing <code>pages/index.js</code>
        </p>
      </main>

      <style jsx>{`
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </div>
  )
}
