
import React, { useState } from 'react'
import {validateExpression, rollTheDice, checkIfCommand} from '../../utils/diceMethods'



const DiceRoller = () => {


  const [expression, setExpression] = useState("")
  const [isCommand,setIsCommand] = useState(false)
  const [result, setResult] = useState(0)

  const handleClick = () => {
    const [dice, constants] = validateExpression(expression)
    setResult(rollTheDice(dice, constants))    
  }
  

  return (
    <div>
      <input placeholder="enter command here" onChange={e => { setIsCommand(checkIfCommand(e.target.value)); setExpression(e.target.value);}}></input>
      <button onClick={handleClick}>Enter</button>
      <p>{isCommand ? "true" : "false"}</p>
      {result}
    </div>
  )
}

export default DiceRoller;
