import { redirect } from 'next/navigation';

import { fetchUserPosts } from '@/lib/actions/user.actions';

import ThreadCard from '../cards/ThreadCard';

interface Props {
  currentUserId: string;
  accountId: string;
  accountType: string;
}

const ThreadsTab: React.FC<Props> = async ({ currentUserId, accountId, accountType }) => {
  let result = await fetchUserPosts(accountId);

  if (!result) redirect('/');

  // TODO: fetch profile
  return (
    <section className="mt-9 flex flex-col gap-10">
      {result.threads.map((thread: any) => (
        <ThreadCard
          key={thread.id}
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
