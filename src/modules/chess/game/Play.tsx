
import { useState } from "react";
import { useGetGameStateQuery, useGetMovesQuery } from "../lib/chess.query";
import { GameInfo, GameMove, GamePlayer } from "../lib/dto";
import { MoveInputField } from "./MoveInputField";
import { Board } from "./Board";

interface PlayProps {
  gameInfo: GameInfo;
  myPlayer: GamePlayer;
}

export const Play = ({ gameInfo, myPlayer }: PlayProps) => {
  const { data: state, isLoading: isLoadingState, isError: isErrorState, error: errorState } = useGetGameStateQuery(gameInfo?.gameId);
  const { data: moves, isLoading: isLoadingMoves, isError: isErrorMoves, error: errorMoves } = useGetMovesQuery(gameInfo?.gameId);
  const [selectedMove, setSelectedMove] = useState<GameMove>(null);

  const isRunning = gameInfo?.currentState === 'RUNNING';

  return <>
    {isRunning && <Board gameState={state} selectedMove={selectedMove} />}
    {isRunning && isLoadingMoves && <p>Loading moves...</p>}
    {isRunning && !isLoadingMoves && <MoveInputField moves={moves} onSelect={setSelectedMove} />}
  </>;
}

