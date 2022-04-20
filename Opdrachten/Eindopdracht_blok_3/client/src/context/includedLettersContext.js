import React, { useState, createContext } from "react";


const includedLettersContext = createContext();

const IncludedLettersContextProvider = ({children}) => {

    const [includedLetters, setIncludedLetters] = useState([])

      return <includedLettersContext.Provider value={{includedLetters, setIncludedLetters}}>
          {children}
      </includedLettersContext.Provider>
}



    export default IncludedLettersContextProvider;
    export {includedLettersContext}