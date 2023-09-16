import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

import ThreadCard from '@/components/cards/ThreadCard';
import { fetchUser } from '@/lib/actions/user.actions';
import { fetchThreadById } from '@/lib/actions/thread.actions';
import Comment from '@/components/forms/Comment';
interface Props {
  params: {
    id: string;
  };
}

const Page: React.FC<Props> = async ({ params }) => {
  if (!params.id) return null;

  const user = await currentUser();

  if (!user) return null;

  const userInfo = await fetchUser(user.id);

  if (!userInfo.onboarded) redirect('/onboarding');

  const thread = await fetchThreadById(params.id);

  return (
    <section className="relative">
      <div>
        <ThreadCard
          key={thread._id}
          author={thread.author}
          comments={thread.children}
          community={thread.community}
          content={thread.text}
          createdAt={thread.createdAt}
          currentUserId={user?.id || ''}
          id={thread._id}
          parentId={thread.parentId}
        />
      </div>
      <div className="mt-7 ">
        <Comment
          currentUserId={JSON.stringify(userInfo._id)}
          currentUserImg={userInfo.image}
          threadId={thread.id}
        />
        <div className="mt-10">
          {thread.children.map((childItem: any) => (
            <ThreadCard
              key={childItem._id}
              isComment
              author={childItem.author}
              comments={childItem.children}
              community={childItem.community}
              content={childItem.text}
              createdAt={childItem.createdAt}
              currentUserId={user?.id || ''}
              id={childItem._id}
              parentId={childItem.parentId}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Page;
