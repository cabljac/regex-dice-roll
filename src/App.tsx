import React, { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import DiceRoller from './components/DiceRoller/DiceRoller'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <p> VTT project bootstrapped </p>
      <DiceRoller/>
    </div>
  )
}

export default App
