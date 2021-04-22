import Head from 'next/head'
import Main from "containers/main"
import Demo from "Components/demo"

export default function Home() {
  return (
    <Main>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Demo />
    </Main>
  )
}
