import React, { useState, createContext } from "react";


const excludedLettersContext = createContext();

const ExcludedLettersContextProvider = ({children}) => {

    const [excludedLetters, setExcludedLetters] = useState([])

      return <excludedLettersContext.Provider value={{excludedLetters, setExcludedLetters}}>
          {children}
      </excludedLettersContext.Provider>
}



    export default ExcludedLettersContextProvider;
    export {excludedLettersContext}