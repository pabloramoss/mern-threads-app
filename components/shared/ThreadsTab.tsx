import { redirect } from 'next/navigation';

import { fetchUserPosts } from '@/lib/actions/user.actions';

import ThreadCard from '../cards/ThreadCard';

interface Props {
  currentUserId: string;
  accountId: string;
  accountType: string;
}

interface Result {
  name: string;
  image: string;
  id: string;
  threads: {
    _id: string;
    text: string;
    parentId: string | null;
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
    children: {
      author: {
        image: string;
      };
    }[];
  }[];
}

const ThreadsTab: React.FC<Props> = async ({ currentUserId, accountId, accountType }) => {
  let result: Result = await fetchUserPosts(accountId);

  if (!result) redirect('/');
  console.log('result', result.threads);

  return (
    <section className="mt-9 flex flex-col gap-10">
      {result.threads.map((thread: any) => (
        <ThreadCard
          key={thread._id}
          author={
            accountType === 'User'
              ? { name: result.name, image: result.image, id: result.id }
              : { name: thread.author.name, image: thread.author.image, id: thread.author.id }
          }
          comments={thread.children}
          community={thread.community}
          content={thread.content}
          createdAt={thread.createdAt}
          currentUserId={currentUserId}
          id={thread._id}
          parentId={thread.parentId}
        />
      ))}
    </section>
  );
};

export default ThreadsTab;
