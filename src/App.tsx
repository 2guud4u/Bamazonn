import React from 'react'
import logo from './logo.svg'
import './App.css'
import phaserGame from './PhaserGame'
import HelloWorldScene from './scenes/HelloWorldScene'

const handleClick = () => {
  const scene = phaserGame.scene.keys.helloworld as HelloWorldScene
  
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        
      </header>
    </div>
  )
}

export default App
