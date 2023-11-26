import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useChessApi } from "./chess.api";
import { useAuth } from "@auth";
import { GameInfo } from "./dto";
import { getGameQueryKey, getPlayersQueryKey } from "./chess.query";

interface GameIdVariables {
  gameId: string;
}

export function useRegisterMyselfMutation() {
  const chessApi = useChessApi();
  const { isLoggedIn } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ gameId }: GameIdVariables) => {
      if (!isLoggedIn) {
        throw new TypeError("Log in before attempting to perform this action.");
      }
      return chessApi.registerMyself(gameId); 
    },
    onSuccess: (data: GameInfo, { gameId }) => {
      queryClient.invalidateQueries({ queryKey: getGameQueryKey(gameId) });
      queryClient.invalidateQueries({ queryKey: getPlayersQueryKey(gameId) });
    }
  });
}

export function useStartGameMutation() {
  const chessApi = useChessApi();
  const { isLoggedIn } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ gameId }: GameIdVariables) => {
      if (!isLoggedIn) {
        throw new TypeError("Log in before attempting to perform this action.");
      }
      return chessApi.startGame(gameId); 
    },
    onSuccess: (data: GameInfo, { gameId }) => {
      queryClient.invalidateQueries({ queryKey: getGameQueryKey(gameId) });
    }
  });
}