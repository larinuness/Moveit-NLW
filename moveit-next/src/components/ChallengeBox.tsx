import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengeContext';
import styles from '../styles/components/ChallengeBox.module.css'

export function ChallengeBox(){

    const {activeChallenge} = useContext(ChallengesContext)

 

    return(
        <div className={styles.challengeBoxContainer}>
          {activeChallenge ? (
              <div className={styles.challengeActive}>
                  <header>Ganhe {activeChallenge.amount}</header>
                  <main>
                      <img src={`icons/${activeChallenge.type}.svg`} alt="body" />
                      <strong>Novo desafio</strong>
                      <p>{activeChallenge.description}</p>
                  </main>

                  <footer>
                      <button type="button" className={styles.challengeFailedButton}>Falhei</button>
                      <button type="button" className={styles.challengeSuccessButton}>Ganhei</button>
                  </footer>
              </div>
          ) : (
                <div className={styles.challengeBoxNotActive}>
                <strong>Inicie um ciclo para receber desafios</strong>
                <p>
                <img src="icons/level-up.svg" alt="Level up"/>
                Avance de level completando os desafios.
                </p>
            </div>
          )}
        </div>
    )
}