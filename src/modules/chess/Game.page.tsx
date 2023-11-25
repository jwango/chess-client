import { useParams } from "react-router"
import { useGetGameQuery, useGetPlayersQuery } from "./lib/chess.query";
import { useToastState } from "@shared/lib";
import { useEffect } from "react";
import AuthGuard from "../auth/components/auth-guard.component";
import { Toast } from "@shared";

export const GamePage = () => {
  const { gameId } = useParams();
  const { data: gameInfo, isLoading: isLoadingGameInfo, error: errorGameInfo, isError: isErrorGameInfo } = useGetGameQuery(gameId);
  const { data: players, isLoading: isLoadingPlayers, error: errorPlayers, isError: isErrorPlayers } = useGetPlayersQuery(gameId);
  const { toastState, show } = useToastState();

  useEffect(() => {
    if (isErrorGameInfo) {
      show({ color: 'error', title: 'Oops', message: errorGameInfo?.message });
    }
  }, [isErrorGameInfo, errorGameInfo, show]);
  
  return <AuthGuard>
    <Toast {...toastState} />
    <div className="gutters">
      <h1>Game {gameId}</h1>
      <DebugQuery isLoading={isLoadingGameInfo} data={gameInfo} />
      <DebugQuery isLoading={isLoadingPlayers} data={players} />
    </div>
  </AuthGuard>
}

const DebugQuery = <T,> ({ data, isLoading }: { data: T, isLoading: boolean }) => {
  return <div>
    {isLoading && <p>Loading...</p>}
    {!isLoading && data && <pre>
      {JSON.stringify(data, null, 2)}
    </pre>}
  </div>;
};
