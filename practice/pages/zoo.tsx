import type { NextPage } from 'next'
import Head from 'next/head'
import Counter from '../features/counter/counter'
import Link from 'next/link'
import Kanye from '../features/ye/kanye'
import EnterprizeCounter from '../features/enterprizeCounter/enterprizeCounter'

const Zoo: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Counter />
      <EnterprizeCounter />
      <Kanye />
      <footer>
        <Link href="/">
          <a>Home</a>
        </Link>
      </footer>
    </div>
  )
}

export default Zoo