import { useQuery, QueryKey } from "@tanstack/react-query";
import { useChessApi } from "./chess.api";
import { useAuth } from "@auth";

// Query Key generator functions
export function getListGamesQueryKey(): QueryKey { return ["listGames"]; }

export function getGameQueryKey(gameId: string): QueryKey { return ["getGame", gameId]; }

export function getPlayersQueryKey(gameId: string): QueryKey { return ["getPlayers", gameId]; }

export function getGameStateQueryKey(gameId: string): QueryKey { return ["getGameState", gameId]; }

export function getMovesQueryKey(gameId: string): QueryKey { return ["getMoves", gameId, "myself"]; }

// Queries
export function useListGamesQuery() {
  const chessApi = useChessApi();
  const { isLoggedIn } = useAuth();

  return useQuery({
    queryKey: getListGamesQueryKey(),
    queryFn: () => {
      if (!isLoggedIn) {
        return [];
      }
      return chessApi.listGames();
    }
  });
}

export function useGetGameQuery(gameId: string) {
  const chessApi = useChessApi();
  const { isLoggedIn } = useAuth();

  return useQuery({
    queryKey: getGameQueryKey(gameId),
    queryFn: () => {
      if (!isLoggedIn) {
        return null;
      }
      return chessApi.getGame(gameId);
    }
  });
}

export function useGetPlayersQuery(gameId: string) {
  const chessApi = useChessApi();
  const { isLoggedIn } = useAuth();

  return useQuery({
    queryKey: getPlayersQueryKey(gameId),
    queryFn: () => {
      if (!isLoggedIn) {
        return null;
      }
      return chessApi.getPlayers(gameId);
    }
  });
}

export function useGetGameStateQuery(gameId: string) {
  const chessApi = useChessApi();
  const { isLoggedIn } = useAuth();

  return useQuery({
    queryKey: getGameStateQueryKey(gameId),
    queryFn: () => {
      if (!isLoggedIn) {
        return null;
      }
      return chessApi.getGameState(gameId);
    }
  });
}

export function useGetMovesQuery(gameId: string) {
  const chessApi = useChessApi();
  const { isLoggedIn } = useAuth();

  return useQuery({
    queryKey: getMovesQueryKey(gameId),
    queryFn: () => {
      if (!isLoggedIn) {
        return null;
      }
      return chessApi.getMoves(gameId);
    }
  });
}
