import { useCallback, useMemo, useState } from "react";
import Board from "./components/Board";
import GameInfo from "./components/GameInfo";

export default function Game() {
  const [history, setHistory] = useState<string[][]>([Array(9).fill("")]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = useMemo(() => currentMove % 2 === 0, [currentMove]);
  const currentSquares = useMemo(
    () => history[currentMove],
    [currentMove, history]
  );

  const handlePlay = useCallback(
    (nextSquares: string[]) => {
      const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
      setHistory(nextHistory);
      setCurrentMove(nextHistory.length - 1);
    },
    [currentMove, history]
  );

  const jumpTo = useCallback((nextMove: number) => {
    setCurrentMove(nextMove);
  }, []);

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <GameInfo history={history} jumpTo={jumpTo} />
      </div>
    </div>
  );
}
