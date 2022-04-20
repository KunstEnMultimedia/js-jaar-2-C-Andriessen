import { useContext } from "react";
import { includedLettersContext } from "../context/includedLettersContext";

function IncludedLettersArray () {

    const {includedLetters} = useContext(includedLettersContext);

    function renderIncludedLetters() {
        return includedLetters.map((includedLetter, i) => {
            return <p className="fs-4 mx-2 text-primary" key={i}>{includedLetter}</p>
        })
    }

    if (includedLetters.length !== 0) {        
        return (
            <div>
            <p className="fs-2">Included letters</p>
            <div className="d-flex">
            {includedLetters.length !== 0 ? renderIncludedLetters() : ''}
            </div>
           </div>
        )
    } else {
        return (<>
        </>)
    }

}

export default IncludedLettersArray;