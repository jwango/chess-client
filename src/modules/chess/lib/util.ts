import { GameSpace, PieceType } from "./dto";
import nounMap from "./game-aliases.json";

// Format of long algebraic notation
export type PieceIndex = string;
const NOUN_MAP = nounMap as unknown as Record<string, string[]>;

// https://en.wikipedia.org/wiki/Chess_symbols_in_Unicode
export function getPieceLetter(pieceType: PieceType): string {
  switch (pieceType) {
    case PieceType.BISHOP_WHITE:
      return '♗';
    case PieceType.BISHOP_BLACK:
      return '♝';

    case PieceType.KING_WHITE:
      return '♔';
    case PieceType.KING_BLACK:
      return '♚';

    case PieceType.KNIGHT_WHITE:
      return '♘';
    case PieceType.KNIGHT_BLACK:
      return '♞';

    case PieceType.PAWN_WHITE:
      return '♙';
    case PieceType.PAWN_BLACK:
      return '♟︎';

    case PieceType.QUEEN_WHITE:
      return '♕';
    case PieceType.QUEEN_BLACK:
      return '♛';

    case PieceType.ROOK_WHITE:
      return '♖';
    case PieceType.ROOK_BLACK:
      return '♜';

    default:
      return null;
  }
}

export function getIsPieceBlack(pieceType: PieceType): boolean {
  switch (pieceType) {
    case PieceType.BISHOP_WHITE:
    case PieceType.KING_WHITE:
    case PieceType.KNIGHT_WHITE:
    case PieceType.PAWN_WHITE:
    case PieceType.QUEEN_WHITE:
    case PieceType.ROOK_WHITE:
      return false;
    case PieceType.BISHOP_BLACK:
    case PieceType.KING_BLACK:
    case PieceType.KNIGHT_BLACK:
    case PieceType.PAWN_BLACK:
    case PieceType.QUEEN_BLACK:
    case PieceType.ROOK_BLACK:
      return true;
  }
}

export function getPieceIndex(pieceType: PieceType, space: GameSpace): PieceIndex {
  const pieceLetter = getPieceLetter(pieceType) || '➜';
  const spaceCoord = getSpaceCoord(space);
  return `${pieceLetter}${spaceCoord}`;
}

const CHAR_CODE_a = 97;

// https://en.wikipedia.org/wiki/Algebraic_notation_(chess)#Naming_the_squares
export function getSpaceCoord(space: GameSpace): string {
  if (!space) {
    return '';
  }
  return `${String.fromCharCode(CHAR_CODE_a + space.column)}${space.row + 1}`;
}

export function getGameName(gameId: string): string {
  const hash = gameId.split("-")[0] || "";
  const letter = gameId.match(/[a-z]/g)[0];
  const numericStr = gameId.match(/[0-9]/g).join('');
  const i = +(numericStr.substring(0, 3));
  const j = i + 10;
  const words = NOUN_MAP[letter];
  const firstWord = words[i % words.length];
  const secondWord = words[j % words.length];
  return `${firstWord}ful ${secondWord} ${hash}`
}