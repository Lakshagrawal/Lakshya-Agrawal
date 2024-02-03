import React, { useState, useEffect } from 'react';

const Home = () => {
  const sentence = "is the recommended control for a dropdown toggle, there might be situations where you have";
  const msg = new SpeechSynthesisUtterance();
  const [speakText, setSpeakText] = useState(null);
  const [index, setIndex] = useState(0);
  const [message, setMessage] = useState('');
  const [voices, setVoices] = useState(null);
  const [currentVoice, setCurrentVoice] = useState(0);

  useEffect(() => {
    const handleVoicesChange = () => {
      const allVoices = window.speechSynthesis.getVoices();
      setVoices(allVoices);
    };

    window.speechSynthesis.onvoiceschanged = handleVoicesChange;

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  useEffect(() => {
    console.log('Updated Voices:', voices);
    console.log('Current Index:', index);
    console.log('Current Speak Text:', speakText);
  }, [voices, index, speakText]);

  const updateText = (event) => {
    const messageText = event.target.value;
    setMessage(messageText);
    const sz = messageText.length;

    for (let j = 0; j < sz; j++) {
      if (messageText[j] !== (speakText ? speakText[j] : undefined)) {
        speakFunction(msg);
        break;
      }
    }

    if (sz === (speakText ? speakText.length : 0)) {
      currentCharacter();
      setMessage('');
    }
  };

  const currentCharacter = ()=>{
    const words = sentence.split(' ');
    const word = words[index];
    if (!word) {
      console.log('Reached end of sentence');
      return;
    }
    setSpeakText(word);
    setIndex((index) => index + 1);
  };

  const speakFunction = (msg) => {
    const text = speakText || '';
    msg.text = text;
    msg.voice = voices[currentVoice];
    window.speechSynthesis.speak(msg);
  };

  return (
    <div>
      <div className="mb-3">
        <label htmlFor="exampleFormControlTextarea1" className="form-label m-3">
          <h1>Write your text</h1>
        </label>
        <textarea
          className="form-control"
          id="exampleFormControlTextarea1"
          value={message}
          onChange={updateText}
          rows="10"
        ></textarea>
        <div className="btn-group">
          <button type="button" className="btn btn-info dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            Action
          </button>
          <ul className="dropdown-menu">
            {voices === null ? (
              <li className="dropdown-item">Voices not available</li>
            ) : (
              voices.map((e, i) => (
                <li key={i} className="dropdown-item" onClick={() => setCurrentVoice(i)}>
                  {e.voiceURI}
                </li>
              ))
            )}
          </ul>
        </div>
        <button type="button" className="btn btn-primary m-3" onClick={()=>{speakFunction(msg)}}>
          Replay
        </button>
      </div>
    </div>
  );
};

export default Home;
