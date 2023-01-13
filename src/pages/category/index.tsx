import Head from "next/head";
import { useState, FormEvent} from 'react';
import { Header } from "../../components/Header";
import styles from './styles.module.scss'
import { canSSRAuth } from "../../utils/canSSRAuth";
import { setupAPIClient } from "../../services/api";
import { toast } from "react-toastify";

export default function Category(){

    const [name, setName] = useState('');

    async function handleRegister(event: FormEvent){
        event.preventDefault();

        if(name === ''){
            return;
        }
        
        const apiClient = setupAPIClient();
        await apiClient.post('/category',{
            name: name
        })

        toast.success('Categoria adicionada!')
        setName('');
    }

    return(
        <>
        <Head>
            <title>Categoria - Pizzaria Brothers</title>
        </Head>
        
        <Header />

        <main className={styles.container}>
            <h1>Adicionar categoria</h1>

            <form className={styles.form} onSubmit={handleRegister}>
                <input 
                type='text' 
                placeholder="Informe o nome da categoria"
                className={styles.input}
                value={name}
                onChange={ (e) => setName(e.target.value) }
                />

                <button className={styles.buttonAdd} type="submit">
                    Adicionar
                </button>
            </form>
        </main>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {

    return{
        props:{}
    }
}
)