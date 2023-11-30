
import { useCallback, useState } from "react";
import { useGetGameStateQuery, useGetMovesQuery } from "../lib/chess.query";
import { GameInfo, GameMove, GamePlayer, GameSpace, GameState } from "../lib/dto";
import { MoveInputField, MoveInputFilters, getMoveName } from "./MoveInputField";
import { Board } from "./Board";
import { useSubmitMoveMutation } from "../lib/chess.mutation";
import { getPieceIndex } from "../lib/util";
import { useToastState } from "@shared/lib";
import { Toast } from "@shared";

interface PlayProps {
  gameInfo: GameInfo;
  myPlayer: GamePlayer;
}

export const Play = ({ gameInfo, myPlayer }: PlayProps) => {
  // state
  const [selectedMove, setSelectedMove] = useState<GameMove>(null);
  const [filters, setFilters] = useState<MoveInputFilters>({ piece: null });
  const [movesBySelectedPiece, setMovesBySelectedPiece] = useState<GameMove[]>([]);
  const { toastState, show } = useToastState();

  // queries
  const { data: state, isFetching: isLoadingState, refetch: refetchState } = useGetGameStateQuery(gameInfo?.gameId);
  const { data: moves, isFetching: isLoadingMoves, refetch: refetchMoves } = useGetMovesQuery(gameInfo?.gameId);

  // mutations
  const handleSubmitMoveSuccess = useCallback(() => {
    show({ color: 'success', title: '', message: 'Your move was accepted.'});
  }, [show]);
  const submitMoveMutation = useSubmitMoveMutation(handleSubmitMoveSuccess);

  // render
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
    const clickedFromSpace = moves?.find(m => isSpaceEquals(m.fromSpace, space));
    if (clickedFromSpace) {
      const pieceIndex = getPieceIndex(clickedFromSpace.pieceType, space);
      setFilters({ piece: pieceIndex, moveName: undefined });
    } else {
      const clickedToSpaceMove = movesBySelectedPiece?.find(m => isSpaceEquals(m.toSpace, space));
      if (clickedToSpaceMove) {
        const moveName = getMoveName(clickedToSpaceMove);
        setFilters(prev => ({ ...prev, moveName }));
        setSelectedMove(clickedToSpaceMove);
      }
    }

  };

  const handleSubmit = () => {
    submitMoveMutation.mutate({ gameId: gameInfo?.gameId, move: selectedMove });
    setFilters({ piece: null });
  };

  const currentColor = state?.currentPlayerTurn === 0 ? 'White' : 'Black';
  const turnMessage = state?.currentPlayerId === myPlayer?.id ? 'Please submit a move.' : 'Please wait.';
  const isReady = !isLoadingMoves && !isLoadingState && !submitMoveMutation.isPending;
  const isBlack = gameInfo?.registeredPlayers[1] === myPlayer?.id;

  if (!isRunning) {
    return null;
  }

  return <>
    <Toast {...toastState} />
    <div>
      {isLoadingMoves && <span className="mr-2">Loading moves...</span>}
      {isLoadingState && <span className="mr-2">Loading game state...</span>}
      {submitMoveMutation.isPending && <span>Submitting your move...</span>}
      {isReady && <p>{currentColor}&apos;s turn. {turnMessage}</p>}
    </div>
    <div className="flex flex-row flex-wrap">
      <Board isBlack={isBlack} gameState={state} selectedMove={selectedMove} allowedMoves={movesBySelectedPiece} allMoves={moves} onClickSpace={handleClickSpace}/>
      <section className="flex flex-col justify-between">
        <MoveInputField moves={moves} filters={filters} onFilter={setFilters} onSelect={handleSelectInput} />
        <div className="flex flex-row flex-wrap gap-2 justify-end items-baseline">
          <button type="button" className="mb-1" onClick={() => handleRefresh()} disabled={isLoadingMoves || isLoadingState}>Refresh</button>
          <button className="mt-2" type="button" disabled={!canSubmit} onClick={handleSubmit}>Submit move</button>
        </div>
      </section>
    </div>
  </>;
}

function isSpaceEquals(a: GameSpace, b: GameSpace): boolean {
  return a?.row === b?.row && a?.column === b?.column;
}