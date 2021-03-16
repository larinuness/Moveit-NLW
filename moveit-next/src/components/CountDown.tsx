import { useState, useEffect } from 'react'
import styles from '../styles/components/CountDown.module.css'

export function CountDown(){
    const [time, setTime] = useState(25 * 60);
    const [active, setActive] = useState(false)
    const minutes = Math.floor(time/60);
    const seconds = time % 60

    const [minuteLef, minuteRight ]= String(minutes).padStart(2,'0').split('')
    const [secondLef, secondRight ]= String(seconds).padStart(2,'0').split('')

    function startCountdown(){
        setActive(true)

    }

    // Use efect recebe dois parametros
    // 1 = O que vai executar (sempre uma função)
    // 2 = Quando vai executar
    useEffect(() => {
        if(active && time > 0) {
            setTimeout(() =>{
                setTime(time - 1)
            },1000)
        }

    }, [active,time])

    return(

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
      <button type="button" className={styles.countdownButton} onClick={startCountdown}>
          Iniciar um ciclo
      </button> 
    </div>     
    )
}