import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import styled from 'styled-components'
import { useRef, useEffect } from 'react'
import spadesWorkerPath from 'worker-plugin/loader!../worker/spades.worker'
import paradoxWorkerPath from 'worker-plugin/loader!../worker/paradox.sharedworker'

const Main = styled.main`
  font-family: 'Dekko';
  font-size: 1.2em;

  padding: 10px;
`
const Jumbo = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-aspect-ratio: 1/1) {
    flex-direction: row;
  }
`
const Heading = styled.div`
  display: flex;  
  justify-content: center;
  flex-direction: column;
  align-content: center;
  padding: 1em;
  font-size: 1.6em;
`
const Figure = styled.figure`
  flex: 0 0 200px;
  padding: 0;
  background: #929292;
  margin: 0;

  display: flex;
  align-items: flex-start;
  flex-direction: column;
  border: 1px solid grey;
  border-radius: 16px;
  overflow: hidden;
  justify-content: flex-end;

  img {
    width: 100%;
    padding: 0;
    @media (min-aspect-ratio: 1/1) {
      width: 100%;
    }
  }
`

const Home: NextPage = () => {

  const paradoxRef = useRef<SharedWorker>()
  useEffect(() => {
    if (typeof window !== "undefined") {

      paradoxRef.current = new SharedWorker(paradoxWorkerPath, { name: "InternetOfParadox" });

      paradoxRef.current?.port.start();
      
      paradoxRef.current?.port.addEventListener('message', event => {
        const fromParadox = event.data
        console.log({fromParadox});
      });

      return () => paradoxRef.current?.port.close()
    }
  }, [])

  const spadesServerRef = useRef<Worker>()
  useEffect(() => {
    if (typeof window !== "undefined") {
      spadesServerRef.current = new Worker(spadesWorkerPath)

      spadesServerRef.current.onerror = err => console.error(err)
      spadesServerRef.current.onmessageerror = console.error
      spadesServerRef.current.onmessage = event => {
        const fromSpades = event.data
        console.log({fromSpades})
      };

      return () => spadesServerRef.current?.terminate()
    }
  }, [])

  const handleWork = () => {
    paradoxRef.current?.port.postMessage(['button clicked'])
    spadesServerRef.current?.postMessage({ limit: 1000 });
  }

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Main>
        play spades
        <button onClick={handleWork}>play</button>
      </Main>

      <footer className={`footer`}>
        <Link href="/history">
          <a>History</a>
        </Link>
      </footer>
    </div>
  )
}

export default Home
