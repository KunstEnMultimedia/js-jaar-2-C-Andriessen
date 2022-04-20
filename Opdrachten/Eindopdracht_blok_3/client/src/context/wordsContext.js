import axios from "axios";
import React, { useEffect, useState, createContext } from "react";


const wordsContext = createContext();

const WordsContextProvider = ({children}) => {

    const [wordlist, setWordlist] = useState('')

    async function getWords() {
            axios.get("http://localhost:5000/words").then((res) => {
                if (wordlist === '') {
                    if (res.data){
                        setWordlist(res.data);
                    }    
                }
        })
      }

      useEffect(() => {
          getWords();
          // eslint-disable-next-line 
      }, [wordlist]);

      return <wordsContext.Provider value={{wordlist, setWordlist}}>
          {children}
      </wordsContext.Provider>
}



    export default WordsContextProvider;
    export {wordsContext}