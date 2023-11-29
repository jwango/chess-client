import { UserInfo } from "@auth";

interface AvatarProps {
  className?: string;
  userInfo: UserInfo;
}

export const Avatar = ({ className, userInfo }: AvatarProps) => {
  const name = userInfo?.name || 'Anonymous';
  return <picture className={`inline-block ${className || ''}`}>
    <source className="rounded-full" srcSet={userInfo?.picture} width={24} height={24} title={name} />
    <img className="rounded-full bg-gray-200" src="/avatar-anon.svg" alt={name} title={name} width={24} height={24} />
  </picture>;
};