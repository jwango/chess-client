import { useQuery, QueryKey } from "@tanstack/react-query";
import { useChessApi } from "./chess.api";
import { useAuth } from "@auth";

export function getListGamesQueryKey(): QueryKey { return ["listGames"]; }

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
