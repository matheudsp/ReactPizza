import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import {useState, FormEvent, useContext} from 'react';

import logoImg from '../../../public/logo.svg';
import styles from '../../../styles/home.module.scss';

import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';

import { AuthContext } from '../../contexts/AuthContext';
import { toast } from 'react-toastify'

export default function SignUp() {
  
  const { signUp } = useContext(AuthContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);

  async function handleSignUp(event: FormEvent){
    event.preventDefault();

    if(name === '' || email === '' || password === '' ){
      toast.error("Preencha todos os campos.")
      return;
    }

    setLoading(true);

    let data = {
      name,
      email, 
      password
    }

    await signUp(data);

    setLoading(false); 
  }

  return (
    <>
      <Head>
        <title>Pizzaria Brothers - Criar Conta</title>
      </Head>
      
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo"/>

        <div className={styles.login}>
            <h1>Criando sua conta</h1>
          <form onSubmit={handleSignUp}>

          <Input 
              placeholder='Nome'
              type="text"
              value={name}
              onChange={ (e) => setName(e.target.value)}
            />

            <Input 
              placeholder='E-mail ou telefone'
              type="text"
              value={email}
              onChange={ (e) => setEmail(e.target.value)}
            />

            <Input 
              placeholder='Digite sua senha'
              type="password"
              value={password}
              onChange={ (e) => setPassword(e.target.value)}
            />

            <Button 
             type="submit"
             loading={loading}
             >
              Criar
             </Button>
          
          </form>

          <Link href="/">
            <a className={styles.text} >Já possui conta? Fazer login</a>
          </Link>

         
        
        </div>
      </div>
    </>
  )
}
