import { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([]);  

  function transition(newMode, replace) { 
    if (replace === true) {
      setMode(newMode);
      return;
    }
    if (newMode !== initial) {
    setHistory(prev => ([...prev, mode])) 
    };
    setMode(newMode)
  };

  function back() { 
    if (mode === initial) {
      return;
    }
      setHistory(history.slice(0, (history.length - 1)));
      setMode(history[history.length - 1]);
    }
  return { mode, transition, back };
  };

 