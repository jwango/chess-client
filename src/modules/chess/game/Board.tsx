import { GameMove, GameSpace, GameState, PieceType } from "../lib/dto";
import { getIsPieceBlack, getPieceLetter } from "../lib/util";

import styles from './Board.module.css';

interface BoardProps {
  gameState: GameState;
  selectedMove?: GameMove;
  allowedMoves?: GameMove[];
  onClickSpace?: (space: GameSpace) => void;
}

const EMPTY_BOARD = getEmptyBoard();

export const Board = ({ gameState, selectedMove, allowedMoves, onClickSpace }: BoardProps) => {
  const board = gameState?.chessBoard || EMPTY_BOARD;

  return <div>
    <div className="grid grid-cols-9 w-[288px]">
      {[7, 6, 5, 4, 3, 2, 1, 0].map(row => {
        const rowPieces = board[row];
        return <>
          <div className="text-center leading-[32px]">{row + 1}</div>
          {[0, 1, 2, 3, 4, 5, 6, 7].map(column => {
            const isToSpace = matchesSpace(row, column, selectedMove?.toSpace);
            const isFromSpace = matchesSpace(row, column, selectedMove?.fromSpace);
            const isAllowedSpace = !!allowedMoves?.find(m => matchesSpace(row, column, m.toSpace));
            let spaceClassname = '';
            if (isToSpace) {
              spaceClassname = '!border-blue-500';
            } else if (isAllowedSpace) {
              spaceClassname = '!border-red-300';
            }
            if (isFromSpace) {
              spaceClassname = '!border-red-500'
            }

            return <Space
              row={row}
              column={column}
              pieceType={rowPieces[column]}
              className={`${spaceClassname}`}
              onClick={() => onClickSpace({ row, column })}
            />
          })}
        </>
      })}
      {/* empty bottom left corner */}
      <div></div>
      {[0, 1, 2, 3, 4, 5, 6, 7].map(column => <div className="text-center leading-[32px]">
        {String.fromCharCode(97 + column)}
      </div>)}
    </div>
  </div>;
};

interface SpaceProps {
  className?: string;
  row: number;
  column: number;
  pieceType: PieceType;
  onClick?: () => void;
}

const Space = ({ className = '', row, column, pieceType, onClick }: SpaceProps) => {
  const isSpaceBlack = getIsSpaceBlack(row, column);
  const isPieceBlack = getIsPieceBlack(pieceType);
  return <div
    className={
      `h-[32px] text-3xl text-center leading-none box-border relative border-[3px] border-transparent
      ${isSpaceBlack ? `bg-gray-500 ${styles.TextOutlineWhite}` : `bg-orange-50 ${styles.TextOutlineBlack}`}
      ${className}`
    }
    onClick={() => onClick && onClick()}
  >
    <span className={`${isPieceBlack ? 'text-black' : 'text-white'} m-0 absolute left-[-3px] top-[-3px] w-[32px]`}>{getPieceLetter(pieceType) || ''}</span>
  </div>;
};

function getEmptyBoard(): PieceType[][] {
  const board = [];
  for (let row = 0; row < 8; row++) {
    const rowPieces = [];
    for (let column = 0; column < 8; column++) {
      rowPieces[column] = null;
    }
    board[row] = rowPieces;
  }
  return board;
}

function getIsSpaceBlack(row: number, column: number): boolean {
  return (((row % 2) + column) % 2 === 1)
}

function matchesSpace(row: number, column: number, space: GameSpace): boolean {
  return row === space?.row && column === space?.column;
}