import { FormEvent, useContext, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';


import logoImg from '../../public/logo.svg';
import styles from '../../styles/home.module.scss';

import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { toast} from "react-toastify";

import { AuthContext } from '../contexts/AuthContext';
import { canSSRGuest } from '../utils/canSSRGuest';

export default function Home() {

  const { signIn } = useContext(AuthContext)

  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  const [ loading, setLoading ] = useState(false);

  async function handleLogin(event: FormEvent){
    event.preventDefault();

    if(email == '' || password === ''){
      toast.error("Preencha todos os campos.")
      return
    }

    setLoading(true);

    let data = {
      email,
      password
    }

    await signIn(data);

    setLoading(false);
  }

  return (
    <>
      <Head>
        <title>Login - Pizzaria Brothers</title>
      </Head>
      
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo"/>

        <div className={styles.login}>
          <form onSubmit={handleLogin}>
            <Input 
              placeholder='E-mail ou telefone'
              type="text"
              value={email}
              onChange={ (e) => setEmail(e.target.value) }
            />

            <Input 
              placeholder='Digite sua senha'
              type="password"
              value={password}
              onChange={ (e) => setPassword(e.target.value) }
            />

            <Button 
             type="submit"
             loading={loading}
             >
              Entrar
             </Button>
          
          </form>

          <Link href="/signup">
            <a className={styles.text}>Não possui uma conta? Criar Conta</a>
          </Link>

         
        
        </div>
      </div>
    </>
  )
}


export const getServerSideProps = canSSRGuest(async (ctx) => {
  
  return {
    props: {}
  }
})