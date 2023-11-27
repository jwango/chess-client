/** Response types */
interface ResponseBody<T> {
  data: T;
}

export type ListGamesResponse = ResponseBody<string[]>;

export type GetGameResponse = ResponseBody<GameInfo>;

export type GetGameStateResponse = ResponseBody<GameState>;

export type GetPlayersResponse = ResponseBody<GamePlayer[]>;

export type GetMovesResponse = ResponseBody<GameMove[]>;

export type RegisterPlayerResponse = ResponseBody<GameInfo>;

export type StartGameResponse = ResponseBody<GameInfo>;

export type GameStatus = 'RUNNING' | 'WAITING';

export type GameMoveType = 'MOVE' | 'TAKE' | 'PROMOTION' | 'CASTLE';

export enum PieceType {
  BISHOP_WHITE = 'BISHOP_WHITE',
  KING_WHITE = 'KING_WHITE',
  KNIGHT_WHITE = 'KNIGHT_WHITE',
  PAWN_WHITE = 'PAWN_WHITE',
  QUEEN_WHITE = 'QUEEN_WHITE',
  ROOK_WHITE = 'ROOK_WHITE',
  BISHOP_BLACK = 'BISHOP_BLACK',
  KING_BLACK = 'KING_BLACK',
  KNIGHT_BLACK = 'KNIGHT_BLACK',
  PAWN_BLACK = 'PAWN_BLACK',
  QUEEN_BLACK = 'QUEEN_BLACK',
  ROOK_BLACK = 'ROOK_BLACK'
}

/** Inner Data Types */
export interface GameSpace {
  row: number;
  column: number;
}

export interface GameInfo {
  gameId: string;
  registeredPlayers: string[];
  currentState: GameStatus;
}

export interface GameState {
  currentPlayerTurn: number;
  currentPlayerId: string;
  chessPiecesRemoved: PieceType[];
  chessBoard: PieceType[][];
  pendingMoves: GameMove[];
}

export interface GamePlayer {
  name: string;
  id: string;
  userId: string;
}

export interface GameMove {
  playerId: string;
  moveType: GameMoveType;
  fromSpace: GameSpace;
  toSpace: GameSpace;
  pieceType: PieceType;
  otherPieceType: PieceType;
}