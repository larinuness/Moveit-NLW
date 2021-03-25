import {createContext, useState, ReactNode, useEffect} from 'react'
import Cookies from 'js-cookie'
import challenges from '../../challenges.json'
import { LevelUpModal } from '../components/LevelUpModal'



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
    closeLevelUpModal: () => void

}

// ReactNode aceita qualquer elemento filho como Children, ex: texto, componente, uma tag html
// Definir tipo para o childre através de interface
interface ChallengesProviderProps {
    children: ReactNode;
    level: number;
    currentExperience: number;
    challengesCompleted: number;
}

export const ChallengesContext = createContext({} as ChallengesContextData)

export function ChallengesProvider({children, ...rest}: ChallengesProviderProps){
    const [level, setLevel] = useState(rest.level ?? 1)
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0)
    const [challengesCompleted, setChallengesCompleted] = useState (rest.challengesCompleted ?? 0)
    const [activeChallenge, setActiveChallenge] = useState(null)
    const [isLevelModalUp, setIsLevelModalUp] = useState(false)

    //Calculo de potência para subir o nivel de experiencia do usuario
    //4 é o fator de experiencia, quanto maior 5,6,7 etc mais dificil de subir
    //quanto menor mais facil
    const experienceToNextLevel = Math.pow((level + 1)* 4,2)
    

    //Sempre que um useEffect estiver com um array vazio, significa que ele vai excecutar um unica vez
    useEffect(() =>{
        Notification.requestPermission()

    }, [])

    useEffect(()=> {
        Cookies.set('level', String(level))
        Cookies.set('currentExperience', String(currentExperience))
        Cookies.set('challengesCompleted', String(challengesCompleted))
    }, [level, currentExperience,challengesCompleted]) //Array de dependencia 

    function levelUp(){
        setLevel(level + 1)
        setIsLevelModalUp(true)
    }

    function closeLevelUpModal() {
        setIsLevelModalUp(false)
    }

    function startNewChallenge(){
        //Desafios aleatorios
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
        const challenge = challenges[randomChallengeIndex]
        setActiveChallenge(challenge)


        //Audio toca quando aperece novo desafio
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
        completeChallenge,
        closeLevelUpModal
        }}
    > 
        { isLevelModalUp && <LevelUpModal/>}
          {children}
        </ChallengesContext.Provider>
    )
}