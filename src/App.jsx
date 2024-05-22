import { useState } from 'react';
import './App.css';
import data from './Data.json';

function App() {
  const [pointer, setPointer] = useState(0);
  const [pregoRes, setPregoRes] = useState(true);
  const [isFlipping, setIsFlipping] = useState(false);

  const handleReResponse = () => {

    setPregoRes(!pregoRes)
    setIsFlipping(!isFlipping)
    if (pregoRes == false){
      setPointer(pointer+1)
      setPregoRes(!pregoRes)
    }
  }

  return (
    <> 
      <h3 onClick={handleReResponse} className={`card ${isFlipping ? 'click' : ''} ${pregoRes ? 'card' : 'card responseCard'}`} >{data[pointer][pregoRes ? 'pregunta' : 'respuesta']}</h3>
    </>
  );
}

export default App;