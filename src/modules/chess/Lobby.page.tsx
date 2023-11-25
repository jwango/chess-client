import { useEffect, useState } from "react";
import AuthGuard from "../auth/components/auth-guard.component";
import { useChessApi } from "./lib/chess.api";
import { useAuth } from "../auth/lib/useAuth.hook";

export const LobbyPage = () => {
  const { isLoggedIn } = useAuth();
  const { listGames } = useChessApi();
  const [gameIds, setGameIds] = useState<string[]>([]);

  useEffect(() => {
    if (isLoggedIn) {
      listGames().then(setGameIds);
    }
  }, [isLoggedIn]);

  return <AuthGuard>
    <pre>
      Games
      <ul>
        {gameIds?.map(gameId => (
          <li key={gameId}>{gameId}</li>
        ))}
      </ul>
    </pre>
  </AuthGuard>
};