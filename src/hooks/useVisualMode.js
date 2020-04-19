import { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  console.log(history);
  

  function transition(newMode, replace) { 
    if (replace === true) {
      setMode(newMode);
      return;
    }
    if (newMode !== initial) {
      history.push(newMode)
    };
     setMode(newMode) };

  function back() { 
    if (history.length > 1) {
    let newHist = (history.slice(0, (history.length-1)));
    setHistory(newHist);
    setMode(newHist[newHist.length-1]);
    }
  };

  return { mode, transition, back };
}