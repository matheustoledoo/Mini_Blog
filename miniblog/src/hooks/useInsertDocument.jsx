import { useState, useEffect, useReducer } from "react";
import { db } from "../firebase/config";
import { collection, addDoc, Timestamp } from "firebase/firestore";

const initialState = { //estado inicial 
  loading: null,
  error: null,
};

const insertReducer = (state, action) => { 
  switch (action.type) { //checa o tipo
    case "LOADING":
      return { loading: true, error: null };
    case "INSERTED_DOC":
      return { loading: false, error: null };
    case "ERROR":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const useInsertDocument = (docCollection) => {

    //useReducer é utilizado para  grandes aplicações onde múltiplos componentes precisam compartilhar o estado.
  const [response, dispatch] = useReducer(insertReducer, initialState);

  // deal with memory leak
  const [cancelled, setCancelled] = useState(false); //para nao ter vazamento de memoria

  const checkCancelBeforeDispatch = (action) => { //aqui faz com o que antes de fazer qualquer ação
    if (!cancelled) { //vericfica se esta cancelado
      dispatch(action);
    }
  };

  const insertDocument = async (document) => { //vai receber um documento que ira ser inserido
    checkCancelBeforeDispatch({ type: "LOADING" });

    try {
      const newDocument = { ...document, createdAt: Timestamp.now() };

      const insertedDocument = await addDoc(
        collection(db, docCollection), //esse colection é importado
        newDocument
      );

      checkCancelBeforeDispatch({
        type: "INSERTED_DOC",
        payload: insertedDocument,
      });
    } catch (error) {
      checkCancelBeforeDispatch({ type: "ERROR", payload: error.message });
    }
  };

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { insertDocument, response };
};