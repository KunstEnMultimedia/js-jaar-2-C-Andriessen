import { useContext, useState } from "react";
import { wordsContext } from "../context/wordsContext";

function FirstLetter() {

    const { wordlist, setWordlist } = useContext(wordsContext);


    const [firstLetter, setFirstLetter] = useState("");

    function first (ev) {
        ev.preventDefault();
        let checkedWords = [];
        if (firstLetter && firstLetter.length === 1) {
          for (let i = 0; i < wordlist.length; i++) {
            var splittedWord = wordlist[i].split("");
            if (splittedWord[0] === firstLetter) {
              checkedWords.push(wordlist[i]);
            }
          }
          setWordlist(checkedWords);
        }
      }

      return (
        <div className="col">
        <form onSubmit={first}>
          <label className="form-label">First letter</label>
          <input
            className="form-control"
            type="text"
            value={firstLetter}
            onChange={(e) => {
              setFirstLetter(e.target.value.toLocaleLowerCase());
            }}
          />
          <button type="submit" className="btn btn-success mt-3">
            Submit
          </button>
        </form>
      </div>
      )
}

export default FirstLetter;