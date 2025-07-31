import "./App.css";
import Board from "./components/Board";
import Keyboard from "./components/Keyboard";
import { createContext, useState, useEffect} from "react";
import { boardDefault, generateWordSet } from "./Words";

export const AppContext = createContext();

function App() {
  const [board, setBoard] = useState(boardDefault);
  const [currAttempt, setcurrAttempt] = useState({attempt: 0, letter: 0});
  const [wordSet  , setWordSet] = useState(new Set());

  const correctWord = "RIGHT";  

  useEffect(() => {
    generateWordSet().then((words) => {
      setWordSet(words.wordSet);
    })


  }, [])

  const onSelectLetter = (keyVal) => {
    if (currAttempt.letterPos > 4) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letter] = keyVal;
    setBoard(newBoard);
    setcurrAttempt({...currAttempt, letter: currAttempt.letter + 1});

  };
  const onDelete = () => {
    if (currAttempt.letter === 0) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letter - 1] = "";
    setBoard(newBoard);
    setcurrAttempt({...currAttempt, letter: currAttempt.letter - 1});



  };
  const onEnter = () => {
    if (currAttempt.letter !== 5) return;

    let currWord = "";
    for (let i =0 ; i < 5 ; i ++) {
      currWord += board[currAttempt.attempt][i];
    }
    if (wordSet.has(currWord.toLowerCase())) {
      setcurrAttempt({attempt: currAttempt.attempt + 1, letter: 0}); 
    } else {
      alert("Word Not Found");
    }
    if (currWord === correctWord){
      alert("Game Ended");
    }
  };

  return (
    <div className= "App" >
      <nav>
        <h1>Worlde</h1>
      </nav>
      <AppContext.Provider value={{board, setBoard, currAttempt, setcurrAttempt, onSelectLetter, onDelete, onEnter, correctWord}}> 
        <div className="game" >
          <Board />
          <Keyboard />
        </div>
      </AppContext.Provider>
    </div>);
}

export default App;
