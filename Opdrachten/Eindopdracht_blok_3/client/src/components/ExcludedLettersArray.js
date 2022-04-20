import { useContext } from "react";
import { excludedLettersContext } from "../context/excludedLettersContext";

function ExcludedLettersArray () {

    const {excludedLetters} = useContext(excludedLettersContext);

    function renderExcludedLetters() {
        return excludedLetters.map((excludedLetter, i) => {
            return <p className="fs-4 mx-2 text-danger" key={i}>{excludedLetter}</p>
        })
    }

    if (excludedLetters.length !== 0) {        
        return (
            <div>
            <p className="fs-2">Excluded letters</p>
            <div className="d-flex">
            {excludedLetters.length !== 0 ? renderExcludedLetters() : ''}
            </div>
           </div>
        )
    } else {
        return (<>
        </>)
    }

}

export default ExcludedLettersArray;