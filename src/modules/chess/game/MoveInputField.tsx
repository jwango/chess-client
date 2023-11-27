import { GameMove } from "../lib/dto";
import { Select, SelectOption } from "@shared";
import { PieceIndex, getPieceIndex } from "../lib/util";

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

function getMoveName(move: GameMove): string {
  return `${move.moveType} ${getPieceIndex(move.otherPieceType, move.toSpace)}`;
}