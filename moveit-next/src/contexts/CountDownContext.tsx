import { createContext, Children,ReactNode, useContext, useState, useEffect } from "react";
import { CountDown } from "../components/CountDown";
import { ChallengesContext } from "./ChallengeContext";

interface CountDownContextData {
    minutes: number,
    seconds: number
    hasFinished: boolean,
    isActive: boolean,
    startCountdown: () => void,
    resetCountdown: () => void

}

interface CountDownProviderProps {
    children: ReactNode;
}

export const CountDownContext = createContext({} as CountDownContextData)

// Ajuda a parar no momento exato do contador, senão o setTimeout normal tem delay de 1seg
let countdownTimeout: NodeJS.Timeout

export function CountDownProvider({children}: CountDownProviderProps) {
    //Importando o context Api para um componente (fazer ligações entre eles)
    const {startNewChallenge} = useContext(ChallengesContext)

    const [time, setTime] = useState(0.1 * 60)
    const [isActive, setIsActive] = useState(false)
    const [hasFinished, setHasFinished] = useState(false)


    //A função Math. floor(x) retorna o menor número inteiro dentre o número "x".
    const minutes = Math.floor(time / 60);
    const seconds = time % 60

    function startCountdown() {
        setIsActive(true)

    }


    function resetCountdown() {
        // Para no momento exato
        clearTimeout(countdownTimeout)
        setIsActive(false)
        //Reseta para 25 de novo
        setTime(0.1 * 60)
        setHasFinished(false)
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
        <CountDownContext.Provider value={{
            minutes,
            seconds,
            hasFinished,
            isActive,
            startCountdown,
            resetCountdown
        }}>
            {children}
        </CountDownContext.Provider>
    )
 
}