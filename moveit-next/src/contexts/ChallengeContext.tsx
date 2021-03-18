import {createContext, useState, ReactNode, Children} from 'react'
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
    experienceToNextLevel: number
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

    function levelUp(){
        setLevel(level + 1)
    }

    function startNewChallenge(){
        //Desafios aleatorios
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
        const challenge = challenges[randomChallengeIndex]

        setActiveChallenge(challenge)
    }

    return (
        <ChallengesContext.Provider value={{
        level, 
        levelUp, 
        currentExperience, 
        challengesCompleted, 
        startNewChallenge,
        activeChallenge,
        experienceToNextLevel
        }}
    > 
          {children}
        </ChallengesContext.Provider>
    )
}