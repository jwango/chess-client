import { PieceType } from "./dto";

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