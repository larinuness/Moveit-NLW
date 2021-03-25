
import { CompletedChallenges } from "../components/CompletedChallenges";
import { CountDown } from "../components/CountDown";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import styles from '../styles/pages/Home.module.css'
import Head from 'next/head'
import { ChallengeBox } from "../components/ChallengeBox";
import { CountDownProvider } from "../contexts/CountDownContext";
import {GetServerSideProps} from 'next'
import {ChallengesProvider} from '../contexts/ChallengeContext'
import { prependOnceListener } from "node:process";

interface HomeProps {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}


export default function Home(props: HomeProps) {
  return (
    <ChallengesProvider level={props.level}
    currentExperience={props.currentExperience}
    challengesCompleted={props.challengesCompleted}
    > 
    <div className={styles.container}>
      <Head>
        <title>Inicio | Moveit</title>
      </Head>
    <ExperienceBar />
    <CountDownProvider>
    <section>
      <div>
        <Profile/>
        <CompletedChallenges/>
        <CountDown/>
      </div>
      <div>
        <ChallengeBox/>
      </div>
    </section>
    </CountDownProvider>
  </div>
  </ChallengesProvider> 
  )
}

//O nome da função tem que ser esse obrigatorio, função relacionada sobre cookies
export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { level, currentExperience, challengesCompleted } = req.cookies;

  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted),
    }
  }
};