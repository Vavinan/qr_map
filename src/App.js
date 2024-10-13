import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [showImages, setShowImages] = useState(false);
  const [showExit, setShowExit] = useState(false);

  const [selectedOption, setSelectedOption] = useState('');
  const [inputNumber, setInputNumber] = useState('');
  const [images, setImages] = useState([]);

  let folder;
  
  useEffect(() => {
    folder = inputNumber === '1' ? 'A' : inputNumber === '2' ? 'B' : 'A';
    
    const imagePromises = [];
    let size = inputNumber === '1' ? 7 : inputNumber === '2' ? 15 : 7
    for (let i = 1; i <= size; i++) {
      imagePromises.push(import(`./images/${folder}/${i}.jpg`));
    }
    Promise.all(imagePromises).then((images) => setImages(images));
  }, [inputNumber]);

  

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    if (option === 'Toilets') {
      setShowImages(true);
    }else if (option === 'Exit') {
      setShowExit(true);
    }
  };

  const handleCloseClick = () => {
    setShowImages(false);
    setShowExit(false)
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    if (!id) {
      const url = new URL(window.location.href);
      const path = url.pathname;
      const number = path.replace('/', '');
      setInputNumber(number);
    } else {
      setInputNumber(id);
    }
  }, []);

  return (
    <div className="App">
      {showExit ? (
      <div>
      <div class="sorry">
        <img src={require('./images/sorry/Joey.gif')} alt="Sorry Joey GIF" />
      </div>

        <button className="close-button" onClick={handleCloseClick}>×</button>

      </div>
    ) : showImages ? (
        <div>
          <div className="image-container">
          {images.map((image, index) => (
            <img key={index} src={image.default} alt={`${folder}-${index + 1}`} />
          ))}
          </div>
          <button className="close-button" onClick={handleCloseClick}>×</button>
        </div>
      ) : (
        <div className="button-container">
          <button className="big-button" onClick={() => handleOptionClick('Toilets')}>Toilets</button>
          <button className="big-button" onClick={() => handleOptionClick('Exit')}>Exit</button>
        </div>
      )}
    </div>
  );
}

export default App;