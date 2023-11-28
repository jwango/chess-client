
import { useState } from "react";
import { useGetGameStateQuery, useGetMovesQuery } from "../lib/chess.query";
import { GameInfo, GameMove, GamePlayer, GameSpace } from "../lib/dto";
import { MoveInputField, MoveInputFilters } from "./MoveInputField";
import { Board } from "./Board";
import { useSubmitMoveMutation } from "../lib/chess.mutation";
import { getPieceIndex } from "../lib/util";

interface PlayProps {
  gameInfo: GameInfo;
  myPlayer: GamePlayer;
}

export const Play = ({ gameInfo, myPlayer }: PlayProps) => {
  const [selectedMove, setSelectedMove] = useState<GameMove>(null);
  const [filters, setFilters] = useState<MoveInputFilters>({ piece: null });
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

  const handleClickSpace = (space: GameSpace) => {
    const moveBySpace = moves?.find(m => isSpaceEquals(m.fromSpace, space));
    if (moveBySpace) {
      const pieceIndex = getPieceIndex(moveBySpace.pieceType, space);
      setFilters({ piece: pieceIndex });
    }
  };

  const handleSubmit = () => {
    submitMoveMutation.mutate({ gameId: gameInfo?.gameId, move: selectedMove });
    setFilters({ piece: null });
  };

  const currentColor = state?.currentPlayerTurn === 0 ? 'white' : 'black';
  const turnMessage = state?.currentPlayerId === myPlayer?.id ? 'Please submit your move.' : 'Please wait.'

  if (!isRunning) {
    return null;
  }

  return <>
    <div>
      {isLoadingMoves && <span>Loading moves...</span>}
      {isLoadingState && <span className="ml-2">Loading game state...</span>}
      {!isLoadingMoves && !isLoadingState && <p>It is currently {currentColor}&apos;s turn. {turnMessage}</p>}
    </div>
    <Board gameState={state} selectedMove={selectedMove} allowedMoves={movesBySelectedPiece} onClickSpace={handleClickSpace}/>
    <MoveInputField moves={moves} filters={filters} onFilter={setFilters} onSelect={handleSelectInput} />
    <div>
      <button type="button" className="mr-1 mb-1" onClick={() => handleRefresh()} disabled={isLoadingMoves || isLoadingState}>Refresh</button>
      <button className="mt-2" type="button" disabled={!canSubmit} onClick={handleSubmit}>Submit move</button>
    </div>
  </>;
}

function isSpaceEquals(a: GameSpace, b: GameSpace): boolean {
  return a?.row === b?.row && a?.column === b?.column;
}