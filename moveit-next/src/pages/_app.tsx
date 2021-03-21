import '../styles/global.css'

import {ChallengesProvider} from '../contexts/ChallengeContext'



function MyApp({ Component, pageProps }) {
  return (
  //Pode enviar varios tipos de dados dentro do value, ex: String, Objeto, Função
  <ChallengesProvider>
   
      <Component {...pageProps} />
    
  </ChallengesProvider>  
  )
}

export default MyApp
