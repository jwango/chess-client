import { DebugQuery } from "@shared";
import { useGetGameStateQuery, useGetMovesQuery } from "../lib/chess.query";
import { GameInfo, GamePlayer } from "../lib/dto";
import { MoveInputField } from "./MoveInputField";

interface PlayProps {
  gameInfo: GameInfo;
  myPlayer: GamePlayer;
}

export const Play = ({ gameInfo, myPlayer }: PlayProps) => {
  const { data: state, isLoading: isLoadingState, isError: isErrorState, error: errorState } = useGetGameStateQuery(gameInfo?.gameId);
  const { data: moves, isLoading: isLoadingMoves, isError: isErrorMoves, error: errorMoves } = useGetMovesQuery(gameInfo?.gameId);

  const isRunning = gameInfo?.currentState === 'RUNNING';

  return <>
    {isRunning && <DebugQuery isLoading={isLoadingState} data={state} />}
    {isRunning && isLoadingMoves && <p>Loading moves...</p>}
    {isRunning && !isLoadingMoves && <MoveInputField moves={moves} />}
  </>;
}

