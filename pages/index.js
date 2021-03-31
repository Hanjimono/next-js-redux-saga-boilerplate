import Head from 'next/head'
import Button from 'Ui/button'
import ButtonLine from "Ui/buttonLine"
import Loader from "Ui/loader"
import Main from "containers/main"
import {popup} from "Services/globalEvents"

export default function Home() {
  const onOpenModalClick = () => popup("alert", {title: "Alert", text: "This is an alert modal"})
  return (
    <Main>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ButtonLine>
        <Button onClick={onOpenModalClick} disabled>
          Disabled Open modal
        </Button>
        <Button icon="warning" onClick={onOpenModalClick}>
          Open alert modal
        </Button>
      </ButtonLine>
    </Main>
  )
}
