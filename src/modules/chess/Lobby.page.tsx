import { Toast } from "@shared";
import AuthGuard from "../auth/components/auth-guard.component";
import { useListGamesQuery } from "./lib/chess.query";
import { useToastState } from "@shared/lib";
import { useEffect } from "react";

export const LobbyPage = () => {
  const { data: gameIds, isLoading, isError, error, refetch } = useListGamesQuery();
  const { toastState, show } = useToastState();

  useEffect(() => {
    if (isError) {
      show({ color: 'error', title: 'Oops', message: error?.message });
    }
  }, [isError, error, show]);

  return <AuthGuard>
    <div className='gutters'>
      <h1>Games</h1>
      <Toast {...toastState} />
      <button disabled={isLoading} type='button' onClick={() => refetch()}>Refresh</button>
      <pre>
        {isLoading && <p>Loading...</p>}
        {!isLoading && 
          <ul>
            {gameIds?.map(gameId => (
              <li key={gameId}>{gameId}</li>
            ))}
          </ul>
        }
      </pre>
    </div>
  </AuthGuard>
};