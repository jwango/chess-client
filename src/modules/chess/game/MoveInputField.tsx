import { useState } from "react";
import { GameMove, GameSpace, PieceType } from "../lib/dto";
import { Select, SelectOption } from "@shared";
import { getPieceLetter } from "../lib/util";

const CHAR_CODE_a = 97;

export interface MoveInputFilters {
  piece: PieceIndex;
}

interface MoveInputFieldProps {
  moves: GameMove[];
  filters: MoveInputFilters;
  onFilter: (filters: MoveInputFilters) => void;
  onSelect?: (move: GameMove, movesForPiece: GameMove[]) => void;
}

// Format of long algebraic notation
type PieceIndex = string;

export const MoveInputField = ({ moves, filters, onFilter, onSelect }: MoveInputFieldProps) => {
  const movesByPiece = getMovesByPiece(moves);
  const pieceIndices = Object.keys(movesByPiece);
  const pieceOptions: SelectOption<PieceIndex>[] = (pieceIndices || [])?.map(pieceIndex => (
    { id: pieceIndex, name: pieceIndex, val: pieceIndex }
  ));

  const currPiece = filters.piece;
  const moveOptions = (movesByPiece[currPiece] || [])?.map((move, i) => {
    const moveName = getMoveName(move);
    return { id: moveName, name: moveName, val: move };
  });

  const handleSelectPiece = (pieceOption: SelectOption<PieceIndex>) => {
    onFilter({ piece: pieceOption?.val || null });
  };

  const handleSelectMove = (moveOption: SelectOption<GameMove>) => {
    onSelect && onSelect(moveOption?.val, movesByPiece[currPiece]);
  };
 
  return <div className="flex flex-row flex-wrap gap-2">
    <label>
      Select a piece
      <Select key={moves?.toString()} options={pieceOptions} placeholder='No pieces available' onSelect={handleSelectPiece} />
    </label>
    <label>
      Select an action
      <Select key={currPiece} options={moveOptions} placeholder='Click to select an action' onSelect={handleSelectMove} />
    </label>
  </div>;
}

type PieceMoveMap = Partial<Record<PieceIndex, GameMove[]>>;

function getMovesByPiece(moves: GameMove[]): PieceMoveMap {
  return (moves || []).reduce((acc, currMove) => {
    const pieceIndex = getPieceIndex(currMove.pieceType, currMove.fromSpace);
    const existingMoves = acc[pieceIndex] || [];
    return {
      ...acc,
      [pieceIndex]: [...existingMoves, currMove]
    };
  }, {} as PieceMoveMap);
}

function getPieceIndex(pieceType: PieceType, space: GameSpace): PieceIndex {
  const pieceLetter = getPieceLetter(pieceType) || '➜';
  const spaceCoord = getSpaceCoord(space);
  return `${pieceLetter}${spaceCoord}`;
}

// https://en.wikipedia.org/wiki/Algebraic_notation_(chess)#Naming_the_squares
function getSpaceCoord(space: GameSpace): string {
  return `${String.fromCharCode(CHAR_CODE_a + space.column)}${space.row + 1}`;
}

function getMoveName(move: GameMove): string {
  return `${move.moveType} ${getPieceIndex(move.otherPieceType, move.toSpace)}`;
}