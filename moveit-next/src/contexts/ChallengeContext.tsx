import {createContext, useState, ReactNode, Children, useEffect} from 'react'
import challenges from '../../challenges.json'


//Definir o dados que tem em challenge
interface Challenge {
    type: 'body' | 'eye',
    description: String,
    amount: Number,

}

//Definir um formato especifico para createContext
interface ChallengesContextData {
    level: number, 
    levelUp: () => void, 
    currentExperience: number, 
    challengesCompleted: number, 
    startNewChallenge: () => void,
    activeChallenge: Challenge,
    experienceToNextLevel: number,
    resetChallenge:() => void,
    completeChallenge: () => void

}

// ReactNode aceita qualquer elemento filho como Children, ex: texto, componente, uma tag html
// Definir tipo para o childre através de interface
interface ChallengesProviderProps {
    children: ReactNode;
}

export const ChallengesContext = createContext({} as ChallengesContextData)

export function ChallengesProvider({children}: ChallengesProviderProps){
    const [level, setLevel] = useState(1)
    const [currentExperience, setCurrentExperience] = useState(0)
    const [challengesCompleted, setChallengesCompleted] = useState (0)
    const [ activeChallenge, setActiveChallenge] = useState(null)

    //Calculo de potência para subir o nivel de experiencia do usuario
    //4 é o fator de experiencia, quanto maior 5,6,7 etc mais dificil de subir
    //quanto menor mais facil
    const experienceToNextLevel = Math.pow((level + 1)* 4,2)
    

    //Sempre que um useEffect estiver com um array vazio, significa que ele vai excecutar um unica vez
    useEffect(() =>{
        Notification.requestPermission()

    }, [])

    function levelUp(){
        setLevel(level + 1)
    }

    function startNewChallenge(){
        //Desafios aleatorios
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
        const challenge = challenges[randomChallengeIndex]
        setActiveChallenge(challenge)

        new Audio('/notification.mp3').play
        //Fazer aparecer noficações no browser
        if(Notification.permission === 'granted') {
            new Notification('Novo desafio', {
              body: `Valendo ${challenge.amount} xp!`  
            })
        }
    }

    function resetChallenge() {
        setActiveChallenge(null)
    }

    function completeChallenge() {

        if(!activeChallenge) {
            return;
        }

        const {amount} = activeChallenge;

        let finalExperience = currentExperience + amount;

        if(finalExperience >= experienceToNextLevel) {
            finalExperience = finalExperience - experienceToNextLevel
            levelUp()
        }

        setCurrentExperience(finalExperience)
        setActiveChallenge(null)
        setChallengesCompleted(challengesCompleted + 1)
    }

    return (
        <ChallengesContext.Provider value={{
        level, 
        levelUp, 
        currentExperience, 
        challengesCompleted, 
        startNewChallenge,
        activeChallenge,
        experienceToNextLevel,
        resetChallenge,
        completeChallenge
        }}
    > 
          {children}
        </ChallengesContext.Provider>
    )
}