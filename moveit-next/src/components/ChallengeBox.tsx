import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengeContext';
import { CountDownContext } from '../contexts/CountDownContext';
import styles from '../styles/components/ChallengeBox.module.css'

export function ChallengeBox(){

    const {activeChallenge, resetChallenge, completeChallenge} = useContext(ChallengesContext)
    const {resetCountdown} = useContext(CountDownContext)

    function handleChallengeCompleted() {
        completeChallenge()
        resetCountdown()

    }

    function handleChallengeFailed() {
        resetChallenge()
        resetCountdown()

    }

 

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
                      <button type="button" className={styles.challengeFailedButton} onClick={handleChallengeFailed}>Falhei</button>
                      <button type="button" className={styles.challengeSuccessButton} onClick={handleChallengeCompleted}>Ganhei</button>
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