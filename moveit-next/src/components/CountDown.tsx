import { normalizeConfig } from 'next/dist/next-server/server/config'
import { useState, useEffect, useContext } from 'react'
import styles from '../styles/components/CountDown.module.css'
import {ChallengesContext} from '../contexts/ChallengeContext'


// Ajuda a parar no momento exato do contador, senão o setTimeout normal tem delay de 1seg
let countdownTimeout: NodeJS.Timeout

export function CountDown() {
    
    //Importando o context Api para um componente (fazer ligações entre eles)
    const {startNewChallenge} = useContext(ChallengesContext)

    const [time, setTime] = useState(0.1 * 60)
    const [isActive, setIsActive] = useState(false)
    const [hasFinished, setHasFinished] = useState(false)


    //A função Math. floor(x) retorna o menor número inteiro dentre o número "x".
    const minutes = Math.floor(time / 60);
    const seconds = time % 60


    // O split divide e retorna num array, ex o minuto 25 fica '2' '5'
    // agora se tiver no minuto 5, não tem como repatir, então o padStart
    // verifica se tem dois caracteres, se não tiver ele preencher com 0, do lado esquerdo
    const [minuteLef, minuteRight] = String(minutes).padStart(2, '0').split('')
    const [secondLef, secondRight] = String(seconds).padStart(2, '0').split('')

    function startCountdown() {
        setIsActive(true)

    }


    function resetCountdown() {
        // Para no momento exato
        clearTimeout(countdownTimeout)
        setIsActive(false)
        //Reseta para 25 de novo
        setTime(0.1 * 60)
    }

    // Use efect recebe dois parametros
    // 1 = O que vai executar (sempre uma função)
    // 2 = Quando vai executar
    useEffect(() => {
        if (isActive && time > 0) {

            countdownTimeout = setTimeout(() => {
                setTime(time - 1)
            }, 1000)
        } else if (isActive && time == 0) {
            setHasFinished(true)
            setIsActive(false)
            startNewChallenge()

        }

    }, [isActive, time])

    return (

        <div>
            <div className={styles.countdownContainer}>
                <div>
                    <span>{minuteLef}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondLef}</span>
                    <span>{secondRight}</span>
                </div>
            </div>


            { hasFinished ? (
                // Varios estilos dentro de um button como var  
                <button disabled className={styles.countdownButton}>

                    Ciclo encerrado
                </button>
            ): (
                <>
                { isActive ? (
                // Varios estilos dentro de um button como var  
                <button type="button" className={`${styles.countdownButton} ${styles.countdownButtonActive}`} onClick={resetCountdown}>

                    Abandonar ciclo
                </button>
            ) : (
                <button type="button" className={styles.countdownButton} onClick={startCountdown}>

                    Iniciar um ciclo
                </button>


            )}
                </>
            )}

            {/* Se isActive for true mostra 'Abandonar ciclo', senão Iniciar um ciclo      */}

            


        </div>
    )
}