import { useContext, useState } from "react";
import { excludedLettersContext } from "../context/excludedLettersContext";
import { wordsContext } from "../context/wordsContext";

function ExcludedLetters() {

    const { wordlist, setWordlist } = useContext(wordsContext);

  const [excludeLetter, setExcludeLetter] = useState("");
  const { excludedLetters, setExcludedLetters} = useContext(excludedLettersContext);

    function exclude(ev) {
        ev.preventDefault();
        let checkedWords = [];
        if (excludeLetter && excludeLetter.length === 1 && !excludedLetters.includes(excludeLetter)) {
          for (let i = 0; i < wordlist.length; i++) {
            var splittedWord = wordlist[i].split("");
            if (!splittedWord.includes(excludeLetter)) {
              checkedWords.push(wordlist[i]);
            }
          }
          setWordlist(checkedWords);
          setExcludedLetters(excludedLetters => [...excludedLetters, excludeLetter]);
          setExcludeLetter("");
        }
      }

    return (
        <div className="col">
        <form onSubmit={exclude}>
          <label className="form-label">Exclude letter</label>
          <input
            className="form-control"
            type="text"
            value={excludeLetter}
            onChange={(e) => {
              setExcludeLetter(e.target.value.toLocaleLowerCase());
            }}
          />
          <button type="submit" className="btn btn-danger mt-3">
            Exclude
          </button>
        </form>
      </div>
    );
}

export default ExcludedLetters;