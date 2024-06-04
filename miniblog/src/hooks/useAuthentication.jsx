import {db} from "../firebase/config"

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut,
  } from "firebase/auth"; 

  import { useState, useEffect } from "react";

  //autentificação
  export const useAuthentication = () => { 
    const [error, setError] = useState(null);  //caso der erro
    const [loading, setLoading] = useState(null); //caso der certo

    // cleanup (apaga os resquicios)
    // deal with memory leak
    const [cancelled, setCancelled] = useState(false);

    const auth = getAuth(); //pega a autentificação

    function checkIfIsCancelled() {
     if (cancelled) { //se estiver cancelado
          return;
        }
    }

    const createUser = async (data) => {
      checkIfIsCancelled();

      setLoading(true)

      try{

        const { user } = await createUserWithEmailAndPassword(
          auth,
          data.email,
          data.password
        )

        await updateProfile(user, {
          displayName: data.displayName,
        });

        setLoading(false)
  
        return user

      }catch(error){

        console.log(error.message);
        console.log(typeof error.message);

        let systemErrorMessage

        if (error.message.includes("Password")) {
          systemErrorMessage = "A senha precisa conter pelo menos 6 caracteres.";
        } else if (error.message.includes("email-already")) {
          systemErrorMessage = "E-mail já cadastrado.";
        } else {
          systemErrorMessage = "Ocorreu um erro, por favor tenta mais tarde.";
        }
  
        setLoading(false)
        setError(systemErrorMessage)
      }
  
    }

    
    // Criação Logout

    const logout = () => {

      checkIfIsCancelled()

      signOut(auth) //função importada do firebase ja

    }

    // Login

    const login = async(data) => {
      checkIfIsCancelled()

      setLoading(true)
      setError(true)

      try{

        await signInWithEmailAndPassword(auth, data.email, data.password)
        setLoading(false)


      }catch(error){

        let systemErrorMessage

        if(error.message.includes("user-not-found")){
          systemErrorMessage = "usuario não encontrado :("
        }else  if(error.message.includes("wrong-password")){
          systemErrorMessage = "Senha incorreta"
        }else{
          systemErrorMessage = "Usuario ou senha não encontrados :("
        }

        setError(systemErrorMessage)
        setLoading(false)
      }

    }



    useEffect(() => {
      return () => setCancelled(true);
    }, [])



    return{
      auth,
      createUser,
      error,
      loading,
      logout,
      login
    }
  
}   