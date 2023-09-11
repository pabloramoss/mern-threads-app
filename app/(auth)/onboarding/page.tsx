// @ts-nocheck
import { currentUser } from '@clerk/nextjs';

import AccountProfile from '@/components/forms/AccountProfile';

const OnBoarding: React.FC = async () => {
  const user = await currentUser();

  const userInfo: any = {};
  const userData = {
    id: user?.id,
    objectId: userInfo?.id,
    username: userInfo?.username || user?.username,
    name: userInfo?.name || user?.firstName || '',
    bio: userInfo?.bio || '',
    image: userInfo?.image || user?.imageUrl,
  };

  return (
    <main className="mx-auto flex max-w-3xl flex-col justify-start px-10 py-20">
      <h1>on boarding</h1>
      <p className="mt-3 text-base-regular text-light-2">Complete your profle</p>
      <section className="mt-9 bg-dark-2 p-10">
        <AccountProfile btnTitle="Continue" user={userData} />
      </section>
    </main>
  );
};

export default OnBoarding;
