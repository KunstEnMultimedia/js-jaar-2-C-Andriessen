import './sass/app.scss';
import WordsContextProvider from './context/wordsContext';
import Header from './components/Header';
import Routing from './components/Routing';
import ExcludedLettersContextProvider from './context/excludedLettersContext';
import IncludedLettersContextProvider from './context/includedLettersContext';

function App() {
  return (
    <WordsContextProvider>
      <ExcludedLettersContextProvider>
        <IncludedLettersContextProvider>
      <Header />
      <Routing />
        </IncludedLettersContextProvider>
      </ExcludedLettersContextProvider>
    </WordsContextProvider>
  );
}

export default App;
