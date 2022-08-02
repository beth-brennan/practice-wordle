import { useEffect, useState } from 'react';
import './App.css';
import Current from './components/Current';
import Future from './components/Future';
import Past from './components/Past';
import allowedGuesses from './words/allowedGuesses';
import possibleAnswers from './words/possibleAnswers';

function App() {
  const [word, setWord] = useState("");
  const [lineArray, setLineArray] = useState(["current", "future", "future", "future", "future", "future"]);
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState(["", "", "", "", ""]);
  const [done, setDone] = useState(false);

  const handleClick = () => {
    const randomIndex = Math.floor(Math.random() * possibleAnswers.length);
    setWord(possibleAnswers[randomIndex].toUpperCase());
    setLineArray(["current", "future", "future", "future", "future", "future"]);
    setGuesses([]);
    setCurrentGuess(["", "", "", "", ""]);
    setDone(false);
  }

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * possibleAnswers.length);
    setWord(possibleAnswers[randomIndex].toUpperCase());
  }, [])

  return (
    <div id='container'>
      {lineArray.map((line, index) => {
        console.log(word);
        if (line === "current") {
          return (
            <Current
              key={index}
              currentGuess={currentGuess}
              setCurrentGuess={setCurrentGuess}
              guesses={guesses}
              setGuesses={setGuesses}
              lineArray={lineArray}
              setLineArray={setLineArray}
              word={word}
              setDone={setDone}
            />
          )
        } else if (line === "future") {
          return <Future key={index} />
        } else {
          return <Past key={index} index={index} guesses={guesses} />
        }
      })}
      {done && (
        <button
          type='button'
          onClick={handleClick}
          id='replay-button'
        >
          Play Again!
        </button>
      )}
    </div>
  );
}

export default App;
