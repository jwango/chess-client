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
  chessPiecesRemoved: string[];
  chessBoard: string[][];
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
  pieceType: string;
  otherPieceType: string;
}