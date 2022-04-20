import { useContext, useState } from "react";
import { wordsContext } from "../context/wordsContext";

function SecondLetter() {

    const { wordlist, setWordlist } = useContext(wordsContext);


  const [secondLetter, setSecondLetter] = useState("");

    
    function second (ev) {
        ev.preventDefault();
        let checkedWords = [];
        if (secondLetter && secondLetter.length === 1) {
          for (let i = 0; i < wordlist.length; i++) {
            var splittedWord = wordlist[i].split("");
            if (splittedWord[1] === secondLetter) {
              checkedWords.push(wordlist[i]);
            }
          }
          setWordlist(checkedWords);
        }
      }
    
    return (
        <div className="col">
        <form onSubmit={second}>
          <label className="form-label">Second letter</label>
          <input
            className="form-control"
            type="text"
            value={secondLetter}
            onChange={(e) => {
              setSecondLetter(e.target.value.toLocaleLowerCase());
            }}
          />
          <button type="submit" className="btn btn-success mt-3">
            Submit
          </button>
        </form>
      </div>
    )
}

export default SecondLetter;