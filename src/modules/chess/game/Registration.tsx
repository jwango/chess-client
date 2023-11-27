import { GameInfo, GamePlayer } from "../lib/dto";
import { DebugQuery } from "@shared";
import { useRegisterMyselfMutation, useStartGameMutation } from "../lib/chess.mutation";

interface RegistrationProps {
  gameInfo: GameInfo;
  myPlayer: GamePlayer;
}

export const Registration = ({ gameInfo, myPlayer }: RegistrationProps) => {
  const registerMutation = useRegisterMyselfMutation();
  const startMutation = useStartGameMutation();

  const isWaiting = gameInfo?.currentState === 'WAITING';
  const numPlayers = gameInfo?.registeredPlayers?.length || 0;

  // Register only for waiting games with less than 2 players where I am not already registered
  const canRegister = isWaiting && numPlayers < 2 && !myPlayer;

  // Start only for waiting games with exactly 2 players where I am already registered
  const canStart = isWaiting && numPlayers === 2 && !!myPlayer;

  // I can invite people to a game I am currently a part of
  const canInvite = isWaiting && numPlayers < 2 && !!myPlayer;

  const isLoading = registerMutation.isPending || startMutation.isPending;

  const handleCopyInvite = () => {
    navigator.clipboard.writeText(window.location.href);
  }

  return <>
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
      <button
        type="button"
        disabled={!canInvite}
        onClick={handleCopyInvite}>
          Copy invite link
      </button>
    </div>
  </>;
};
