import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import "./style.css"

function App() {
  const emptyBoard = Array(9).fill("")

  const [board, setBoard] = useState(emptyBoard)
  const [currentPlayer, setCurrentPlayer] = useState("O")
  const [winner, setWinner] = useState("")

  
  const handleCellClick = (index) => {
    if(board[index] !== "") return null
    if(winner) return null
    
    setBoard(board.map((item, itemIndex) => itemIndex === index ? currentPlayer : item))
    
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X")
  }
  
  const checkWinner = () => {
    const possibleWaysToWin = [
      [board[0], board[1], board[2]],
      [board[3], board[4], board[5]],
      [board[6], board[7], board[8]],
      
      [board[0], board[3], board[6]],
      [board[1], board[4], board[7]],
      [board[2], board[5], board[8]],
      
      [board[0], board[4], board[8]],
      [board[2], board[4], board[6]],
    ];
    
    possibleWaysToWin.forEach(cells => {
      if(cells.every(cell => cell === "O")) setWinner("O")
      if(cells.every(cell => cell === "X")) setWinner("X")
    });
  }
  useEffect(checkWinner)
  
  const resetGame = () => {
    setBoard(emptyBoard)
    setWinner("")
    setCurrentPlayer("X")
  }

  return (
      <div className='container'>
        <h1>Jogo da Velha</h1>
        <div className={`gameButtons ${winner ? "game-over" : ""}`}>
          {board.map((item, index)=>(
            <button 
              key={index} 
              onClick={() => handleCellClick(index)} 
              className={`cell ${item}`}
            >
              {item}
            </button>
          ))}
        </div>

        {winner !== "" &&(
          <div className="msg">
            <h3>{winner} ganhou!</h3>
            <button onClick={resetGame}>Reiniciar</button>
          </div>
        )}
      </div>
    );
  }
  



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);

export default App;
