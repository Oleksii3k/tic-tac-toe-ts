import { useCallback } from "react";

export default function History({
  move,
  jumpTo,
}: {
  move: number;
  jumpTo: (move: number) => void;
}) {
  const handleClick = useCallback(() => jumpTo(move), [jumpTo, move]);
  return (
    <li key={move}>
      <button onClick={handleClick}>
        {move == 0 ? "Go to game start" : `Go to move #${move}`}
      </button>
    </li>
  );
}
