import { useContext, useState } from "react";
import { includedLettersContext } from "../context/includedLettersContext";
import { wordsContext } from "../context/wordsContext";

function IncludedLetters() {

    const { wordlist, setWordlist } = useContext(wordsContext);

    const [includeLetter, setIncludeLetter] = useState("");
    const {includedLetters, setIncludedLetters} = useContext(includedLettersContext);


    function include(ev) {
        ev.preventDefault();
        let checkedWords = [];
        if (includeLetter && includeLetter.length === 1 && !includedLetters.includes(includeLetter)) {
          for (let i = 0; i < wordlist.length; i++) {
            var splittedWord = wordlist[i].split("");
            if (splittedWord.includes(includeLetter)) {
              checkedWords.push(wordlist[i]);
            }
          }
          setWordlist(checkedWords);
          setIncludedLetters(includedLetters => [...includedLetters, includeLetter]);
          setIncludeLetter("");
        }
      }


    return (
        <div className="col">
        <form onSubmit={include}>
          <label className="form-label">Include letter</label>
          <input
            className="form-control"
            type="text"
            value={includeLetter}
            onChange={(e) => {
              setIncludeLetter(e.target.value.toLocaleLowerCase());
            }}
          />
          <button type="submit" className="btn btn-primary mt-3">
            Include
          </button>
        </form>
      </div>
    )
}

export default IncludedLetters;