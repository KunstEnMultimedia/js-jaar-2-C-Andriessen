import ExcludedLetters from "../components/ExcludedLetters";
import FifthLetter from "../components/FifthLetter";
import FirstLetter from "../components/FirstLetter";
import FourthLetter from "../components/FourthLetter";
import Words from "../components/Words";
import IncludedLetters from "../components/IncludedLetters";
import SecondLetter from "../components/SecondLetter";
import ThirdLetter from "../components/ThirdLetter";
import IncludedLettersArray from "../components/IncludedLettersArray";
import ExcludedLettersArray from "../components/ExcludedLettersArray";

function WordleSuggestion () {
    return (<>
        <div className="container row mx-5">
            <IncludedLetters />
            <ExcludedLetters />
            <FirstLetter />
            <SecondLetter />
            <ThirdLetter />
            <FourthLetter />
            <FifthLetter />
            <div className="d-flex justify-content-between">
                <IncludedLettersArray />
                <ExcludedLettersArray />
            </div>
       </div>
            <Words />
    </>
    )
}

export default WordleSuggestion;