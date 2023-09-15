import Image from 'next/image';
import Link from 'next/link';

interface Props {
  id: string;
  currentUserId: string;
  parentId: string | null;
  content: string;
  author: {
    name: string;
    image: string;
    id: string;
  };
  community: {
    id: string;
    name: string;
    image: string;
  } | null;
  createdAt: string;
  comments: {
    author: {
      image: string;
    };
  }[];
  isComment?: boolean;
}

const ThreadCard: React.FC<Props> = ({
  id,
  currentUserId,
  parentId,
  content,
  author,
  community,
  createdAt,
  comments,
  isComment,
}) => {
  return (
    <article
      className={`flex w-full flex-col rounded-xl ${isComment ? 'px-0 xs:px-7' : 'bg-dark-2 p-7'}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex w-full flex-1 flex-row gap-4" />
        <div className="flex flex-col items-center">
          <Link className="relative h-11 w-11" href={`/profile/${author.id}`}>
            <Image
              fill
              alt="Profile image"
              className="cursor-pointer rounded-full"
              src={author.image}
            />
          </Link>
          <div className="thread-card_bar" />
        </div>
        <div className="flex w-full flex-col">
          <Link className="w-fit" href={`/profile/${author.id}`}>
            <h4 className="cursor-pointer text-base-semibold text-light-1">{author.name}</h4>
          </Link>
          <p className="mt-2 text-small-regular text-light-2">{content}</p>
          <div className={`${isComment && 'mb-10'} mt-5 flex flex-col gap-3`}>
            <div className="flex gap-3.5">
              <Image
                alt="heart"
                className="cursor-pointer object-contain"
                height={24}
                src="/assets/heart-gray.svg"
                width={24}
              />
              <Link href={`/thread/${id}`}>
                <Image
                  alt="heart"
                  className="cursor-pointer object-contain"
                  height={24}
                  src="/assets/reply.svg"
                  width={24}
                />
              </Link>
              <Image
                alt="heart"
                className="cursor-pointer object-contain"
                height={24}
                src="/assets/repost.svg"
                width={24}
              />
              <Image
                alt="heart"
                className="cursor-pointer object-contain"
                height={24}
                src="/assets/share.svg"
                width={24}
              />
            </div>
            {isComment && comments.length > 0 && (
              <Link href={`/thread/${id}`}>
                <p className="mt-1 text-subtle-medium text-gray-1">{comments.length} replies</p>
              </Link>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

export default ThreadCard;
