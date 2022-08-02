import { useEffect, useState } from 'react';
import './App.css';
import allowedGuesses from './words/allowedGuesses';
import possibleAnswers from './words/possibleAnswers';

function App() {
  const [word, setWord] = useState("");
  const [lineArray, setLineArray] = useState(["current", "future", "future", "future", "future", "future"]);
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState(["", "", "", "", ""]);

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
    console.log("keydown pressed")
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
    if (currentGuess.join("").length === 5 && possibleAnswers.includes(currentGuess.join("").toLowerCase())) {
      const guess = [...currentGuess];
      let unusedLetters = word.split("");

      const results = guess.map((letter, index) => {
        if (!word.includes(letter)) {
          return {letter, type: "gray"};
        } else if (letter === word[index]) {
          unusedLetters.splice(unusedLetters.indexOf(letter), 1);
          return {letter, type: "green"};
        } else if (word.includes(letter) && unusedLetters.includes(letter)) {
          return {letter, type: "yellow"};
        } else {
          return {letter, type: "gray"};
        }
      });

      setGuesses([...guesses, results]);
      setCurrentGuess(["", "", "", "", ""]);

      let newLineArray = [...lineArray];
      let currentIndex = newLineArray.indexOf("current");
      newLineArray[currentIndex] = "past";

      if (currentGuess.join("") !== word) {
        newLineArray[currentIndex + 1] = "current";
      }

      setLineArray(newLineArray);
    }
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
    </div>
  );
}

export default App;
