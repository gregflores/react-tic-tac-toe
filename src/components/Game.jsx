import {useState, useEffect} from 'react'
import Board from './Board'

const Game = () => {
    const [history, setHistory] = useState(
        [
            {'squares': Array(9).fill(null)},
        ]
        );
    const [xIsNext, setXIsNext] = useState(true);
    const [stepNumber, setStepNumber] = useState(0);
    const [moves, setMoves] = useState();

    const handleClick = (i) => {
        const tempHistory = history.slice(0, stepNumber + 1);
        const currentBoard = tempHistory[tempHistory.length - 1];
        const tempSquares = currentBoard.squares.slice();
        // console.log(currentBoard);
        if(calculateWinner(tempSquares) || tempSquares[i]) {
            return;
        }

        tempSquares[i] = xIsNext ? 'X' : 'O';
        setHistory([...history, {squares: tempSquares}])
        // setHistory(history.concat({'squares': tempSquares}));
        setXIsNext(!xIsNext);
        setStepNumber(history.length);
    }

    


    const board = history[stepNumber];
    const winner = calculateWinner(board.squares);
    // console.log(history);


    let status;
    if(winner) status = 'Winner: ' + winner
    else status =  'Next player: ' + (xIsNext?'X':'O');

    useEffect(() => {
        setMoves(history.map((step, move) => {
            const desc = move ? 'Go to move # ' + move : 'Go to game Start';
            console.log(history);
            return(
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{desc}</button>
            </li>);
        }));

        const jumpTo = (step) => {
            setStepNumber(step);
            setXIsNext((step%2)===0);
            setHistory(history.slice(0, step + 1))
        }
    }, [history])
    // setMoves(history.map((step, move) => {
    //     const desc = move ? 'Go to move # ' + move : 'Go to game Start';
    //     return(
    //     <li key={move}>
    //         <button onClick={() => jumpTo(move)}>{desc}</button>
    //     </li>);
    // }));

    
    return (
        <div className="game">
            <div className="game-board">
                <Board squares={board.squares} onClick={(i) => handleClick(i)}/>
            </div>
            <div className="game-info">
                <div>{status}</div>
                <ol>{moves}</ol>
            </div>
        </div>
    )
}

const calculateWinner = (squares) => {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];
      for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
          return squares[a];
        }
      }
      return null;
}

export default Game