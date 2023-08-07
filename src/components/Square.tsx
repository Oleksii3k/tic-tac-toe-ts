import { useCallback } from "react";

export default function Square({
  index,
  value,
  onSquareClick,
}: {
  index: number;
  value: string;
  onSquareClick: (index: number) => void;
}) {
  const handleClick = useCallback(
    () => onSquareClick(index),
    [index, onSquareClick]
  );
  return (
    <button className="square" onClick={handleClick}>
      {value}
    </button>
  );
}
