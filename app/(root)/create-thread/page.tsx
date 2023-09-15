import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

import PostThread from '@/components/forms/PostThread';
import { fetchUser } from '@/lib/actions/user.actions';

const Page: React.FC = async () => {
  const user = await currentUser();

  if (!user) return null;

  const userInfo = await fetchUser(user.id);

  console.log('userInfo', userInfo);

  if (!userInfo.onboarded) redirect('/onboarding');

  return (
    <>
      <h1>Create thread</h1>
      <PostThread userId={userInfo._id} />
    </>
  );
};

export default Page;
