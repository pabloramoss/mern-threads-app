'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Button } from '../ui/button';
interface Props {
  id: string;
  name: string;
  username: string;
  imageUrl: string;
  personType: string;
}
const UserCard: React.FC<Props> = ({ id, name, username, imageUrl, personType }) => {
  const router = useRouter();

  return (
    <article className="user-card">
      <div className="user-card_avatar">
        <Image alt="logo" className="rounded-full" height={48} src={imageUrl} width={48} />
        <div className="flex-1 text-ellipsis">
          <h4 className="text-base-semibold text-light-1">{name}</h4>
          <p className="text-small-medium text-gray-1">@{username}</p>
        </div>
      </div>
      <Button className="user-card_btn" onClick={() => router.push(`/profile/${id}`)}>
        View
      </Button>
    </article>
  );
};

export default UserCard;
