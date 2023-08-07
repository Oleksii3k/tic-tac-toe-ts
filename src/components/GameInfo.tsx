import History from "./History";

export default function GameInfo({
  history,
  jumpTo,
}: {
  history: string[][];
  jumpTo: (mode: number) => void;
}) {
  return (
    <ol>
      {history.map((_squares, move) => (
        <History key={move} move={move} jumpTo={jumpTo} />
      ))}
    </ol>
  );
}
