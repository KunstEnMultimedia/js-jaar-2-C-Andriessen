import { useContext, } from "react";
import { wordsContext } from "../context/wordsContext";

function Words() {

    const { wordlist} = useContext(wordsContext);

  function renderWordlist() {
      return wordlist.map((word, i) => {
        return <p className="fs-5 p-2" key={i}>{word}</p>
      })
  }

  return (
      <>
            <div className="d-flex flex-wrap justify-content-between border container">
                {wordlist.length !== 0 ? renderWordlist() : ''}
            </div>
            </>
  );
}

export default Words;
