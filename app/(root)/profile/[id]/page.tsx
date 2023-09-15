import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import Image from 'next/image';

import PostThread from '@/components/forms/PostThread';
import { fetchUser } from '@/lib/actions/user.actions';
import ProfileHeader from '@/components/shared/ProfileHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { profileTabs } from '@/constants';

interface Props {
  params: {
    id: string;
  };
}

const Page: React.FC<Props> = async ({ params }) => {
  const user = await currentUser();

  if (!user) return null;

  const userInfo = await fetchUser(params.id);

  console.log('userInfo', userInfo);

  if (!userInfo.onboarded) redirect('/onboarding');

  return (
    <section>
      <ProfileHeader
        accountId={userInfo.id}
        authUserId={user.id}
        bio={userInfo.bio}
        imgUrl={userInfo.imgUrl}
        name={userInfo.name}
        username={userInfo.username}
      />

      <div className="mt-9">
        <Tabs className="w-full" defaultValue="threads">
          <TabsList className="tab">
            {profileTabs.map((tab) => (
              <TabsTrigger key={tab.label} className="tab" value={tab.value}>
                <Image
                  alt={tab.label}
                  className="object-contain"
                  height={24}
                  src={tab.icon}
                  width={24}
                />
                <p className="max-sm:hidden">{tab.label}</p>
                {
                  <p className="ml-1 rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-light-2">
                    {userInfo?.threads?.length}
                  </p>
                }
              </TabsTrigger>
            ))}
          </TabsList>
          {profileTabs.map((tab) => (
            <TabsContent
              key={`content-${tab.label}`}
              className="w-full text-light-1"
              value={tab.value}
            >
              <ThreadsTab accountId={userInfo.id} accountType="User" currentUserId={user.id} />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default Page;