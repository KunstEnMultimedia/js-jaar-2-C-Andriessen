import { useContext, useState } from "react";
import { wordsContext } from "../context/wordsContext";

function FourthLetter() {

    const { wordlist, setWordlist } = useContext(wordsContext);

  const [fourthLetter, setFourthLetter] = useState("");

  function fourth (ev) {
    ev.preventDefault();
    let checkedWords = [];
    if (fourthLetter && fourthLetter.length === 1) {
      for (let i = 0; i < wordlist.length; i++) {
        var splittedWord = wordlist[i].split("");
        if (splittedWord[3] === fourthLetter) {
          checkedWords.push(wordlist[i]);
        }
      }
      setWordlist(checkedWords);
    }
  }


  return (
            <div className="col">
            <form onSubmit={fourth}>
              <label className="form-label">Fourth letter</label>
              <input
                className="form-control"
                type="text"
                value={fourthLetter}
                onChange={(e) => {
                  setFourthLetter(e.target.value.toLocaleLowerCase());
                }}
              />
              <button type="submit" className="btn btn-success mt-3">
                Submit
              </button>
            </form>
          </div>
  )
}

export default FourthLetter;