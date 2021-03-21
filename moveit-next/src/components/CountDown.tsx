import { CountDownContext } from '../contexts/CountDownContext'
import {useContext} from 'react'
import styles from '../styles/components/CountDown.module.css'

export function CountDown() {

    const {minutes,seconds, hasFinished, isActive, startCountdown, resetCountdown} = useContext(CountDownContext)
        
    // O split divide e retorna num array, ex o minuto 25 fica '2' '5'
    // agora se tiver no minuto 5, não tem como repatir, então o padStart
    // verifica se tem dois caracteres, se não tiver ele preencher com 0, do lado esquerdo

    //Esses dados não foram para o context, porque essas duas linhas abaixo está formatando os dados
    //a parte visual precisa desses dados de uma maneria especifica, quem exige essa formatação
    //é o layout e não a regra de negócio, não faz parte de como funciona e sim como é vizualizada 
    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('')
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('')
   

    return (

        <div>
            <div className={styles.countdownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondLeft}</span>
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