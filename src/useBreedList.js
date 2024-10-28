import { useState, useEffect } from "react";

const localCache = {};
  //E POSSO DEFINIR UM HOOK PERSONALIZADO
export default function useBreedList(animal) {

  //TENDO EFEITOS E ESTADOS DELE, SEJA DE LOADING, OU ESTADO DE NEGOCIO
  const [breedList, setBreedList] = useState([]);
  const [status, setStatus] = useState("unloaded");

  useEffect(() => {
    //SE NÃO EXISTE VAI SER VAZIO
    if (!animal) {
      setBreedList([]);
      //SE EXISTER NO CACHE,RETORNA O QUE TA LA
    } else if (localCache[animal]) {
      setBreedList(localCache[animal]);
    } else {
      //SENÃO FAZ A REQUEST
      requestBreedList();
    }

    async function requestBreedList() {
      //REACT QUERY POR DEBNAIXO DOS PANOS VAI FUNCIONAR ASSIM
      //E SEGUE NOSSO REDUTOR COM O EFEITO DA REQUEST
      setBreedList([]);
      setStatus("loading");
      const res = await fetch(
        `http://pets-v2.dev-apis.com/breeds?animal=${animal}`
      );
      const json = await res.json();
      localCache[animal] = json.breeds || [];
      setBreedList(localCache[animal]);
      setStatus("loaded");
    }
  }, [animal]);

  return [breedList, status];
}