import { currentUser } from '@clerk/nextjs';

import ThreadCard from '@/components/cards/ThreadCard';
import { fetchPosts } from '@/lib/actions/thread.actions';

const Home: React.FC = async () => {
  const result = await fetchPosts(1, 30);
  const user = await currentUser();

  return (
    <main>
      <h1 className="head-text text-left">Home</h1>
      <section className="mt-9 flex flex-col gap-10">
        {result.posts.length === 0 ? (
          <p className="no-result">No threads found</p>
        ) : (
          result.posts.map((post) => (
            <ThreadCard
              key={post._id}
              author={post.author}
              comments={post.children}
              community={post.community}
              content={post.text}
              createdAt={post.createdAt}
              currentUserId={user?.id || ''}
              id={post._id}
              parentId={post.parentId}
            />
          ))
        )}
      </section>
    </main>
  );
};

export default Home;
