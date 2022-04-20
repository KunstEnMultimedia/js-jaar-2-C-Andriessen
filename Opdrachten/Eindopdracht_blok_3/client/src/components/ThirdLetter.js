import { useContext, useState } from "react";
import { wordsContext } from "../context/wordsContext";

function ThirdLetter() {

    const { wordlist, setWordlist } = useContext(wordsContext);


  const [thirdLetter, setThirdLetter] = useState("");

  function third (ev) {
    ev.preventDefault();
    let checkedWords = [];
    if (thirdLetter && thirdLetter.length === 1) {
      for (let i = 0; i < wordlist.length; i++) {
        var splittedWord = wordlist[i].split("");
        if (splittedWord[2] === thirdLetter) {
          checkedWords.push(wordlist[i]);
        }
      }
      setWordlist(checkedWords);
    }
  }

  return (
    <div className="col">
    <form onSubmit={third}>
      <label className="form-label">Third letter</label>
      <input
        className="form-control"
        type="text"
        value={thirdLetter}
        onChange={(e) => {
          setThirdLetter(e.target.value.toLocaleLowerCase());
        }}
      />
      <button type="submit" className="btn btn-success mt-3">
        Submit
      </button>
    </form>
  </div>
  )
    
}

export default ThirdLetter;