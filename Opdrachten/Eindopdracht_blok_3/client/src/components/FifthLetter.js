import { useContext, useState } from "react";
import { wordsContext } from "../context/wordsContext";

function FifthLetter() {

    const { wordlist, setWordlist } = useContext(wordsContext);
        
    const [fifthLetter, setFifthLetter] = useState("");

    function fifth (ev) {
        ev.preventDefault();
        let checkedWords = [];
        if (fifthLetter && fifthLetter.length === 1) {
          for (let i = 0; i < wordlist.length; i++) {
            var splittedWord = wordlist[i].split("");
            if (splittedWord[4] === fifthLetter) {
              checkedWords.push(wordlist[i]);
            }
          }
          setWordlist(checkedWords);
        }
      }


    return (
        <div className="col">
        <form onSubmit={fifth}>
          <label className="form-label">Fifth letter</label>
          <input
            className="form-control"
            type="text"
            value={fifthLetter}
            onChange={(e) => {
              setFifthLetter(e.target.value.toLocaleLowerCase());
            }}
          />
          <button type="submit" className="btn btn-success mt-3 mb-5">
            Submit
          </button>
        </form>
      </div>
    )
}

export default FifthLetter;