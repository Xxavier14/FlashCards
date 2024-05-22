import { useState } from "react";
import "./App.css";
import data from "./Data.json";

function App() {
  const [pointer, setPointer] = useState(0);
  const [pregoRes, setPregoRes] = useState(true);
  const [isFlipping, setIsFlipping] = useState(false);
  const [jsonData, setJsonData] = useState(null);
  const [useDefaultData, setUseDefaultData] = useState(true);

  const handleReResponse = () => {
    setPregoRes(!pregoRes);
    setIsFlipping(!isFlipping);
    if (!pregoRes) {
      if (useDefaultData || !jsonData) {
        if (pointer === data.length - 1) {
          setPointer(0); // Vuelve al principio si llega al final de los datos por defecto
          alert('Se completaron todas las preguntas, comienza de nuevo desde la 1ra!')
        } else {
          setPointer(pointer + 1);
        }
      } else {
        if (pointer === jsonData.length - 1) {
          setPointer(0); // Vuelve al principio si llega al final de los datos personalizados
          alert('Se completaron todas las preguntas, comienza de nuevo desde la 1ra!')
        } else {
          setPointer(pointer + 1);
        }
      }
    }
  };
  
  

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsedData = JSON.parse(e.target.result);
        setJsonData(parsedData);
        setUseDefaultData(false);
        setPointer(0); // Reset pointer when new data is loaded
      } catch (error) {
        console.error("Error parsing JSON file:", error);
      }
    };
    reader.readAsText(file);
  };

  const handleUseDefaultData = () => {
    setJsonData(data);
    setUseDefaultData(true);
    setPointer(0); // Reset pointer when default data is used
  };

  const renderContent = () => {
    if (useDefaultData || !jsonData) {
      return (
        <>
          <h3
            onClick={handleReResponse}
            className={`card ${isFlipping ? "click" : ""} ${
              pregoRes ? "card" : "card responseCard"
            }`}
          >
            {data[pointer][pregoRes ? "pregunta" : "respuesta"]}
          </h3>
          <button onClick={() => setUseDefaultData(false)}>
            Usar datos personalizados
          </button>
        </>
      );
    } else {
      return (
        <>
          <h3
            onClick={handleReResponse}
            className={`card ${isFlipping ? "click" : ""} ${
              pregoRes ? "card" : "card responseCard"
            }`}
          >
            {jsonData[pointer][pregoRes ? "pregunta" : "respuesta"]}
          </h3>
          <button onClick={handleUseDefaultData}>Usar datos por defecto</button>
        </>
      );
    }
  };  

  return (
    <div className="fullscreen-container">
      {renderContent()}
      {!useDefaultData && (
        <>
          <input type="file" onChange={handleFileInputChange} />
        </>
      )}
    </div>
  );
}

export default App;
