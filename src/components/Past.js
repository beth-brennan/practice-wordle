function Past(props) {
  const word = props.guesses[props.index];

  return (
    <div className="rows">
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

export default Past;
