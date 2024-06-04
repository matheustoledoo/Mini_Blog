import React from 'react'

import styles from "./Register.module.css"

import { useState, useEffect } from 'react'
import { useAuthentication } from '../../hooks/useAuthentication';

const Register = () => {
  const [displayName, setDisplayName] = useState(""); // nome do usuario
  const [email, setEmail] = useState(""); // email do usuario
  const [password, setPassword] = useState(""); // senha do usuario
  const [confirmPassword, setConfirmPassword] = useState(""); // confirmar senha
  const [error, setError] = useState(""); // caso der erro

  const {createUser, error: authError, loading } = useAuthentication()

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    const user = {
        displayName,
        email,
        password
    }

    if(password != confirmPassword){
        setError("As senhas precisam ser iguais")
        return
    }

    const res = await createUser(user);

    console.log(res)

  }

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  return (
    <div className={styles.register}>
        <h1>Cadastre-se para postar</h1>
        <p>Crie seu usuario compartinhe suas historias</p>

        <form onSubmit={handleSubmit}>
            <label>
                <span>Nome: </span>
                <input 
                 type="text"
                 name='displayName'
                 required 
                 placeholder='Nome do usuário'
                 value={displayName}
                 onChange={(e) => setDisplayName(e.target.value)}
                   />
            </label>
            <label>
                <span>Email: </span>
                <input 
                type="email" 
                name='email' 
                required 
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
            </label>
            <label>
                <span>Senha: </span>
                <input
                 type="password"
                 name='password'
                 required
                 placeholder='digite uma senha'
                 value={password}
                 onChange={(e) => setPassword(e.target.value)} />
            </label>
            <label>
                <span>Confirmação de senha: </span>
                <input 
                type="password" 
                name='confirmPassword' 
                required 
                placeholder='digite novamente sua senha'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                 />
            </label>
            {!loading && <button className="btn">Entrar</button>}
             {loading && (
             <button className="btn" disabled>
                Aguarde...
            </button>
        )}
            {error && <p className="error">{error}</p>}
        </form>
    </div>
  )
}

export default Register