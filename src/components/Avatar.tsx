/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/user';

export default function UserAvatar({user}: any) {
  return (
    <div className="relative">
      <Avatar>
        <AvatarImage src={user.picture} alt={user.name} />
        <AvatarFallback>KK</AvatarFallback>
      </Avatar>
      <span className="border-background absolute -end-0.5 -bottom-0.5 size-3 rounded-full border-2 bg-emerald-500">
        <span className="sr-only">Online</span>
      </span>
    </div>
  );
}
