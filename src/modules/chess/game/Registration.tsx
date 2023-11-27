import { AuthGuard, useAuth } from "@auth";
import { GameInfo, GamePlayer } from "../lib/dto";
import { DebugQuery } from "@shared";
import { useRegisterMyselfMutation, useStartGameMutation } from "../lib/chess.mutation";

interface RegistrationProps {
  gameInfo: GameInfo;
  players: GamePlayer[];
}

export const Registration = ({ gameInfo, players }: RegistrationProps) => {
  const registerMutation = useRegisterMyselfMutation();
  const startMutation = useStartGameMutation();
  const { userInfo } = useAuth();

  const isWaiting = gameInfo?.currentState === 'WAITING';
  const numPlayers = gameInfo?.registeredPlayers?.length || 0;
  const myselfPlayer = players?.find(p => p.userId === userInfo?.sub);

  // Register only for waiting games with less than 2 players where I am not already registered
  const canRegister = isWaiting && numPlayers < 2 && !myselfPlayer;

  // Start only for waiting games with exactly 2 players where I am already registered
  const canStart = isWaiting && numPlayers === 2 && !!myselfPlayer;

  const isLoading = registerMutation.isPending || startMutation.isPending;

  return <AuthGuard>
    <DebugQuery isLoading={isLoading} data={gameInfo} />

    <div className="flex flex-row gap-2">
      <button
        type="button"
        disabled={!canRegister}
        onClick={() => registerMutation.mutate({ gameId: gameInfo.gameId })}>
          Register
      </button>
      <button
        type="button"
        disabled={!canStart}
        onClick={() => startMutation.mutate({ gameId: gameInfo?.gameId })}>
          Start
      </button>
    </div>
  </AuthGuard>;
};
