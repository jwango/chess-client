
import { useState } from "react";
import { useGetGameStateQuery, useGetMovesQuery } from "../lib/chess.query";
import { GameInfo, GameMove, GamePlayer } from "../lib/dto";
import { MoveInputField } from "./MoveInputField";
import { Board } from "./Board";
import { useSubmitMoveMutation } from "../lib/chess.mutation";

interface PlayProps {
  gameInfo: GameInfo;
  myPlayer: GamePlayer;
}

export const Play = ({ gameInfo, myPlayer }: PlayProps) => {
  const [selectedMove, setSelectedMove] = useState<GameMove>(null);
  const [movesBySelectedPiece, setMovesBySelectedPiece] = useState<GameMove[]>([]);
  const { data: state, isFetching: isLoadingState, refetch: refetchState } = useGetGameStateQuery(gameInfo?.gameId);
  const { data: moves, isFetching: isLoadingMoves, refetch: refetchMoves } = useGetMovesQuery(gameInfo?.gameId);
  const submitMoveMutation = useSubmitMoveMutation();

  const isRunning = gameInfo?.currentState === 'RUNNING';
  const canSubmit = isRunning && !isLoadingMoves && !isLoadingState && !!selectedMove;

  const handleRefresh = () => {
    refetchState();
    refetchMoves();
  };

  const handleSelectInput = (move: GameMove, movesByPiece: GameMove[]) => {
    setSelectedMove(move);
    setMovesBySelectedPiece(movesByPiece);
  }

  return <>
    {isRunning && <div>
      <button type="button" className="mr-1 mb-1" onClick={() => handleRefresh()} disabled={isLoadingMoves || isLoadingState}>Refresh</button>
      {isLoadingMoves && <span>Loading moves...</span>}
      {isLoadingState && <span className="ml-2">Loading game state...</span>}
    </div>}
    {isRunning && <Board gameState={state} selectedMove={selectedMove} allowedMoves={movesBySelectedPiece} />}
    {isRunning && !isLoadingMoves && <>
      <MoveInputField moves={moves} onSelect={handleSelectInput} />
      <button className="mt-2" type="button" disabled={!canSubmit} onClick={() => submitMoveMutation.mutate({ gameId: gameInfo?.gameId, move: selectedMove })}>Submit move</button>
    </>}
  </>;
}

