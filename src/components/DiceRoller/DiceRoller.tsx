
import React, { useState } from 'react'


const Die = (props : any) => {
  return(
    <button value={props.value} className="die" onClick={props.update}>
      {props.value}
    </button>
  )
}

const Multiplier = (props : any) => {
  return(
    <input className="multiplier" type="number" pattern="[0-9]*" min="1" max="10" placeholder="1" onChange={props.update}/>
  )
}

const Result = (props : any) => {
  return (
    <p className="result-box">{props.result}</p>
  )
}

const Dice = (props: any) => {
    let dice = props.dice.map((die: any, index: number) => <Die value={die} key={index} update={props.calculateTotal} />)

    return dice;
  }

const DiceRoller = () => {


  const [expression, setExpression] = useState("")

  const [isCommand,setIsCommand] = useState(false)

  const [rollData, setRollData] = useState({
    d4: 0,
    d6: 0,
    d8: 0,
    d10: 0,
    d12: 0,
    d20: 0,
    mod: 0
  })

  const checkIfCommand = (expression: string) => {
    var initialRe = /^\/r [+-]*\d+(?!\d*d)|\/r [+-]*(\d*d\d+)/g
    var noOtherCharsRe = /^(\/r)[^a-be-z]*$/g

    var isCommand = initialRe.test(expression) && noOtherCharsRe.test(expression)

    return isCommand
  }

  const compactifyExpression = (expression: string) => {
    let compactExpression = expression.replaceAll(" ", "")
    return compactExpression
  }

  const validateExpression = (expression: string) => {

    var initialRe = /^\/r [+-]*\d+(?!\d*d)|\/r [+-]*(\d*d\d+)/g

    var initialMatch = expression.match(initialRe)?.map((ex) => ex.replace(/^\/r /g,"") ) ?? []

    var withoutPrefix = compactifyExpression(expression.replace(initialRe,""))


    var myRe2 = /[+-]\d+(?!\d*d)/g
    var myRe = /([+-]\d*d\d+)/g

    var match = withoutPrefix.match(myRe) ?? []
    var constants = withoutPrefix.match(myRe2)?.concat([]) ?? []

    var dice = initialMatch.concat(match)
    return [dice, constants]
  }


    
  const translateDice = (dice: string[]) => {
    return dice.map((diceString) => diceString.split("d").map(st => parseInt(st)))
  }
  



  const rollTheDice = (dice :string[] ,constants : string[]) => {

    const summedConstants = constants.map((st) => parseInt(st)).reduce((a,b) => a+b, 0)
    const translatedDice = translateDice(dice);   

    const rolledDice = translatedDice.map((couple) => {
      let result = 0;
      for (let i = 0; i < couple[0]; i++) {
        let a = Math.floor(Math.random() * couple[1]) + 1;
        console.log(a);
        
        result += a
      }
      return result;
    })[0]

    return rolledDice+summedConstants
  }

  const [dice,constants] = validateExpression(expression)
  
  const result = rollTheDice(dice,constants)
  
  console.log(result);
  
  

  return (
    <div>
      <input placeholder="enter command here" onChange={e => { setIsCommand(checkIfCommand(e.target.value)); setExpression(e.target.value);}}></input>
      <button>Enter</button>
      <p>{isCommand ? "true" : "false"}</p>
      {dice}
    </div>
  )
}

export default DiceRoller;
