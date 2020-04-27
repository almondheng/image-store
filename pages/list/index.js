import dynamic from 'next/dynamic'
import Head from 'next/head'
import Link from 'next/link'

const Image = dynamic(
  () => import('../../components/image'),
  { ssr: false }
)

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
        </div>

        <Image />
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
