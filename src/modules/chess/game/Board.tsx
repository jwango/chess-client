import { Fragment, PropsWithChildren } from "react";
import { GameMove, GameSpace, GameState, PieceType } from "../lib/dto";
import { getIsPieceBlack, getPieceLetter } from "../lib/util";

import styles from './Board.module.css';

// Board component
interface BoardProps {
  gameState: GameState;
  isBlack?: boolean;
  selectedMove?: GameMove;
  allowedMoves?: GameMove[];
  allMoves?: GameMove[];
  onClickSpace?: (space: GameSpace) => void;
}

const EMPTY_BOARD = getEmptyBoard();
const INDICES_ASC = [0, 1, 2, 3, 4, 5, 6, 7];
const INDICES_DESC = [7, 6, 5, 4, 3, 2, 1, 0];
const OUTER_BG_COLOR = "bg-slate-700";
const ACTIVE_TICK_COLOR = "text-white";
const INACTIVE_TICK_COLOR = "text-gray-500";

export const Board = ({ gameState, isBlack = false, selectedMove, allowedMoves, allMoves, onClickSpace }: BoardProps) => {
  const board = gameState?.chessBoard || EMPTY_BOARD;

  return <div className={`border border-black rounded-sm ${OUTER_BG_COLOR}`}>
    <div className={`grid grid-cols-10 w-[320px] sm:w-[400px] ${isBlack ? 'rotate-180' : ''}`}>
      <HorizontalAxis isFlipped={true} tickClassname={isBlack ? ACTIVE_TICK_COLOR : INACTIVE_TICK_COLOR} />
      {INDICES_DESC.map(row => {
        const rowPieces = board[row];
        return <Fragment key={row}>
          <AxisTick className={`${isBlack ? INACTIVE_TICK_COLOR : ACTIVE_TICK_COLOR} border-r border-black ${OUTER_BG_COLOR}`}>{row + 1}</AxisTick>
          {INDICES_ASC.map(column => {
            const isToSpace = matchesSpace(row, column, selectedMove?.toSpace);
            const isFromSpace = matchesSpace(row, column, selectedMove?.fromSpace);
            const isAllowedToSpace = !!allowedMoves?.find(m => matchesSpace(row, column, m.toSpace));
            const isAllowedFromSpace = !!allMoves?.find(m => matchesSpace(row, column, m.fromSpace));
            let spaceClassname = '';
            if (isToSpace) {
              spaceClassname = '!border-blue-500';
            } else if (isAllowedToSpace) {
              spaceClassname = '!border-blue-200';
            } else if (isFromSpace) {
              spaceClassname = '!border-red-500'
            } else if (isAllowedFromSpace) {
              spaceClassname = '!border-red-300';
            }

            return <Space
              key={`${row}${column}`}
              row={row}
              column={column}
              pieceType={rowPieces[column]}
              className={`${spaceClassname}`}
              isFlipped={isBlack}
              onClick={() => onClickSpace({ row, column })}
            />
          })}
          <AxisTick className={`${isBlack ? ACTIVE_TICK_COLOR : INACTIVE_TICK_COLOR} rotate-180 border-r border-black ${OUTER_BG_COLOR}`}>{row + 1}</AxisTick>
        </Fragment>
      })}
      <HorizontalAxis tickClassname={isBlack ? INACTIVE_TICK_COLOR : ACTIVE_TICK_COLOR} />
    </div>
  </div>;
};

// Space component
interface SpaceProps {
  className?: string;
  row: number;
  column: number;
  pieceType: PieceType;
  isFlipped?: boolean;
  onClick?: () => void;
}

const Space = ({ className = '', row, column, pieceType, isFlipped = false, onClick }: SpaceProps) => {
  const isSpaceBlack = getIsSpaceBlack(row, column);
  const isPieceBlack = getIsPieceBlack(pieceType);
  return <div
    className={
      `h-[32px] sm:h-[40px] text-3xl sm:text-4xl text-center leading-none box-border relative border-[4px] border-transparent
      ${isSpaceBlack ? `bg-gray-500 ${styles.TextOutlineWhite}` : `bg-orange-50 ${styles.TextOutlineBlack}`}
      ${isFlipped ? 'rotate-180' : ''}
      ${className}`
    }
    onClick={() => onClick && onClick()}
  >
    <span className={`${isPieceBlack ? 'text-black' : 'text-white'} m-0 absolute left-[-4px] top-[-4px] w-[32px] leading[32px] sm:w-[40px] sm:leading-[40px]`}>{getPieceLetter(pieceType) || ''}</span>
  </div>;
};

// AxisTick component
interface AxisTickProps {
  className?: string;
}

const AxisTick = ({ className, children }: PropsWithChildren<AxisTickProps>) => {
  return <div className={`text-center leading-[32px] sm:leading-[40px] ${className || ''}`}>{children}</div>
};

// HorizontalAxis component
interface HorizontalAxisProps {
  tickClassname?: string;
  isFlipped?: boolean;
}

const HorizontalAxis = ({ tickClassname, isFlipped = false }: HorizontalAxisProps) => {
  const flippedStyleTick = isFlipped ? 'rotate-180' : '';
  return <>
    <div className={OUTER_BG_COLOR}>{/* empty left column */}</div>
    {INDICES_ASC.map(column => <AxisTick key={column} className={`${flippedStyleTick} box-border border-t border-black ${OUTER_BG_COLOR} ${tickClassname || ''} `}>
      {String.fromCharCode(97 + column)}
    </AxisTick>)}
    <div className={OUTER_BG_COLOR}>{/* empty right column */}</div>
  </>
};

// Helpers
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