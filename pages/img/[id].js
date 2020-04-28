import Head from 'next/head'
import Link from 'next/link'

import Image from '../../components/image'

export default function List() {
  return (
    <div>
      <Head>
        <title>Image List</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">
          List of Images
        </h1>

        <div className="card">
          <Link href="/">
            <a>Home</a>
          </Link>

          <Link href="/list">
            <a>List</a>
          </Link>
        </div>

        <Image />
      </main>

      <style jsx>{`
        main {
          padding: 5rem 0;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </div>
  )
}
