import { GameMove, GameMoveType } from "../lib/dto";
import { Select, SelectOption } from "@shared";
import { PieceIndex, getPieceIndex, getSpaceCoord } from "../lib/util";
import { useEffect, useState } from "react";

export interface MoveInputFilters {
  piece: PieceIndex;
}

interface MoveInputFieldProps {
  moves: GameMove[];
  filters: MoveInputFilters;
  onFilter: (filters: MoveInputFilters) => void;
  onSelect?: (move: GameMove, movesForPiece: GameMove[]) => void;
}

export const MoveInputField = ({ moves, filters, onFilter, onSelect }: MoveInputFieldProps) => {
  const [selectedMoveOption, setSelectedMoveOption] = useState<SelectOption<GameMove>>(null);

  // group the moves and generate options by the group keys
  const movesByPiece = getMovesByPiece(moves);
  const pieceIndices = Object.keys(movesByPiece);
  const pieceOptions: SelectOption<PieceIndex>[] = (pieceIndices || [])
    ?.map(pieceIndexOption)
    ?.sort((a, b) => a.name.localeCompare(b.name));

  // map out move options by the currently selected piece
  const currPiece = filters.piece;
  const moveOptions = (movesByPiece[currPiece] || [])?.map((move, i) => {
    const moveName = getMoveName(move);
    return { id: moveName, name: moveName, val: move };
  });

  useEffect(() => {
    if (moveOptions?.length) {
      setSelectedMoveOption(moveOptions[0]);
      onSelect(moveOptions[0].val, movesByPiece[currPiece]);
    } else {
      setSelectedMoveOption(null);
      onSelect(null, []);
    }
  }, [filters]);

  const handleSelectPiece = (pieceOption: SelectOption<PieceIndex>) => {
    onFilter({ piece: pieceOption?.val || null });
  };

  const handleSelectMove = (moveOption: SelectOption<GameMove>) => {
    onSelect && onSelect(moveOption?.val, movesByPiece[currPiece]);
    setSelectedMoveOption(moveOption);
  };

  // Render
  const pieceSelectPlaceholder = pieceOptions?.length ? 'Click to select' : 'No moves to make';
  const selectedPieceOption = pieceIndexOption(filters?.piece);
 
  return <div className="flex flex-row flex-wrap gap-2">
    <label>
      Select a piece
      <Select
        classNames={ { Active: 'bg-red-200 text-red-800', Selected: 'bg-red-200 text-red-800' } }
        key="pieceSelect"
        selectedOption={selectedPieceOption}
        options={pieceOptions}
        placeholder={pieceSelectPlaceholder}
        onSelect={handleSelectPiece}
      />
    </label>
    <label>
      Select an action
      <Select
        key="moveSelect"
        selectedOption={selectedMoveOption}
        options={moveOptions}
        placeholder='Click to select'
        onSelect={handleSelectMove}
      />
    </label>
  </div>;
}

type PieceMoveMap = Partial<Record<PieceIndex, GameMove[]>>;

function getMovesByPiece(moves: GameMove[]): PieceMoveMap {
  const pieceMoveMap = (moves || [])
    .reduce((acc, currMove) => {
      const pieceIndex = getPieceIndex(currMove.pieceType, currMove.fromSpace);
      const existingMoves = acc[pieceIndex] || [];
      return {
        ...acc,
        [pieceIndex]: [...existingMoves, currMove]
      };
    }, {} as PieceMoveMap);

  Object.keys(pieceMoveMap).forEach(pieceIndex => {
    pieceMoveMap[pieceIndex].sort((a, b) => {
      const moveTypeOrder = compareMoveTypes(a.moveType, b.moveType);
      if (moveTypeOrder !== 0) return moveTypeOrder;

      const toHashA = getSpaceCoord(a.toSpace);
      const toHashB = getSpaceCoord(b.toSpace);

      return toHashA.localeCompare(toHashB);
    });
  });
  
  return pieceMoveMap;
}

function getMoveName(move: GameMove): string {
  return `${move.moveType} ${getPieceIndex(move.otherPieceType, move.toSpace)}`;
}

function compareMoveTypes(a: GameMoveType, b: GameMoveType): number {
  return getMoveTypeOrder(a) - getMoveTypeOrder(b);
}

function getMoveTypeOrder(moveType: GameMoveType): number {
  switch (moveType) {
    case "MOVE":
      return 3;
    case "TAKE":
      return 2;
    case "PROMOTION":
      return 1;
    case "CASTLE":
      return 4;
    default:
      return 5;
  }
}

function pieceIndexOption(pieceIndex: PieceIndex): SelectOption<PieceIndex> {
  return { id: pieceIndex, name: pieceIndex, val: pieceIndex };
}