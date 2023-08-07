import { useCallback, useMemo } from "react";
import Square from "./Square";

export default function Board({
  xIsNext,
  squares,
  onPlay,
}: {
  xIsNext: boolean;
  squares: string[];
  onPlay: (nextSquares: string[]) => void;
}) {
  const calculateWinner = useCallback((squares: string[]) => {
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
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }, []);
  const handleClick = useCallback(
    (i: number) => {
      if (calculateWinner(squares) || squares[i]) {
        return;
      }
      const nextSquares = squares.slice();
      if (xIsNext) {
        nextSquares[i] = "X";
      } else {
        nextSquares[i] = "O";
      }
      onPlay(nextSquares);
    },
    [calculateWinner, onPlay, squares, xIsNext]
  );

  const winner = useMemo(
    () => calculateWinner(squares),
    [calculateWinner, squares]
  );
  const status = useMemo(
    () =>
      winner ? "Winner: " + winner : "Next player: " + (xIsNext ? "X" : "O"),
    [winner, xIsNext]
  );

  return (
    <>
      <div className="status">{status}</div>
      {[0, 1, 2].map((row) => (
        <div className="board-row" key={row}>
          {[0, 1, 2].map((col) => {
            const index = row * 3 + col;
            return (
              <Square
                key={index}
                index={index}
                value={squares[index]}
                onSquareClick={handleClick}
              />
            );
          })}
        </div>
      ))}
    </>
  );
}
