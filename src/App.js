import { useEffect, useState } from 'react';
import './App.css';
import allowedGuesses from './words/allowedGuesses';
import possibleAnswers from './words/possibleAnswers';

function App() {
  const [word, setWord] = useState("");
  const [lineArray, setLineArray] = useState(["current", "future", "future", "future", "future", "future"]);
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState(["", "", "", "", ""]);
  const [won, setWon] = useState(false);

  const handleChange = (event) => {
    const { value, name } = event.target;
    const [fieldName, fieldIndex] = name.split("-");

    let guess = [...currentGuess];
    guess[fieldIndex] = value.toUpperCase();
    setCurrentGuess(guess);

    if (value.length === 1) {
      if (parseInt(fieldIndex, 10) < 4) {
        const nextEntry = document.querySelector(
          `input[name=letter-${parseInt(fieldIndex, 10) + 1}]`
        );
        if (nextEntry !== null) {
          nextEntry.focus();
        }
      }
    } else {
      if (parseInt(fieldIndex, 10) > 0) {
        const lastEntry = document.querySelector(
          `input[name=letter-${parseInt(fieldIndex, 10) - 1}]`
        );
        if (lastEntry !== null) {
          lastEntry.focus();
        }
      }
    }
  }

  const handleKeyDown = (event) => {
    const { name, value } = event.target;
    const [fieldName, fieldIndex] = name.split("-");

    if (event.key === 'Backspace') {
      if (value === "") {
        const lastEntry = document.querySelector(
          `input[name=letter-${parseInt(fieldIndex, 10) - 1}]`
        );
        if (lastEntry !== null) {
          lastEntry.focus();
        }
      } else {
        const nextEntry = document.querySelector(
          `input[name=letter-${parseInt(fieldIndex, 10) + 1}]`
        );
        if (nextEntry !== null) {
          nextEntry.focus();
        }
      }
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (currentGuess.join("").length === 5
      && (possibleAnswers.includes(currentGuess.join("").toLowerCase())
      || allowedGuesses.includes(currentGuess.join("").toLowerCase()))) {
      const guess = [...currentGuess];
      let unusedLetters = word.split("");

      const greenAndGray = guess.map((letter, index) => {
        if (!word.includes(letter)) {
          return {letter, type: "gray"};
        } else if (letter === word[index]) {
          unusedLetters.splice(unusedLetters.indexOf(letter), 1);
          return {letter, type: "green"};
        } else {
          return {letter, type: "pending"};
        }
      });

      const results = greenAndGray.map(guess => {
        if (guess.type === "pending") {
          if (word.includes(guess.letter) && unusedLetters.includes(guess.letter)) {
            unusedLetters.splice(unusedLetters.indexOf(guess.letter), 1);
            return {letter: guess.letter, type: "yellow"};
          } else {
            return {letter: guess.letter, type: "gray"}
          }
        } else {
          return guess;
        }
      })

      setGuesses([...guesses, results]);
      setCurrentGuess(["", "", "", "", ""]);

      let newLineArray = [...lineArray];
      let currentIndex = newLineArray.indexOf("current");
      newLineArray[currentIndex] = "past";

      if (currentGuess.join("") !== word) {
        newLineArray[currentIndex + 1] = "current";
      } else {
        setWon(true);
      }

      setLineArray(newLineArray);
    }
  }

  const handleClick = () => {
    const randomIndex = Math.floor(Math.random() * possibleAnswers.length);
    setWord(possibleAnswers[randomIndex].toUpperCase());
    setLineArray(["current", "future", "future", "future", "future", "future"]);
    setGuesses([]);
    setCurrentGuess(["", "", "", "", ""]);
    setWon(false);
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
            <form key={index} onSubmit={handleSubmit} className="rows">
              <input
                className='input'
                type="text"
                name="letter-0"
                minLength={1}
                maxLength={1}
                autoFocus="autofocus"
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                value={currentGuess[0]}
              />
              <input
                className='input'
                type="text"
                name="letter-1"
                minLength={1}
                maxLength={1}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                value={currentGuess[1]}
              />
              <input
                className='input'
                type="text"
                name="letter-2"
                minLength={1}
                maxLength={1}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                value={currentGuess[2]}
              />
              <input
                className='input'
                type="text"
                name="letter-3"
                minLength={1}
                maxLength={1}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                value={currentGuess[3]}
              />
              <input
                className='input'
                type="text"
                name="letter-4"
                minLength={1}
                maxLength={1}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                value={currentGuess[4]}
              />
              <input type="submit" id="submit-button" />
            </form>
          )
        } else if (line === "future") {
          return (
            <div className="rows" key={index}>
              <span className='blank' />
              <span className='blank' />
              <span className='blank' />
              <span className='blank' />
              <span className='blank' />
            </div>
          )
        } else {
          const word = guesses[index];
          return (
            <div className="rows" key={index}>
              <span className={word[0]["type"]}>
                {word[0]["letter"]}
              </span>
              <span className={word[1]["type"]}>
                {word[1]["letter"]}
              </span>
              <span className={word[2]["type"]}>
                {word[2]["letter"]}
              </span>
              <span className={word[3]["type"]}>
                {word[3]["letter"]}
              </span>
              <span className={word[4]["type"]}>
                {word[4]["letter"]}
              </span>
            </div>
          )
        }
      })}
      {won && (
        <button type='button' onClick={handleClick}>
          Play Again!
        </button>
      )}
    </div>
  );
}

export default App;
