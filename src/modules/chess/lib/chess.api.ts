import { useAuth } from '@auth';
import { ListGamesResponse, GetGameResponse, GetGameStateResponse, GetPlayersResponse, GetMovesResponse, RegisterPlayerResponse, StartGameResponse, SubmitMoveResponse, GameMove, ResponseBody, CreateGameResponse } from './dto';
import axios, { AxiosRequestConfig } from 'axios';
import { CognitoTokenResponseBody } from 'src/modules/auth/lib/auth.api';

/** Public API */
export interface ChessApi {
  listGames(): Promise<ListGamesResponse['data']>;
  getGame(gameId: string): Promise<GetGameResponse['data']>;
  getGameState(gameId: string): Promise<GetGameStateResponse['data']>;
  getPlayers(gameId: string): Promise<GetPlayersResponse['data']>;
  getMoves(gameId: string): Promise<GetMovesResponse['data']>;
  registerMyself(gameId: string): Promise<RegisterPlayerResponse['data']>;
  startGame(gameId: string): Promise<StartGameResponse['data']>;
  submitMove(gameId: string, move: GameMove): Promise<SubmitMoveResponse['data']>;
  createGame(): Promise<CreateGameResponse['data']>;
}

export function useChessApi(): ChessApi {
  const { tokenData } = useAuth();
  const axiosInstance = axios.create({
    baseURL: 'https://chess-api.jwango.com',
  });

  async function listGames(): Promise<ListGamesResponse['data']> {
    const config: AxiosRequestConfig = {
      ...buildConfig(tokenData.id_token),
      params: { isMine: "true" }
    };
    const axiosResponse = await axiosInstance.get('/games', config);
    return parseListGames(axiosResponse.data);
  }

  async function getGame(gameId: string): Promise<GetGameResponse['data']>{
    const config = buildConfig(tokenData.id_token);
    const axiosResponse = await axiosInstance.get(`/games/${gameId}`, config);
    return axiosResponse.data?.data;
  }

  async function getGameState(gameId: string): Promise<GetGameStateResponse['data']>{
    const config = buildConfig(tokenData.id_token);
    const axiosResponse = await axiosInstance.get(`/games/${gameId}/state`, config);
    return axiosResponse.data?.data;
  }

  async function getPlayers(gameId: string): Promise<GetPlayersResponse['data']>{
    const config = buildConfig(tokenData.id_token);
    const axiosResponse = await axiosInstance.get(`/games/${gameId}/players`, config);
    return axiosResponse.data?.data;
  }

  async function getMoves(gameId: string): Promise<GetMovesResponse['data']>{
    const config = buildConfig(tokenData.id_token);
    const axiosResponse = await axiosInstance.get(`/games/${gameId}/players/myself/moves`, config);
    return axiosResponse.data?.data;
  }

  async function registerMyself(gameId: string): Promise<RegisterPlayerResponse['data']>{
    const config = buildConfig(tokenData.id_token);
    const axiosResponse = await axiosInstance.post(`/games/${gameId}/players`, { userId: "myself" }, config);
    return axiosResponse.data?.data;
  }

  async function startGame(gameId: string): Promise<RegisterPlayerResponse['data']>{
    const config = buildConfig(tokenData.id_token);
    const axiosResponse = await axiosInstance.post(`/games/${gameId}`, {}, config);
    return axiosResponse.data?.data;
  }

  async function submitMove(gameId: string, move: GameMove): Promise<SubmitMoveResponse['data']>{
    const config = buildConfig(tokenData.id_token);
    const axiosResponse = await axiosInstance.post(`/games/${gameId}/moves`, move, config);
    return axiosResponse.data?.data;
  }

  async function createGame(): Promise<CreateGameResponse['data']> {
    const config = buildConfig(tokenData.id_token);
    const axiosResponse = await axiosInstance.post('/games', {}, config);
    return axiosResponse.data?.data;
  }

  return {
    listGames,
    getGame,
    getGameState,
    getPlayers,
    getMoves,
    registerMyself,
    startGame,
    submitMove,
    createGame
  };
}

function buildConfig(token: string): AxiosRequestConfig {
  return {
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json; charset=utf-8' }
  };
}

function parseListGames(payload: ResponseBody<unknown>): ListGamesResponse['data'] {
  if (payload?.data == null || !Array.isArray(payload?.data)) {
    return null;
  }
  return payload.data;
}