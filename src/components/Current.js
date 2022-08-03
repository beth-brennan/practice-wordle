import allowedGuesses from '../words/allowedGuesses';
import possibleAnswers from '../words/possibleAnswers';

function Current(props) {

  const handleChange = (event) => {
    const { value, name } = event.target;
    const [fieldName, fieldIndex] = name.split("-");

    if (value.toLowerCase() !== value.toUpperCase() || value === "") {
      let guess = [...props.currentGuess];
      guess[fieldIndex] = value.toUpperCase();
      props.setCurrentGuess(guess);

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
  }

  const handleKeyDown = (event) => {
    const { name, value } = event.target;
    const [fieldName, fieldIndex] = name.split("-");

    if (event.key === 'Backspace' && value === "") {
      const lastEntry = document.querySelector(
        `input[name=letter-${parseInt(fieldIndex, 10) - 1}]`
      );
      if (lastEntry !== null) {
        lastEntry.focus();
      }
    } else if (event.key !== 'Backspace' && value !== "") {
      const nextEntry = document.querySelector(
        `input[name=letter-${parseInt(fieldIndex, 10) + 1}]`
      );
      if (nextEntry !== null) {
        nextEntry.focus();
      }
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (props.currentGuess.join("").length === 5
      && (possibleAnswers.includes(props.currentGuess.join("").toLowerCase())
      || allowedGuesses.includes(props.currentGuess.join("").toLowerCase()))) {
      const guess = [...props.currentGuess];
      let unusedLetters = props.word.split("");

      const greenAndGray = guess.map((letter, index) => {
        if (!props.word.includes(letter)) {
          return {letter, type: "gray"};
        } else if (letter === props.word[index]) {
          unusedLetters.splice(unusedLetters.indexOf(letter), 1);
          return {letter, type: "green"};
        } else {
          return {letter, type: "pending"};
        }
      });

      const results = greenAndGray.map(guess => {
        if (guess.type === "pending") {
          if (props.word.includes(guess.letter) && unusedLetters.includes(guess.letter)) {
            unusedLetters.splice(unusedLetters.indexOf(guess.letter), 1);
            return {letter: guess.letter, type: "yellow"};
          } else {
            return {letter: guess.letter, type: "gray"}
          }
        } else {
          return guess;
        }
      })

      props.setGuesses([...props.guesses, results]);
      props.setCurrentGuess(["", "", "", "", ""]);

      let newLineArray = [...props.lineArray];
      let currentIndex = newLineArray.indexOf("current");
      newLineArray[currentIndex] = "past";

      if (props.currentGuess.join("") !== props.word && currentIndex !== 5) {
        newLineArray[currentIndex + 1] = "current";
      } else {
        props.setDone(true);
      };

      props.setLineArray(newLineArray);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rows">
      <input
        className={props.currentGuess.join("").length === 5
        && !possibleAnswers.includes(props.currentGuess.join("").toLowerCase())
        && !allowedGuesses.includes(props.currentGuess.join("").toLowerCase())
        ? "input invalid" : "input"}
        type="text"
        name="letter-0"
        minLength={1}
        maxLength={1}
        autoFocus="autofocus"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={props.currentGuess[0]}
      />
      <input
        className={props.currentGuess.join("").length === 5
        && !possibleAnswers.includes(props.currentGuess.join("").toLowerCase())
        && !allowedGuesses.includes(props.currentGuess.join("").toLowerCase())
        ? "input invalid" : "input"}
        type="text"
        name="letter-1"
        minLength={1}
        maxLength={1}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={props.currentGuess[1]}
      />
      <input
        className={props.currentGuess.join("").length === 5
        && !possibleAnswers.includes(props.currentGuess.join("").toLowerCase())
        && !allowedGuesses.includes(props.currentGuess.join("").toLowerCase())
        ? "input invalid" : "input"}
        type="text"
        name="letter-2"
        minLength={1}
        maxLength={1}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={props.currentGuess[2]}
      />
      <input
        className={props.currentGuess.join("").length === 5
        && !possibleAnswers.includes(props.currentGuess.join("").toLowerCase())
        && !allowedGuesses.includes(props.currentGuess.join("").toLowerCase())
        ? "input invalid" : "input"}
        type="text"
        name="letter-3"
        minLength={1}
        maxLength={1}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={props.currentGuess[3]}
      />
      <input
        className={props.currentGuess.join("").length === 5
        && !possibleAnswers.includes(props.currentGuess.join("").toLowerCase())
        && !allowedGuesses.includes(props.currentGuess.join("").toLowerCase())
        ? "input invalid" : "input"}
        type="text"
        name="letter-4"
        minLength={1}
        maxLength={1}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={props.currentGuess[4]}
      />
      <input type="submit" id="submit-button" />
    </form>
  )
}

export default Current;
