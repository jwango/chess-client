import { Page, Toast } from "@shared";
import AuthGuard from "../auth/components/auth-guard.component";
import { useListGamesQuery } from "./lib/chess.query";
import { useToastState } from "@shared/lib";
import { useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { getGameName } from "./lib/util";
import { useCreateGameMutation } from "./lib/chess.mutation";
import { GameInfo } from "./lib/dto";

export const LobbyPage = () => {
  // hooks and state
  const { data: games, isFetching: isLoadingGames, isError, error, refetch } = useListGamesQuery();
  const { toastState, show } = useToastState();
  
  const handleCreateGameSuccess = useCallback((gameInfo: GameInfo) => {
    show({ color: 'success', title: '', message: `Game ${getGameName(gameInfo.gameId)} was created.`});
  }, [getGameName, show]);
  const createGameMutation = useCreateGameMutation(handleCreateGameSuccess);

  // side effects
  useEffect(() => {
    if (isError) {
      show({ color: 'error', title: 'Oops', message: error?.message });
    }
  }, [isError, error, show]);

  // render
  const isLoading = isLoadingGames || createGameMutation.isPending;

  return <AuthGuard>
    <Page>
      <h1>Games {isLoading ? <>loading...</> : <>loaded</>}</h1>
      <Toast {...toastState} />
      <div className="flex flex-row gap-2 mb-2">
        <button disabled={isLoading} type='button' onClick={() => refetch()}>Refresh</button>
        <button disabled={isLoading} type='button' onClick={() => createGameMutation.mutate()}>New game</button>
      </div>
      <pre>
        {games?.length && 
          <ul>
            {games?.map(game => 
              <li key={game.gameId}><Link to={`games/${game.gameId}`}>{getGameName(game.gameId)}</Link> [{game.currentState}]</li>
            )}
          </ul>
        }
      </pre>
    </Page>
  </AuthGuard>
};