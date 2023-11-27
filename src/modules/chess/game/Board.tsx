import { GameMove, GameState, PieceType } from "../lib/dto";
import { getIsPieceBlack, getPieceLetter } from "../lib/util";

import styles from './Board.module.css';

interface BoardProps {
  gameState: GameState;
  selectedMove?: GameMove;
}

const EMPTY_BOARD = getEmptyBoard();

export const Board = ({ gameState, selectedMove }: BoardProps) => {
  const board = gameState?.chessBoard || EMPTY_BOARD;

  return <div>
    <div className="grid grid-cols-9 w-[288px]">
      {[7, 6, 5, 4, 3, 2, 1, 0].map(row => {
        const rowPieces = board[row];
        return <>
          <div className="text-center leading-[32px]">{row + 1}</div>
          {[0, 1, 2, 3, 4, 5, 6, 7].map(column => {
            const isToSpace = selectedMove?.toSpace?.column === column && selectedMove?.toSpace?.row === row;
            const isFromSpace = selectedMove?.fromSpace?.column === column && selectedMove?.fromSpace?.row === row;
            let bgColorOverride = '';
            if (isToSpace) {
              bgColorOverride = '!bg-yellow-500';
            }
            if (isFromSpace) {
              bgColorOverride = 'border-[3px] border-yellow-500 !leading-[26px]'
            }

            return <Space row={row} column={column} pieceType={rowPieces[column]} className={bgColorOverride} />
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
}

const Space = ({ className = '', row, column, pieceType }: SpaceProps) => {
  const isSpaceBlack = getIsSpaceBlack(row, column);
  const isPieceBlack = getIsPieceBlack(pieceType);
  return <div
    className={
      `h-[32px] text-3xl text-center leading-none
      ${isSpaceBlack ? `bg-gray-500 ${styles.TextOutlineWhite}` : `bg-orange-50 ${styles.TextOutlineBlack}`}
      ${className}`
    }
  >
    <span className={`${isPieceBlack ? 'text-black' : 'text-white'}`}>{getPieceLetter(pieceType) || ''}</span>
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